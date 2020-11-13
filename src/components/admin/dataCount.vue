<template>
 <div class="chartContainer">
    <div class="box" style="border-right:1px solid #F2F6FC">
      <!--<div id="myChart" style="width:400px;height:400px;"></div>-->
      
      <iframe src="http://localhost:8080/#/seeChart" frameborder="0" style="width:400px;height:300px; margin:0 auto;"></iframe>
      
     <iframe src="http://localhost:8080/#/favChart" frameborder="0" style="width:400px;height:300px; margin:0 auto;margin-top: -30px;"></iframe>
      
      <!-- <my-chart></my-chart>-->
      </div>
      <div class="box">
        <p class="title">按课程查询</p>
       <form action="" method="" name="date">
         <table>
           <tr>
             <td><input  placeholder="输入课程号" id="cid"/></td>
             <td>
               <select name="year" id="year" placeholder="请选择">
              <option value="">
              </option>
            </select>
               
              
            </td>
            <td>
                    <select name="month" id="month" placeholder="请选择">
              <option value="">
              </option>
            </select>
            </td>
             <td>
               <input type="button" value="搜索" @click="search">
             </td>
           </tr>
         </table>
       </form>
       <!--父组件向子组件传值要把数据库中查出来的值传过去，而不是传表单的值-->
        <div id="myChart" style="width:300px;height:300px"></div>
  
      </div>
 </div>
  
</template>
 
<script>
 
  import {calendar} from  '../../assets/js/calendar.js'
  import DetailLineChart from './detailLineChart'
  import echarts from 'echarts/lib/echarts'
  import request from '@/utils/request'
import 'echarts/lib/chart/line' //折线图组件
import 'echarts/lib/component/tooltip'//提示框
import 'echarts/lib/component/legend'//图例组件

  export default{
    mounted(){
      this.getTime()

    },
      components:{
          DetailLineChart
      },
      data(){
        return{
          seeArr:[],
          favArr:[],
          timeArr:[],
          input:'',
          
        }
      },
      methods:{
        getTime(){
          calendar()
        //  console.log(calendar());
          var year=document.getElementById("year");
                var month=document.getElementById("month");
                var num='0';
                var mm;
                if(month.value!='' && year.value!=''){
                  if(month.value>0 && month.value<10){               
                                      mm=num+month.value;
                                  }
                                  else{
                                      mm=month.value;
                                  }

                                  var time=year.value+'-'+mm; 
                                  //console.log(time)
                                  return time; 
                }
                else{
                  return 0
                }
                 
        },
          search(){
          
          if(this.getTime()!=0){
            var time='%'+this.getTime()+'%';
            var cid=document.date.cid.value;
           //console.log(time)
            request({
                url:'/api/course/detailChart',
                method:"post",
                data:{time:time,id:cid}
            }).then(res=>{
              if(res.msg=='success'){
            // console.log((res.favResult).length)
                if((res.favResult).length==0 && (res.seeResult).length==0){
                  this.favArr=[];
                  this.seeArr=[];
                  this.$message.error('暂无数据')
                }
                else{
                   var i=0;
                res.favResult.forEach(element => {
                  this.favArr[i]=element['num'];
                   this.timeArr[i]=element['time'];
                  
                  i++;
                });
                i=0;
                res.seeResult.forEach(element=>{
                  this.seeArr[i]=element['num'];
                 
                  i++;
                })
                 // console.log('收藏量'+this.favArr)
                //console.log('时间'+this.timeArr)
                //console.log('点击量'+this.seeArr)
            
                /**此处父组件向子组件传值 */
                const option = {
    title: {
        text: '详细数据统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['点击量', '收藏量']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
       
        data:this.timeArr,//['5日','10日','15日','20日','25日','30日']//this.timeArr,////this.timeArr,
       splitNumber:5
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '点击量',
            type: 'line',
            stack: '总量',
            data:this.seeArr
        },
        {
            name: '收藏量',
            type: 'line',
            stack: '总量',
            data:this.favArr//它反映的是数据的变化趋势，y轴的数值与实际不符
        }
    ]
};
 var chartObj=echarts.init(document.getElementById('myChart'));
    chartObj.setOption(option);

                }
               
           
              }
              else{
                console.log('error')
              }
            })
          
          }
          else{
            this.$message.error('必须选择时间')
          }
            
   
          }
      }
  }
  
</script>
 
<style lang="less" scoped>
  .box{
      width:400px;
      height: 100%;
     
      float: left;
      margin-right: 50px;
  }
  .chartContainer{
    width:100%;
    height: 100%;
    margin: 0 auto;
  }
  .title{
        text-align: center;
    font-size: 20px;
    font-family: "微软雅黑";
    color: #409EFF;
  }
 
</style>
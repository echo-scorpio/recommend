<template>
   <div class="block">
       <p class="pageTitle">历史记录</p>
  <el-timeline>
    <el-timeline-item v-for="item in seeList" :key="item.cID" :timestamp="item.seeTime" placement="top" :color="color">
      <router-link tag="a" :to="{path:'/videoTest',query:{id:item.cID}}">
      <el-card>
          <div class="imgBG">
              <img :src="item.cImg" alt=""><!--视频封面-->
          </div>
          
        <h4 class="cName">{{item.cName}}</h4><!--课程标题-->
        <p class="seeTime">{{item.hour}}</p><!--观看时间-->
      </el-card>
      </router-link>
    </el-timeline-item>
   
  </el-timeline>
  <div id="noData">
      <img src="src\assets\demo\noSee.png" alt="">
      <p>暂无观看记录</p>
  </div>
</div>
</template>
<script>
import request from '@/utils/request'
import {getUserName} from '@/utils/auth'
import {dateFormat} from 'vux'

//格式化日期
function dateFilter(input) {
   var d = new Date(input); 
   var year = d.getFullYear();
   var month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1); 
   var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate(); 
   var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
   var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes(); 
   var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
   return {
       day:year + "-" + month + "-" + day,
       hour:hour + ':' + minutes
   }
   }

export default {
  
  components: {
   
  },
  data () {
    return {
      color: '#0bbd87',
      seeList:[]
    }
  },
    mounted(){
        this.showCourseList()
    },
  methods:{
      showCourseList(){
          //console.log(getUserName())
          let uID=getUserName();
          request({
              url:'api/course/seeCourseList',
              method:'post',
              data:{
                  uid:uID
              }
          }).then(res=>{
              if(res.msg=='success'){
                  
                  let data=res.list;
                  data.forEach(element => {
                       var time=dateFormat(new Date(element.seeTime), 'YYYY-MM-DD HH:mm')
                       
                      element.seeTime= time.split(' ')[0]
                      element.hour=time.split(' ')[1]
                    
                  });
                  this.seeList=res.list;
                  //console.log(res.list)
              }
              else{

                  document.getElementById('noData').style.display="block"
              }
              
          })
      }
  }
}
</script>

<style lang="less">
.block {
	width: 90%;
    margin-left: 20px;
    margin-top: 15px;
}
.pageTitle{
    text-align: center;
    color: #0bbd87;
    font-family: "微软雅黑";
    font-size:16px;
}
.imgBG,.imgBG img{
    width: 50px;
    height: 50px;
    border-radius: 5px;
        float: left;
    margin-right: 5px;
}
.cName{
    width: 75%;
    overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.seeTime{
    font-size: 14px;
    font-family: "微软雅黑";
    color: gray
}
#noData{
    width: 100px;
    position: absolute;
    top: 15%;
    left: 41%;
    display: none;
}
</style>
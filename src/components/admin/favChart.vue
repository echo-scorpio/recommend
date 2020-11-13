<template>
  <div>
    <p class="title">课程收藏量</p>
     <v-chart :data="data">
     <v-scale y :options="yOptions" />
     <v-tooltip disabled />
     <v-pie :radius="0.65" series-field="name" />
     <v-legend :options="legendOptions" />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'
import request from '@/utils/request'
const map = {
 
}

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VPie,
    VScale
  },
  mounted(){
    this.showData();
  },
  data () {
    return {
      legendOptions: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
          console.log(val)
        }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
      map,
      data: [
        
      ]
    }
  },
  methods:{
    showData(){
     // console.log('aaa')
      request({
        url:'/api/course/favChartData',
        method:'post',
        data:{}
      }).then(res=>{
        if(res.msg=='success'){
         // console.log(res.list)
         var i=0;
         res.list.forEach(element => {
           this.data[i]={}
           this.data[i].name=element['cType'];
           this.data[i].percent=element['times'];
           this.data[i].a='1';
           
           this.map[element['cType']]=element['times'];
         
           
          // console.log(this.data)
           i++;
         });
        }
        else{
          console.log('暂无数据')
        }
      })
    }
  }
}
</script>
<style>
  .title{
        text-align: center;
    font-size: 20px;
    font-family: "微软雅黑";
    color: #409EFF;
    display: block;
    margin-bottom: -30px;
  }
</style>


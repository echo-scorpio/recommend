<template>
 
  
<!--封面；课程名；播放次数；时长-->
  <div>
    <ul>
      <li v-for="(item,index) in courseList" :key="index">
       <router-link tag="a" :to="{path:'/videoTest',query:{id:item.cID}}" v-bind:style="{backgroundImage:'url(./' + item.cImg + ')'}">
        
        <div class="courseTitle">{{item.cName}}</div>
        
        <div class="viewTimes">播放次数<span class="highLightFonts">{{item.seeTimes}}</span></div>
        <div class="duration"><span class="highLightFonts">{{item.videoTime}}</span>分钟</div>
        
       
        </router-link>
      </li>    
    </ul>


  </div>
</template>


<script>
import {Group,Cell, CellBox, CellFormPreview} from 'vux'
//import request from '@/utils/request'
import request from "@/utils/request"
export default {
  mounted () {
    this.getList();
   /* setTimeout(() => {
      this.money = -1024
    }, 2000)*/
  },
  components: {
    Group,
    Cell,
    CellBox,
    CellFormPreview,
   
  
  },
   data () {
    return {
      courseList:[],
     
    }
  },
  methods: {
    getList(){
      request({
        url:'api/course/showPopularCourse',//调用node.js中show的接口
        method:'post',
        data:{},       
      }).then(res=>{
        //console.log(res.list);
        if(res.msg=='success'){
          this.courseList=res.list;
        }
      })

      
    },
    onClick () {
      console.log('on click')
    }
  },
 
}
</script>

<style scoped>
.courseTitle{
  padding-top: 15px;
  color: aliceblue;
  font-family:"微软雅黑";
  font-size: 20px;
  text-align: left;
}
.highLightFonts{
  font-weight: bold;
  color: aliceblue;
}
.viewTimes{
  margin-top: 15px;
  color: rgb(214, 212, 212);
  font-family: "微软雅黑";
  font-size: 16px;
  text-align: left;
}
.duration{
  margin-top: 15px;
  color: rgb(214, 212, 212);
  font-family: "微软雅黑";
  font-size: 14px;
  text-align: left;
}
a {
  width: 100%;
   height: 130px;
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    background-size: 100% 130px;
    background-repeat: no-repeat;
    background-position: center;
}
 ul li, ul{
   width: 100%;
   height: 130px;
 /*  padding: 10px;*/
 margin-top: 10px;
 margin-bottom: 10px;
  list-style: none;
}

.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
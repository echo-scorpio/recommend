<template>
  <div>
    <p class="title">热门课程</p>
    <el-button style="float:right" type="text" @click="clickMore">发现更多</el-button>
    <router-link style="clear:both" tag="a" v-for="item in dataList" :key="item.cID" :to="{path:'/videoTest',query:{id:item.cID}}"  class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
        <img :src="item.cImg" alt="" class="weui-media-box__thumb">
        </div> 
        <div class="weui-media-box__bd">
        <h4 class="weui-media-box__title">{{item.cName}}</h4>
        <p class="weui-media-box__desc">{{item.cIntro}}</p>
        </div>
      
    </router-link>
    <p class="title">最近观看</p>
    <el-button style="float:right" type="text" @click="seeHistory">更多</el-button>
    <router-link style="clear:both" tag="a" v-for="(item,index) in recentList" :key="index" :to="{path:'/videoTest',query:{id:item.cID}}"  class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
        <img :src="item.cImg" alt="" class="weui-media-box__thumb">
        </div> 
        <div class="weui-media-box__bd">
        <h4 class="weui-media-box__title">{{item.cName}}</h4>
        <p class="weui-media-box__desc">{{item.cIntro}}</p>
        </div>
      
    </router-link>
    <divider></divider>
     <divider>我是有底线的</divider>
  </div>
  
</template>

<script>
import { Panel,Divider } from 'vux'
import {getUserName} from '@/utils/auth'
import request from '@/utils/request'
export default {
  mounted(){
    if(getUserName()){
      this.showList()
    }
    else{
      this.$router.push('/')
    }
  },
  components: {
    Panel,
    Divider
  },
 
  data () {
    return {
      type: '1',
      dataList:[],
      recentList:[]
    }
  },
  methods:{
    onImgError (item, $event) {
      console.log(item, $event)
    },
    showList(){
      var uid=getUserName()
      request({
        url:'api/course/showList',
        method:'post',
        data:{
          uid:uid
        }
      }).then(res=>{
        
         this.dataList=res.popularList;
         this.recentList=res.recentList;
       
      })
  },
  clickMore(){
    this.$router.push('/course')
  },
  seeHistory(){
    this.$router.push('/seeHistory')
  }
}
}
</script>

<style>
body{
  background-color: #FFFFFF
}
a.weui-media-box {
    color: #000000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid #E6E6E6;
}
.weui-media-box_appmsg {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-media-box {
    padding: 15px;
    position: relative;
}
.weui-media-box_appmsg .weui-media-box__hd {
    margin-right: .8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.weui-media-box_appmsg .weui-media-box__thumb {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
}


a img {
    border: 0;
}

.weui-media-box_appmsg .weui-media-box__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
}
.weui-media-box__title {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.weui-media-box__desc {
    color: #999999;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.title{
  color:gray;
  width: 70px;
    float: left;
}
</style>
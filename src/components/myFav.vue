<template>
   <div class="block">
       <p class="pageTitle">我的收藏</p>
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
        <el-button type="text" icon="el-icon-delete" circle style="float: right;margin-top: -40px;font-size: 18px;    margin-top: -62px;
    margin-right: 10%;" @click="delFav(item.cID)"></el-button>
     
      
    </el-timeline-item>
   
  </el-timeline>
  <div id="noData">
      <img src="src\assets\demo\noFav.png" alt="">
      <p>暂无收藏记录</p>
  </div>

<div>
      <confirm
      v-model="show4"
      :close-on-confirm="false"
      title="确定取消收藏吗?"
      @on-confirm="onConfirm4"
      @on-cancel="onCancel"
      >
        <p style="text-align:center;"></p>
      </confirm>
    </div>
   
    

</div>
</template>
<script>
import request from '@/utils/request'
import {getUserName} from '@/utils/auth'
import {dateFormat,Confirm} from 'vux'



export default {
  
  components: {
   Confirm
  },
  data () {
    return {
      color: '#0bbd87',
      seeList:[],
      show4: false,
      cid:''
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
              url:'api/course/favCourseList',
              method:'post',
              data:{
                  uid:uID
              }
          }).then(res=>{
              if(res.msg=='success'){
                  
                  let data=res.list;
                  data.forEach(element => {
                       var time=dateFormat(new Date(element.time), 'YYYY-MM-DD HH:mm')
                       
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
      },
       onCancel () {
           this.cancel=false;
     
    },
         onConfirm4 () {
            // this.show4=true;
            let uid=getUserName();
        
             console.log(this.cid+" "+uid)
            this.cancel='true';
            setTimeout(() => { 
            this.show4 = false;
            request({
              url:'api/course/delFav',
              method:'post',
              data:{
                  uid:uid,
                  cid:this.cid
              }
          }).then(res=>{
              if(res.msg=='success'){
                  this.$message.success('取消收藏成功');
                  //重新加载收藏课程列表
                        request({
                    url:'api/course/favCourseList',
                    method:'post',
                    data:{
                        uid:uid
                    }
                }).then(res=>{
                    if(res.msg=='success'){
                        
                        let data=res.list;
                        data.forEach(element => {
                            var time=dateFormat(new Date(element.time), 'YYYY-MM-DD HH:mm')
                            
                            element.seeTime= time.split(' ')[0]
                            element.hour=time.split(' ')[1]
                            
                        });
                        this.seeList=res.list;
                    }
                    else{
                        this.seeList=[]
                        document.getElementById('noData').style.display="block"
                    }
                    
                })
              }
              else{
                  this.$message.error('failed')
              }
          })
            }, 1000)
    
    
    },
      delFav(cid){//取消收藏
          //console.log(cid)
          this.cid=cid;
          this.show4=true;
          
         // console.log(this.cancel)
          /*if(this.cancel==true){
               request({
              url:'api/course/delFav',
              method:'post',
              data:{
                  uid:uid,
                  cid:cid
              }
          }).then(res=>{
              if(res.msg=='success'){
                  this.$message.success('取消收藏成功');
              }
              else{
                  this.$message.error('failed')
              }
          })
          }*/
         
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
    color: gray;
}
/*.el-icon-delete{
    top: 54%;
    left: 85%;
    position: absolute;
}*/
</style>
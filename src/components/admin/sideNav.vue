<!--侧面导航栏-->
<template>
   <el-row class="tac" >
       <p style="font-size:16px;color:#000;width:150px;margin-left:30px"><span style="color:gray;font-size:14px">管理员：</span>{{adminName}}</p>
    <el-tabs v-model="activeTab" :tab-position="tabPosition">
    <el-tab-pane label="课程管理" name="1" :key="1" :disabled="disable1"><span  class="course">课程管理</span> <manage-course v-if="1"></manage-course></el-tab-pane>
    <el-tab-pane label="课程类型管理" name="2" :key="2" :disabled="disable2"><span  class="course">课程类型管理</span> <manage-course-type v-if="2"></manage-course-type></el-tab-pane>
    <el-tab-pane label="文章管理" name="3" :key="3" :disabled="disable"> <span  class="article">文章管理</span><manage-article v-if="3"></manage-article></el-tab-pane>
    <el-tab-pane label="文章类型管理管理" name="4" :key="4" :disabled="disable"><span  class="course">文章类型管理</span> <manage-article-type v-if="4"></manage-article-type></el-tab-pane>
    <el-tab-pane label="用户管理" name="5" :key="5" :disabled="disable3"><span class="user">用户管理</span><manage-user v-if="5"></manage-user> </el-tab-pane>
    <el-tab-pane label="权限管理" name="6" :key="6" :disabled="disable5"><span class="right">权限管理</span><manage-right v-if="6"></manage-right> </el-tab-pane>
    <el-tab-pane label="数据统计" name="7" :key="7" :disabled="disable4"><span class="count">数据统计</span><data-count v-if="7"></data-count> </el-tab-pane>  
  </el-tabs>
  <el-button type="text" @click="logout" style="position: fixed;top: 50%;left: 13%;">退出</el-button>
</el-row>
</template>

<script>
import ManageCourse from './manageCourse'
import ManageArticle from './manageArticle'
import ManageUser from './manageUser'
import ManageRight from './manageRight'
import ManageCourseType from './manageCourseType'
import ManageArticleType from './manageArticleType'
import DataCount from './dataCount'
import {getAdminName,removeAdminName} from '@/utils/auth'
import request from '@/utils/request'
 export default {
     components:{
         ManageCourse,
         ManageArticle,
         ManageUser,
         ManageRight,
         ManageCourseType,
         ManageArticleType,
         DataCount,

     },
     mounted(){
       this.getRights()
     },
    data() {
      return {
        tabPosition: 'left',
        activeTab:'1',
        1:'true',
        2:'false',
        3:'false',
        4:'false',
        5:'false',
        6:'false',
        disable:true,
        disable1:true,
        disable2:true,
         disable3:true,
        disable4:true,
        disable5:true,
        adminName:''

        
      };
    },
    methods:{
       logout(){
         removeAdminName();
         this.$router.push('/admin')
        
       },
       getRights(){
         var id=getAdminName();
         request({
           url:'api/manageUser/showAdminInfo',
           method:'post',
           data:{
             uid:id
           }

         }).then(res=>{
           if(res.msg=='success'){
             var rights=[]
             res.list.forEach(element => {
               rights=element['rights'];
               this.adminName=element['name']
               if(element['role']==0){
                 this.disable5=false;
               }
             });
             for(var i=0;i<rights.length;i++){
               switch (rights[i]) {
                 case '1':
                   this.disable1=false;
                   break;
                  case '2':
                   this.disable2=false;
                   break;
                  case '3':
                   this.disable3=false;
                   break;
                  case '4':
                   this.disable4=false;
                   break;
               
                 default:
                   break;
               }
             }
           }
           else{
             console.log('select error')
           }
         })
         
       }

    }
  };
</script>
<style>
.course,.article,.user,.right,.count{
    display: block;
    font-size: 24px;
    font-family: "微软雅黑";
    text-align: center
}
</style>
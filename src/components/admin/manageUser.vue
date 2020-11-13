<template>

<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    empty-text="暂无数据">
    
 <el-table-column
      prop="userName"
      label="用户ID"
      width="180">
    
    </el-table-column>
   
   
    <el-table-column
      prop="uSex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="注册时间">
    </el-table-column>
    <el-table-column
      prop="uIntro"
      label="简介">
    </el-table-column>
    <el-table-column
      prop="userStatus"
      label="状态"
      width="80px">
    </el-table-column>
    <el-table-column
         label="详情"
         width="80px"
       >
    <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="viewDetails(scope.row,scope.$index)">查看</el-button>

         
       
      </template>
       </el-table-column>
     <el-table-column
         label="操作"
       >
    <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleForbid(scope.row,scope.$index)">禁用</el-button>

          <el-button
          size="mini"
          @click="handleAllow(scope.row,scope.$index)">启用</el-button>
          
       
      </template>
       </el-table-column>
    
  </el-table>
  
  <el-dialog title="用户行为记录" :visible.sync="behaviorDialogTableVisible">
    <divider>观看记录</divider>
  <el-table :data="sawData" empty-text="暂无数据" height="200px">
    <el-table-column property="seeTime" label="观看时间" width="150"></el-table-column>
    <el-table-column property="cID" label="课程ID" width="150"></el-table-column>
    <el-table-column property="cName" label="课程名"></el-table-column>
    <el-table-column property="cType" label="课程类型"></el-table-column>
  </el-table>
  <divider>收藏记录</divider>
   <el-table :data="favData"  empty-text="暂无数据" height="200px">
    <el-table-column property="time" label="收藏时间" width="150"></el-table-column>
    <el-table-column property="cID" label="课程ID" width="150"></el-table-column>
    <el-table-column property="cName" label="课程名"></el-table-column>
    <el-table-column property="cType" label="课程类型"></el-table-column>
  </el-table>
</el-dialog>
</div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import {getAdminName} from '@/utils/auth'
import request from '@/utils/request'
import {dateFormat,Divider} from 'vux'
  export default {
    components:{
      Divider
    },
    methods: {
       
        showUser(){
            request({
                url:'api/manageUser/showUser',
                method:'post',
                data:{}
            }).then(res=>{
                if(res.msg='success'){
                    var list=res.data;
                    list.forEach(element => {
                        element['time']=dateFormat(new Date(element['time']),'YYYY-MM-DD');
                        if(element['userStatus']=='0'){
                          element['userStatus']='已禁用'
                        }
                        else{
                          element['userStatus']=''
                        }
                        
                    });
                    this.tableData=list;
                }
                else{

                }
            })
        },
        handleForbid(row,rowIndex){
          let uID=row['userName'];
         // console.log(uID)
          if(row['userStatus']=='已禁用'){
           // console.log('已经禁用');
          }
          else{
           // console.log('禁用账户');
           request({
             url:'api/manageUser/forbidUser',
             method:'post',
             data:{
               uid:uID
             }
           }).then(res=>{
             if(res.msg=='success'){
               this.$message.success('禁用账户成功！')
               this.showUser()
             }
             else{
               this.$message.error('禁用失败')
             }
           })
          }
        },
      handleAllow(row,rowIndex) {
       let uID=row['userName'];
         // console.log(uID)
          if(row['userStatus']==''){
            //console.log('已经启用');
          }
          else{
            //console.log('启用账户');
            request({
              url:'api/manageUser/allowUser',
              method:'post',
              data:{
                uid:uID
              }
            }).then(res=>{
              if(res.msg=='success'){
                this.$message.success('启用账户成功！')
                this.showUser()
              }
              else{
                this.$message.error('启用账户失败！')
              }
            })
          }
      },
          viewDetails(row,index){
            this.behaviorDialogTableVisible=true;
            var uid=row['userName'];
            request({
              url:'api/manageUser/userBehavior',
              method:'post',
              data:{
                uid:uid
              }

            }).then(res=>{
              if(res.msg=='success'){
                var list1=res.sawList;
                list1.forEach(element => {
                  element['seeTime']=dateFormat(new Date(element['seeTime']),'YY-MM-DD HH:mm')
                });
                this.sawData=list1;
                var list2=res.favList;
                list2.forEach(element => {
                  element['time']=dateFormat(new Date(element['time']),'YY-MM-DD HH:mm')
                });
                this.favData=list2;
              }
            })
          }
    },
    mounted(){
        if(!getAdminName()){
            this.$router.push('/admin')
        }
        this.showUser();
    },
    data() {
      return {
       tableData:[],
       sawData:[],
       favData:[],
       behaviorDialogTableVisible:false,
      }
    }
  }
</script>
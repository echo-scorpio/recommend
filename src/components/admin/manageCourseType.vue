<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="创建日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.cTime }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="类型"
      width="180"
      
      >
     <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>类型id: {{ scope.row.cID }}</p>
          <p>创建日期: {{ scope.row.cTime }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" v-show="!scope.row.show">{{ scope.row.cType }}</el-tag>
            <el-input v-show="scope.row.show" v-model="scope.row.cType"></el-input>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    

    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          v-show="!scope.row.show"
          >编辑</el-button>
          <el-button
          size="mini"
          @click="handleSave(scope.$index, scope.row)"
          v-show="scope.row.show"
          >保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


 <!--添加类型-->
<el-button type="primary" @click="dialogFormVisible = true">添加类型</el-button>
<el-dialog title="添加类型" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="类型名称" label-width="80px">
      <el-input v-model="form.type" autocomplete="off" style="width:150px"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addType()">确 定</el-button>
  </div>
</el-dialog>

<div>
<el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next" :total="total">
      </el-pagination>
</div>

</div>
</template>

<script>
function dateFilter(input) {
   var d = new Date(input); 
   var year = d.getFullYear();
   var month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1); 
   var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate(); 
   return ( year + "-" + month + "-" + day); 
   }
import request from '@/utils/request'

  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
         /**分页功能 */
    currentPage: 1, //默认第一页
      total: 0, //总条数
      pageSize: 5, 
      
      }
    },
    mounted(){
        this.showType();
    },
    methods: {
      handleEdit(index, row) {
        row.show=true;
        console.log(index, row);
      },
      handleDelete(index, row) {
        //console.log(index, row.cID);
        request({
            url:'api/manageCourse/delType',
            method:'post',
            data:{
                id:row.cID
            }
        }).then(res=>{
            if(res.msg=='success'){
                this.$message.success('删除成功');
               this.showType();
            }
            else{
                this.$message.error('删除失败')
            }
        })
      },
      handleSave(index,row){
        row.show=false;
        //console.log(row.cType)
        //console.log(row.cID)
          request({
              url:'api/manageCourse/queryTypeStatus',
              method:'post',
              data:{
                  type:row.cType
              }
          }).then(res=>{
              if(res.msg=='exists'){
                  this.$message.error('该类型已存在!')
              }
            else{
                 request({
                    url:'api/manageCourse/editCourseType',
                    method:'post',
                    data:{
                        type:row.cType,
                        id:row.cID
                        }
                }).then(res=>{
                    if(res.msg=='success'){
                         this.$message.success('修改成功~');
                       this.showType();
                    }
                    else{
                        this.$message.error('修改失败')
                    }
                })
            }
        })
    
      },
      showType(){
         let start = (this.currentPage-1)*this.pageSize;
         let num=this.pageSize;
        
            request({
              url:'api/manageCourse/showType',
              method:'post',
              data:{
                start:start,
                num:num
              }
          }).then(res=>{
             
              if(res.msg=='success'){
                  let data=res.list;
                 // console.log(data)
                  data.forEach(element => {
                    element.cTime= dateFilter(element.cTime);         
                    element.show=false;
                    
                  });
                  this.tableData=data;
                  this.total=res.totalNum[0]['total']
               
                //console.log(res.totalNum)
                 
              }
          })
        
      
      },
      addType(){
         
          this.dialogFormVisible = false
          request({
              url:'api/manageCourse/queryTypeStatus',
              method:'post',
              data:{
                  type:this.form.type
              }
          }).then(res=>{
              if(res.msg=='exists'){
                  this.$message.error('该类型已存在!');
              }
              else{
                 
                     request({

              url:'api/manageCourse/addCourseType',
              method:'post',
              data:{
                  type:this.form.type
                  }
          }).then(res=>{
             
              if(res.msg=='success'){
                  this.$message.success('添加成功~');
                 this.showType();

              }
              else{
                  this.$message.error('添加失败')
              }
             
          })
              }
          })
       
          
      },
     //分页功能
    handleSizeChange(val) {
      this.pageSize = val;
      this.showType()
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.showType()
    },

      
    }
  }
</script>

<style>
.el-input__inner{
        height: 28px;
    line-height: 26px;
}
</style>
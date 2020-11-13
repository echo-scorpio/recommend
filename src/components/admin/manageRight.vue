<template>
<div>
  <table class="container" id="adminTable">
    <thead>
      <tr>
        <th>管理员ID</th>
        <th>姓名</th>
        <th  colspan="4">权限</th>
      </tr>
    </thead>
   
      <tr  v-for="(item,index) in tableData" :key="index">
        <td>{{item.id}}</td>

        <td>{{item.name}}</td>
         <td style="display: none" id="rules">{{item.admin_right}} </td>
        <td><input type="checkbox" name="manageUser" class="ManageUser" value="1" >课程管理</td>
            <td><input type="checkbox" name="manageUser" class="ManageUser" value="2">课程类型管理</td>
            <td><input type="checkbox" name="manageUser" class="ManageUser" value="3" >用户管理</td>
            <td><input type="checkbox" name="manageUser" class="ManageUser" value="4">数据统计</td>
            <td><button @click="editRight(this)">保存</button></td>
      </tr>
    
  </table>
  <el-button type="text" size="mini" @click="dialogFormVisible = true">添加管理员</el-button>
  <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" required></el-input>
    </el-form-item>
    <el-form-item label="权限" :label-width="formLabelWidth">
     
      <el-checkbox v-for="(item,index) in rightList" :key="index"  v-model="checkList" :label="index+1">{{item}}</el-checkbox>
    
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addAdmin">确 定</el-button>
  </div>
</el-dialog>
 <!--
 <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    id="tab">
    <el-table-column
      prop="id"
      label="管理员ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="admin_right"
      label="权限">
    
   <template>
       
       
         <el-checkbox v-for="(item,index) in list" :key="index"  :checked="item.checked"  @change="handelChange">{{item.name}}</el-checkbox>
   
  
</template>
     
       
       <el-checkbox-group v-model="tt">
          <el-checkbox v-for="mpb in permissionBeans" :key="mpb.id" :label="mpb.name"  :checked="mpb.checked" @change="handelChange">{{mpb.name}}</el-checkbox>
       </el-checkbox-group>
      -->
<!--
     
     
    </el-table-column>
  </el-table>-->
</div>
   
</template>
<script>
import request from '@/utils/request'
window.onload=function (){
 var tab=document.getElementById('adminTable');
          var row=tab.rows;
         // console.log(row)
        //  console.log(row.length)
           var roleArray=['课程管理','课程类型管理','用户管理','数据统计'];
          
    for(var i=0;i<row.length;i++){
      var cell = row[i].cells; //获取第二行的列
		var rule=cell[2].innerHTML;
    var strs= new Array(); //定义一数组 
strs=rule.split(",");
//console.log('cell')
 //alert(strs);

for(var j=0;j<roleArray.length;j++){

  var role=strs[j];
  if(role!=undefined){
    role=role.replace(/\s/g,"");
  }
  //console.log(role)
 // console.log(tab.rows[i].cells[4].getElementsByTagName("INPUT")[0].checked)
 switch (role) {
   case '1':
    tab.rows[i].cells[3].getElementsByTagName("INPUT")[0].checked = "checked";
    break;
     case '2':
    tab.rows[i].cells[4].getElementsByTagName("INPUT")[0].checked = "checked";
     break;
     case '3':
    tab.rows[i].cells[5].getElementsByTagName("INPUT")[0].checked = "checked";
     break;
     case '4':
    tab.rows[i].cells[6].getElementsByTagName("INPUT")[0].checked = "checked";
     break;
    
   default:
     break;
 }

}

    }
}
export default{
    
    mounted(){
          //console.log("tab4组件")
          this.showList();
      },
      data(){
        return{
          tableData:[],
          list:[{
            name:'课程管理'
          },
          {
            name:'课程类型管理'
            },
          {
            name:'用户管理'
            },
          {
            name:'数据统计'
            }],
          rightList:['课程管理','课程类型管理','用户管理','数据统计'],
          checkList:[],
          check:false,
          form:{
            name:''
          },
          formLabelWidth: '120px',
        dialogFormVisible: false,
        rightArr:[],
         
        }
      },
      methods:{
        RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
},
        showList(){
        
         /* for(var i=0;i<this.list.length;i++){
            if(i==2){
               this.$set(this.list[i],'checked',true)
            }
            else{
 this.$set(this.list[i],'checked',false)
            }
            
         
          }*/

          request({
            url:'api/manageUser/showAdminList',
            method:'post',
            data:{}
          }).then(res=>{
            if(res.msg=='success'){
             
              this.tableData=res.list;
              
              console.log(res.list)
          /**因为在dom加载完之前就会执行js所以不能在此处为复选框赋值，要在页面全部加载完之后再为复选框赋值 */
            }
          })
        },
    
        editRight(obj){
         // console.log('click')
         var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td 
		var index=td.parentElement.parentElement.rowIndex;
		var tab = document.getElementById("adminTable");
		var row = tab.rows; //获取table的行
		var cell = row[index].cells; //获取第二行的列
    var idNum=cell[0].innerHTML; //会员号
		var name=cell[1].innerHTML;
    var roleStr="";
    for(var i=3;i<7;i++){
     var  textt=tab.rows[index].cells[i].getElementsByTagName("INPUT")[0].value;
      if(tab.rows[index].cells[i].getElementsByTagName("INPUT")[0].checked ==true){
        //alert("isChecked");
        roleStr+=tab.rows[index].cells[i].getElementsByTagName("INPUT")[0].value+"|";
      }
      
    }

    if(roleStr==''){
      roleStr='0'
    }
    //console.log('str',roleStr.split('|'))
    request({
      url:'api/manageUser/editRight',
      method:'post',
      data:{
        id:idNum,
        name:name,
        right:roleStr
      }
    }).then(res=>{
      console.log(res.msg)
      if(res.msg=='success'){
        this.showList();
        this.$message.success('权限修改成功')
      }
    })
   // console.log(idNum+''+roleStr+name)


        },
        addAdmin(){
          var uid=this.RndNum(6);
          var name=this.form.name;
          var right=this.checkList;
          if(right.length==0){
            right[0]=0;
          }
          if(name.length==0){
            this.$$message.error('姓名不能为空');
          }
          else{
            request({
              url:'api/manageUser/addAdmin',
              method:'post',
              data:{
                id:uid,
                name:name,
                rights:right
              }

            }).then(res=>{
              this.dialogFormVisible=false;
             // this.showList();
              location.reload()
              this.$message.success('管理员添加成功')
            })
          }
          
        }
      }

}
</script>

<style>
.container{
  width:80%;
  height: auto;
  
}
.innerContainer{
  width:100%
}
</style>
<template>
<div>
 
<div class="headBox">
            <img src="src\assets\demo\headPic.png" alt="">
        </div>
        <div class="uInfo">
            <div class="uName">{{userName}}</div>
            <div class="editInfo">
                <el-button type="text" icon="el-icon-edit" style="margin-left: 60%;font-size: 22px;"  @click="infoClick"></el-button>
            </div>
            <ul>
                <li>简介:<span style="font-size: 14px;color: gray; width: 79%;margin-bottom: 5px;display:block">{{uIntro}}</span></li>
                <li>
                    <ul class="uIcon">
                        <li><img src="src\assets\demo\sex.png" style="width:20px;height:20px"></li>
                       
                        <li><img src="src\assets\demo\calender.png" style="width:20px;height:20px"></li>
                        <li><img src="src\assets\demo\favIcon.png" style="width:20px;height:20px"></li>
                    </ul>
                    <ul class="uDetails">
                        <li>{{uSex}}</li>
                        
                        <li>{{logonTime}}加入</li>
                        <li>
                        <checker
                        v-model="demo4"
                        default-item-class="demo4-item"
                        
                        disabled-item-class="demo4-item-disabled">
            
            <checker-item v-for="item in typeList1" :key="item.cID" :value="item.cID" disabled> {{item.cType}} </checker-item>
          </checker>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <el-button type="text" style="    margin-top: 27px;margin-right: 10px;margin-left: 10px;" @click="editPasswordDialogVisable=true">修改密码</el-button>
<!-- 编辑资料Form -->


<el-dialog title="编辑资料" :visible.sync="dialogFormVisible">
   <el-table
    :data="tableData"
    style="width: 100%;"
    
        id="table"
    >
    <el-table-column>
  <template slot-scope="props">
  <el-form>   
          <el-form-item label="简介">
            <el-input placeholder="请输入内容"  v-model="props.row.uIntro"></el-input>
           
          </el-form-item>
     
    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="uSex" placeholder="选择性别" @change="changeType($event)">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item >
      <divider>感兴趣的课程类型</divider>
       <checker
    v-model="demo6"
    type="checkbox"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
     <checker-item v-for="item in allTypeList" :key="item.cID" :value="item.cID">{{item.cType}}</checker-item>
    </checker>
    </el-form-item>
  </el-form> 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editInfo(props.row)">确 定</el-button>
  </div>
  </template>
   </el-table-column>
   
  </el-table>
  
</el-dialog>

<!--修改密码dialog-->
<el-dialog title="修改密码" :visible.sync="editPasswordDialogVisable">
  <el-form>
    <el-form-item label="旧密码" :label-width="formLabelWidth">
      <el-input :show-password="showPassword" placeholder="字数要求6-16位" type="password" v-model="oldPass" @blur="oldNewCheck" autocomplete="off" style="width:70%"></el-input>
    </el-form-item>
   <el-form-item label="新密码" :label-width="formLabelWidth">
     <el-input :show-password="showPassword" v-model="newPass" placeholder="字数要求6-16位" type="password"      auto-complete="off" style="width:70%"></el-input>
   </el-form-item>
   <el-form-item label="确认新密码" label-width="90px">
     <el-input :show-password="showPassword" v-model="surePass" placeholder="字数要求6-16位" type="password" @blur="repeatCheck" auto-complete="off" style="width:70%"></el-input>
   </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editPasswordDialogVisable = false">取 消</el-button>
    <el-button type="primary" :disabled="disable" @click="editPassword">确 定</el-button>
  </div>
</el-dialog>

</div>
 
</template>

<script>
import {Checker,CheckerItem,Divider,dateFormat} from 'vux'
import {getUserName} from '@/utils/auth'
import request from '@/utils/request'
  export default {
    components: {
    
        Checker, 
        CheckerItem,
        Divider
  },
    data() {
      return {
        dialogFormVisible: false,
        editPasswordDialogVisable:false,
       userName:'',
             dialogPassword: false,
             dialogInfo:false,
      loading: false,
             form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      //喜欢的课程类型
      demo4:'',
      typeList1:[],/**展示喜欢的标签 */
      typeList2:[],/**修改信息页面展示的类型标签 */
      typeIDlist:[],
      allTypeList:[],
      uSex:'',//信息展示页面的性别
      sex:'',//编辑信息页面的性别
      logonTime:'',
      uIntro:'',
      demo6: '',//编辑信息页面
      tableData:[],
      /**修改密码 */
      password:'',
      oldPass:'',
      newPass:'',
      surePass:'',
      disable:false,//按钮是否可点击
      showPassword:true,//是否点击显示密码

      }
      
    },
    mounted(){
      if(getUserName()){
        this.showInfo();
      }
      else{
        this.$router.push('/')
      }
        
    },
    
    methods:{
      changeType(event){
        //console.log(event);
        this.sex=event;
      
      },
      infoClick(){//点击编辑信息按钮后展示用户曾经选择的喜欢的课程类型
        this.dialogFormVisible = true;
        this.demo6=this.typeIDlist;
        //console.log(this.demo6)
         request({
                url:'api/manageCourse/selType',
                method:'post',
                data:{}

            }).then(res=>{
                if(res.msg=='success'){
                    this.allTypeList=res.list
                }
            })
      },
        showInfo(){ //用户信息展示页面展示的内容
          this.userName=getUserName()
          request({
            url:'api/user/queryUInfo',
            method:'post',
            data:{
              uid:this.userName
            }
          }).then(res=>{
            this.tableData=res.uInfo
            res.uInfo.forEach(element => {
              this.uSex=element['uSex'];
              this.logonTime=dateFormat(new Date(element['time']),'YYYY-MM-DD');
              this.uIntro=element['uIntro'];
              this.password=element['password'];//数据库中存储的未更改之前的用户密码
             });
           this.typeList1=res.type;
           for(var i in res.type){
             this.typeIDlist[i]=res.type[i]['cID'];
            
           }
         
          })
        },
        editInfo(row){
         // this.dialogFormVisible=false;
          console.log(row.uIntro)
         
          var type = this.sex;
          if(type==''){
            type=row.uSex
          }
          console.log(type)
         // console.log(type+row.uIntro)
          console.log(this.demo6)
          if(this.demo6==''){
            this.$message.error('至少选择一个课程类型');
          }
          else{
            request({
                        url:'api/user/editUser',
                        method:'post',
                        data:{
                          uid:getUserName(),
                          intro:row.uIntro,
                          sex:type,
                          cType:this.demo6

                        }
                      }).then(res=>{
                        if(res.msg=='success'){
                          this.$message.success('信息修改成功');
                          this.dialogFormVisible = false;
                          this.showInfo();//重新加载用户信息

                        }
                        else{
                          this.$message.error('修改失败');
                        }
                      })
          }
         
        },
        oldNewCheck(){
          if(this.oldPass!=this.password){
            this.$message.error('新旧密码不一致');
            this.disable=true;
          }
          else{
            this.disable=false;
          }
        },
        repeatCheck(){
          if((this.newPass.length<6 || this.newPass.length>16)|| (this.surePass.length<6 || this.surePass.length>16)){
            //console.log('密码长度不符合要求');
            this.$message.error('密码长度不符合要求');
            this.disable=true;
          }
          else{
            this.disable=false;
            console.log(this.disable)
            if(this.newPass!=this.surePass){
            this.$message.error('两次输入密码不一致');
           this.disable=true;
          }
          else{
            this.disable=false;
            console.log(this.disable)
          }
          }
          

        },
        editPassword(){
          //this.editPasswordDialogVisable=true;
          
          console.log(this.oldPass+" "+this.newPass+" "+this.surePass)
          request({
            url:'api/user/editPass',
            method:'post',
            data:{
              uid:getUserName(),
              password:this.newPass
            }
          }).then(res=>{
            if(res.msg=='success'){
              this.$message.success('密码修改成功');
              this.editPasswordDialogVisable=false;
            }
            else{
              this.$message.error('修改失败，请稍后重试')
            }
          })
        },
         handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
  
    }
  };
</script>

<style>

/**展示用户添加的课程类型标签 */
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.demo4-item-disabled {
  background-color: #FF3B3B;
  color: #fff;
}

/**课程类型标签样式 */
.demo5-item {
  width: 95px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}

.el-dialog{
  width:100%
}

.headBox{
    width: 50px;
    height: 50px;
    border-radius: 25px;
       position: absolute;
    left: 49%;
    top: 20px;
   
                    
}
.headBox img{
 border: 1px solid gray;
 width: 50px;
    height: 50px;
    border-radius: 25px;
   

}
.uInfo{
    margin-top: 25%;
    width: 100%;
    padding-left: 10px;
}

.uName{
    width:49%;
    float: left;
    font-size: 30px;
}
.editInfo{
    width:49%;
    float: left;
}
.uIcon{
    width: 10%;
    float: left;
    
    list-style: none
}
.uIcon li{
  margin-bottom: 10px;
  height: 30px;
    line-height: 30px;
}
.uDetails{
    width:70%;
    float: left;
    list-style: none;
    font-size: 14px;
    color: gray;
}
.uDetails li{
    height: 30px;
    margin-bottom: 10px;
}
ul,li{
    list-style: none;
}

/**调整修改信息页面弹出框的位置 */
.el-table__header-wrapper{
  display: none;
}
.el-dialog__body{
  margin-top: -35px;
}
</style>
<template>
  <div>
    <h2 style="padding-left: 35%;padding-top: 10px;"><img src="/src/assets/demo/title.png" alt=""></h2>
    <p style="padding-left: 10px;color: gray;margin-top: 5px; width:70%">欢迎登陆~<span style="color:#000">{{userName}}</span></p>
    <el-button type="text" icon="el-icon-edit" style="float: right;margin-right: 20px;margin-top: -31px;font-size: 22px;"  @click="dialogFormVisible=true;"></el-button>
    <div class="slogan">
  <p>{{slogan}}</p>
    </div>
    <el-dialog title="立个flag" :visible.sync="dialogFormVisible" width="100%">
  <el-form >
    <el-form-item >
      <el-input v-model="editSlogan" autocomplete="off" maxlength="16"
  show-word-limit></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="click">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<style>
body{
  background-color: #FFFFFF
}
</style>

<script>
import {getUserName} from '@/utils/auth'
import request from '@/utils/request'
export default {
  mounted(){
    if(getUserName()){
      this.userName=getUserName();
      this.showSlogan();
      
    }
  },
  components: {
    
  },
  data () {
    return {
      userName:'',
      slogan:'',
      editSlogan:'',
      dialogFormVisible:false,
    }
  },
  methods:{
    showSlogan(){
      var uid=getUserName()
      request({
        url:'api/user/showSlogan',//调用node.js中show的接口
        method:'post',
        data:{uid:uid},       
      }).then(res=>{
        //console.log(res.list);
        if(res.msg=='success'){
          this.slogan=res.data[0]['uSlogan'];
          this.editSlogan=this.slogan;
         // console.log(res.data)
        }
      })
    },
    click(){
      this.dialogFormVisible = false;
      var data=this.editSlogan;
      var uid=getUserName()
      if(data.length!=0){
         request({
        url:'api/user/editSlogan',
        method:'post',
        data:{
          uid:uid,
          info:data
        }
      }).then(res=>{
        this.showSlogan()
      })
      }
     
    },
  
  }
}
</script>
<style>
.slogan{
  width:100%;
  height: 70px;
  background: url('/src/assets/demo/target.png') no-repeat right bottom;
    
}
.slogan p{
  margin-left: 10px;
  padding-top: 20px;
 
}
</style>
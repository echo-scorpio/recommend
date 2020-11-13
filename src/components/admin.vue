<template>

  <div>

  
<form action="">
<group title="用户登录">
      <x-input title="用户名" placeholder="请输入用户名" v-model="userID"></x-input>
      <x-input type="password" title="密码" placeholder="请输入密码"  v-model="password"></x-input>
    </group>
      
    <div class="form-group btn100">
     
           <button type="button" @click="login" class="btn btn-primary">登陆</button>
           
       </div>
       
</form>
    
    
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell,Toast,Divider } from 'vux'
import $ from 'jquery'
import axios from 'axios'
import request from "@/utils/request"
import { setToken, setUserName,setAdminName } from "@/utils/auth"

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Toast,
    Divider,
    
   
  },
  data () {
      return{
          userID:'',
    password:'',
    errorFlag:false,
    errorMsg:'',
   
      }
   
  },
  
      methods:{
        //登录
			login(){
				request({
          url: '/api/user/adminLogin',
						   
						    method: 'post',
						    
						    data: {
						         'username':this.userID,
						         'password' : this.password
                }
						}).then(res=>{
               
               
              if(res.msg=="登录成功"){
                
               
                setToken(res.token);
                  setAdminName(res.adminName)         
                   this.$router.push("adminIndex");
               
              }
              else{
                this.showPositionValue=true;
                this.toastText = "用户名或密码错误，请重新输入";
                location.reload();
              }
            })
					
			},
		    logon(){
          //console.log('---------------------')
          this.$router.push('Logon');
  }
  }
  //注册
  
}
</script>
<style>

.btn-primary{
  	width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
	background-color: #1AAD19;
	position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.33333333;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
}
</style>
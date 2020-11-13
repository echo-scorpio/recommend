<template>
    <div>
        
         <group><!--查询用户名和头像-->
             <cell :title="userName"  is-link link="/myInfo" style="font-family: '微软雅黑';
                                font-size: 20px;color:#0bbd87;
                                " >
               
                    <img slot="icon"  style="display:block;
                    margin-right:20px;width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    border: 1px solid gray;"
                     src="src\assets\demo\headPic.png" alt="" >
                    
               
                
            </cell>
     
      <cell title="我的收藏" is-link link="/myFav">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="src\assets\demo\myFav.png">
        
      </cell>
      <cell title="观看历史" is-link link='/seeHistory'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="src\assets\demo\history.png">
        
      </cell>
    </group>
     <divider></divider>
     <divider></divider>
           <button type="button" @click="logout" class="btn btn-primary">退出登录</button>
           <group>
    </group>
    
    <div>
      <confirm
      v-model="show4"
      :close-on-confirm="false"
      title="确定退出咩"
      @on-confirm="onConfirm4"
      @on-cancel="onCancel"
      >
        <p style="text-align:center;"></p>
      </confirm>
    </div>
    <app-footer></app-footer>
    </div>
    
</template>
<script>
import {Group,Cell,Divider,Confirm,XSwitch} from 'vux'
import {getUserName,removeToken,removeUserName} from '@/utils/auth'
import request from '@/utils/request'
import AppFooter from './Footer'
export default{
    components:{
        Group,
        Cell,
        Divider,
        Confirm,
        XSwitch,
        AppFooter

    },
    data(){
        return{
            show4: false,
            userName:''
        }
    },
    mounted(){
      if(getUserName()){
        this.loadUserInfo()
      }
      else{
        this.$router.push('/')
      }
      
    },
    methods:{
      loadUserInfo(){
        this.userName=getUserName()
        //console.log(this.userName)
      },
        onCancel () {
     
    },
         onConfirm4 () {
      
      setTimeout(() => {
        
        this.show4 = false
      }, 1000)
      this.$router.push('/');
      location.reload();
      removeUserName()
      removeToken()
    },
        logout(){
           // onConfirm4()
           this.show4=true;
            
            
        }
    }
}
</script>
<style>
.btn-primary{
  	width: 50%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
	background-color: rgb(9, 138, 99);
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
    -webkit-tap-highlight-color: rgba(14, 216, 74, 0);
    overflow: hidden;
}
</style>
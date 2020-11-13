<template>
    <div>
        <form action="">
            <group title="注册">
                <x-input title="用户名" v-model="uID" placeholder="4-16个字符" ref="input01" :min="4" :max="16" @on-blur="check" required></x-input>
                <x-input title="密码"  type="password" placeholder="最少6个字符" v-model="password" :min="6"></x-input>
                <x-input title="确认密码" v-model="password2" type="password" placeholder="" :equal-with="password"></x-input>
            </group>

            <divider></divider>
            <!--选择推荐类型-->
            <divider>你对什么类型的课程感兴趣？</divider>
    <checker
    v-model="demo6"
    type="checkbox"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    style="margin-left:10%"
    >
      <checker-item v-for="item in typeList" :key="item.cID" :value="item.cID">{{item.cType}}</checker-item>
    </checker>
     <divider></divider>
           <button type="button" @click="logon" class="btn btn-primary">注册</button>
        </form>
    </div>
</template>
<script>
import {XInput,Group,Divider,Checker,CheckerItem } from 'vux'
import request from '@/utils/request'
export default{
    mounted(){
        this.showType();
    },
    components:{
        XInput,
        Group,
        Divider,
        Checker, 
        CheckerItem,
    },
    data(){
        return {
            password:'',
            password2:'',
            demo6: [],
            typeList:[],
            uID:'',
            exists:''
        }
    },
    methods:{
        showType(){
            request({
                url:'api/manageCourse/selType',
                method:'post',
                data:{}

            }).then(res=>{
                if(res.msg=='success'){
                    this.typeList=res.list
                }
            })
        },
        check(){//查询要注册的用户是否已经存在
            request({
                url:'api/user/getUserList',
                method:'post',
                data:{
                    uid:this.uID
                }
            }).then(res=>{
                if(res.msg=='yes'){
                    this.$message.error('该用户已存在！')
                    this.exists='yes'
                }
                else{
                    this.exists='no'
                }
            })
        },
        logon(){
            //console.log(this.uID,this.password)
            if((this.uID.length<4 || this.uID.length>16) || (this.password.length<6) ||(this.password!=this.password2)){
                this.$message.error('所填内容不符合要求')
            }
            else{
                if(this.demo6.length==0){
                this.$message.error('请至少选择一个课程类型哦~')
                
                 }
                else{
                    if(this.exists=='yes'){
                        this.$message.error('该用户已存在，不能注册')
                    }
                    else{
                        request({
                            url:'api/user/createUser',
                            method:'post',
                            data:{
                                uid:this.uID,
                                password:this.password,
                                cType:this.demo6
                            }
                        }).then(res=>{
                            if(res.msg=='success'){
                                this.$message.success('注册成功');
                                this.$router.push('/')
                            }
                        })
                        //logon
                        //this.$message.success('ok')
                    }
                }
            }
            
            //console.log(this.demo6)
        }
    }
}
</script>
<style>
body{
    background-color:#FFFFFF
}
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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
}
</style>
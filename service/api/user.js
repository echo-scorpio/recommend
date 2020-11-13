var models = require('../db');
var express = require('express');
const jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 登录接口
router.post('/login', (req, res) => {
  var sql = $sql.user.login;
  var params = req.body;
 // console.log(params);
  conn.query(sql, [params.username, params.password], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    
   
    if (data.length === 0) {
      return res.send({
        status: 1,
        msg: "用户名或密码错误"
      })
    } else {
        let content = {
          username: params.username,
          adminName:params.username
        }
        
        let secretOrPrivateKey = "_jwt"; // 这是加密的key（密钥）
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 1 // 1小时过期
        });
        
          return res.send({
            status: 1,
            msg: '登录成功',
            list:data,
            username: params.username,
            token: token,
            
          })
    
    }
  })
});
//管理员登录
router.post('/adminLogin', (req, res) => {
  var sql = $sql.user.adminLogin;
  var params = req.body;
 // console.log(params);
  conn.query(sql, [params.username, params.password], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    
   
    if (data.length === 0) {
      return res.send({
        status: 1,
        msg: "用户名或密码错误"
      })
    } else {
      
     
        let content = {
          username: params.username
          
        }
        
        let secretOrPrivateKey = "_jwt"; // 这是加密的key（密钥）
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 1 // 1小时过期
        });    
         return res.send({
            status: 1,
            msg: '登录成功',
            list:data,
            adminName: params.username,
            token: token,
      });
     
     
    }
  })
});


// 创建用户  当用户已存在时不能创建（用户名是唯一的）
router.post('/createUser', (req, res) => {
  var sql = $sql.user.createUser;//用户表插入记录
  var params=req.body;
  //console.log(req);
  conn.query(sql, [params.uid,params.password], function (err, result) {
    console.log(err)
    var data = JSON.parse(JSON.stringify(result))
    if(data.affectedRows==1){
      var user_cType=$sql.user.addUserCourseType;//添加用户感兴趣的课程类型
      conn.query(user_cType,[params.uid,params.cType],function(err,result){
        //console.log(err)
        addResult=JSON.parse(JSON.stringify(result));
        if(addResult.affectedRows==1){
          var sql2=$sql.user.addUserDetails;//添加用户详细信息
          conn.query(sql2,[params.uid],function(err,result){
            console.log(err)
            var detailsResult=JSON.parse(JSON.stringify(result));
            if(detailsResult.affectedRows==1){
              return res.send({
                status:1,
                msg:'success'
              })
            }
            else{
              return res.send({
                status:1,
                msg:'error'
              })
            }
          })       
        }
       
      })
     
    }
    
   
  })
});

// 查询用户列表
router.post('/getUserList', (req, res) => {
  var sql = $sql.user.queryUserList;
  var params = req.body;
  // console.log(params);
  conn.query(sql, [params.uid], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    if(data.length!=0){
      return res.send({
        status: 1,
        msg: "yes",
       
      })
    }
    else{
      return res.send({
        status: 1,
        msg: "no",
       
      })
    }
    
  })
});

//查询用户信息
router.post('/queryUInfo',(req,res)=>{
  var params=req.body;
  var uInfo=$sql.user.uInfo;
  conn.query(uInfo,[params.uid],function(err,result){
    var info=JSON.parse(JSON.stringify(result))
    
    if(info.length!=0){
      var sql=$sql.recommend.queryCid;
 
  let cidArr=[]
  conn.query(sql,[params.uid],function(err,result){
      var data=JSON.parse(JSON.stringify(result));
      for(k in data){
          //console.log(k+"---"+data[k])
          for(v in data[k]){
              var str=data[k][v].split(',');
              
              for(i=0;i<str.length;i++){
                  cidArr[i]=str[i] //bug--把查出来的用户感兴趣的课程类型变为数组存储，不然查出来的是string类型，只能查出一个课程
              }
          }
      }
      var sql1=$sql.recommend.queryUserFavCType;
      conn.query(sql1,[cidArr],function(err,result){
        var cType=JSON.parse(JSON.stringify(result));
       
     // console.log(info)
      //  console.log(cType)
        return res.send({
          msg:'success',
          uInfo:info,
          type:cType
        })
      
      })
    })
    }
  })
 
  })

  router.post('/editUser',(req,res)=>{
    var sql1=$sql.user.editInfo;
    var params=req.body;
    conn.query(sql1,[params.intro,params.sex,params.uid],function(err,result){
      //console.log(err)
      var data1=JSON.parse(JSON.stringify(result));
      if(data1.affectedRows==1){
        var sql2=$sql.user.editSelType;
        conn.query(sql2,[params.cType,params.uid],function(err,result){
          //console.log(err)
          var data2=JSON.parse(JSON.stringify(result))
          if(data2.affectedRows==1){
            return res.send({
              msg:'success'
            })
          }
          else{
            return res.send({
              msg:'error'
            })
          }
        })
      }
    })
  })
  //修改密码
  router.post('/editPass',(req,res)=>{
    var sql1=$sql.user.editPassword;
    var params=req.body;
    conn.query(sql1,[params.password,params.uid],function(err,result){
      console.log(err)
      var data1=JSON.parse(JSON.stringify(result));
      if(data1.affectedRows==1){
       return res.send({
         msg:'success'
       })
      }
      else{
        return res.send({
          msg:'error'
        })
      }
    })
  }) 

  router.post('/showSlogan',(req,res)=>{
    var sql=$sql.user.showSlogan;
    var params=req.body;
    conn.query(sql,[params.uid],function(err,result){
      var data=JSON.parse(JSON.stringify(result))
      return res.send({
        msg:'success',
        data:data
      })
    })
  })
  router.post('/editSlogan',(req,res)=>{
    var sql=$sql.user.updateSlogan;
    var params=req.body;
    conn.query(sql,[params.info,params.uid],function(err,result){
      var data=JSON.parse(JSON.stringify(result))
      return res.send({
        msg:'success',
        
      })
    })
  })
  module.exports=router
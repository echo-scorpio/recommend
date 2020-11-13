var models = require('../db');
var express = require('express');
const jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');

var conn = mysql.createConnection(models.mysql);
conn.connect();

router.post('/showUser',(req,res)=>{
    var sql=$sql.manageUser.userInfo;
    conn.query(sql,[],function(err,result){
        var data=JSON.parse(JSON.stringify(result));
        if(data.length!=0){
            return res.send({
                msg:'success',
                data:data
            })
        }
        else{
            return res.send({
                msg:'error'
            })
        }
    })
})


//禁用账户
router.post('/forbidUser',(req,res)=>{
    var sql=$sql.manageUser.forbid;
    var params=req.body;
    conn.query(sql,[params.uid],function(err,result){
        //console.log(err)
        var data=JSON.parse(JSON.stringify(result));
        if(data.affectedRows==1){
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
//启用账户
router.post('/allowUser',(req,res)=>{
    var sql=$sql.manageUser.allow;
    var params=req.body;
    conn.query(sql,[params.uid],function(err,result){
       // console.log(err)
        var data=JSON.parse(JSON.stringify(result));
        if(data.affectedRows==1){
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

//查询用户观看，收藏课程记录userBehavior
router.post('/userBehavior',(req,res)=>{
    var sql1=$sql.manageUser.seeHistory;
    var params=req.body;
    conn.query(sql1,[params.uid],function(err,result){
        var seeResult=JSON.parse(JSON.stringify(result));
        var sql2=$sql.manageUser.favHistory;
        conn.query(sql2,[params.uid],function(err,result){
            var favResult=JSON.parse(JSON.stringify(result));
            return res.send({
                msg:'success',
                sawList:seeResult,
                favList:favResult
            })
        })
    })
})


//展示出所有管理员的账号信息showAdminList
router.post('/showAdminList',(req,res)=>{
    var sql=$sql.manageUser.adminList;
    conn.query(sql,[],function(err,result){
        var data=JSON.parse(JSON.stringify(result));
        return res.send({
            msg:'success',
            list:data
        })
    })
})

//修改管理员权限editRight
router.post('/editRight',(req,res)=>{
    var delSql=$sql.manageUser.delRight;
    var params=req.body;
    var rights=(params.right).split('|');
    conn.query(delSql,[params.id],function(err,result){
       // var delResult=JSON.parse(JSON.stringify(result));
     //  console.log('delete error:'+err);
        if(rights.length!=0){
            var insertRight=$sql.manageUser.addRight;
            var flag=0;
            rights.forEach(element => {
                if(element!=''){
                    conn.query(insertRight,[params.id,element],function(err,result1){
                    })
                }
                
            });
           
                        return res.send({
                            msg:'success'
                        })
          
        }
        else{
            return res.send({
                msg:'success'
            })
        }
       
    })
})

//添加管理员
router.post('/addAdmin',(req,res)=>{
    var params=req.body;
    var add_admin_right=$sql.manageUser.addRight;
    var add_admin=$sql.manageUser.addAdmin;
    var add_admin_info=$sql.manageUser.addAdminInfo;
    conn.query(add_admin,[params.id,params.id],function(err1,result1){
       // console.log('adminerror',err1)
        var data1=JSON.parse(JSON.stringify(result1));
        if(data1.affectedRows!=0){
            conn.query(add_admin_info,[params.id,params.name],function(err2,result2){
              //  console.log('adminInfoError',err2)
                var data2=JSON.parse(JSON.stringify(result2));
                if(data2.affectedRows!=0){
                    params.rights.forEach(element => {
                        conn.query(add_admin_right,[params.id,element],function(err3,result){
                       //     console.log('adminRightERROR',err3)
                        })
                    });
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
        else{
            return res.send({
                msg:'error'
            })
        }
    })

   
})

//展示管理员信息
router.post('/showAdminInfo',(req,res)=>{
    var params=req.body;
    var sql=$sql.manageUser.showAdminInfo;
    conn.query(sql,[params.uid],function(err,result){
        var data=JSON.parse(JSON.stringify(result));
        if(data.length!=0){
            return res.send({
                msg:'success',
                list:data
            })
        }
        else{
            return res.send({
                msg:'error'
            })
        }
    })
})
module.exports=router
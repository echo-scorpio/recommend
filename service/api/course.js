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

// 展示全部课程
router.post('/show', (req, res) => {
  var sql = $sql.course.query;
  var params = req.body;
  //console.log(params);
  
  conn.query(sql,[],function(err, result) {
    
    var data = JSON.parse(JSON.stringify(result))
    if (data.length === 0) {
      return res.send({
        status: 1,
        msg: "查询课程信息失败"
      })
    }
   else{
      return res.send({
        status:1,
        msg:"查询成功",
        list:data
      })
    }
  })
 
});
//展示热门课程
router.post('/showPopularCourse', (req, res) => {
  var sql = $sql.course.queryPopularCourse;
  var params = req.body;
  //console.log(params);
  
  conn.query(sql,[],function(err, result) {
    
    var data = JSON.parse(JSON.stringify(result))
    if (data.length === 0) {
      return res.send({
        status: 1,
        msg: "查询课程信息失败"
      })
    }
   else{
      return res.send({
        status:1,
        msg:"success",
        list:data
      })
    }
  })
 
});

//首页展示热门课程,最近观看课程showList
router.post('/showList',(req,res)=>{
  var params=req.body;
  var pSql=$sql.course.pCourses;
  conn.query(pSql,[],function(err,result){
    var pData=JSON.parse(JSON.stringify(result));
    var rSql=$sql.course.rCourse;
    conn.query(rSql,[params.uid],function(err,result){
      var rData=JSON.parse(JSON.stringify(result));
      return res.send({
        msg:'success',
        popularList:pData,
        recentList:rData
      })
    })
  })
})


router.post('/queryStatus',(req,res)=>{//查询是否看过这个视频
  var seeStatusSql=$sql.course.querySeeStatus;
  var params=req.body;
  conn.query(seeStatusSql,[params.uid,params.cid],function(err,result){
    var queryResult=JSON.parse(JSON.stringify(result))
    if(queryResult.length==0){
     
      return res.send({
        status:1,
        msg:'1' //未观看过
      })
    }
    else{
      return res.send({
        status:1,
        msg:'0'
      })
    }
  })

})
//展示课程详细信息
router.post('/courseInfo',(req,res)=>{

  var sql = $sql.course.courseDetail;
  var params = req.body;
  conn.query(sql,[params.courseId,params.uid],function(err,result){
    var data = JSON.parse(JSON.stringify(result))
    if(data.length == 0){
      return res.send({
        status:1,
        msg:"查询失败"
      })
    }
    else{
      return res.send({
        status:1,
        msg:"查询成功",
        list:data
      })
    }
  })
 
})
router.post('/queryFavStatus',(req,res)=>{
  var sql = $sql.course.queryFavState;
  var params = req.body;
  conn.query(sql,[params.uid,params.cid],function(err,result){
    var data=JSON.parse(JSON.stringify(result))
    if(data.length==0){
      return res.send({
        status:1,//未收藏
        msg:'1'
      })
    }
    else{
      return res.send({
        status:1,//已收藏
        msg:'0'
      })
    }
  })
 
})
router.post('/favCourse',(req,res)=>{
  var sql = $sql.course.favorite;
  var params = req.body;
  conn.query(sql,[params.uid,params.cid],function(err,result){
    var data=JSON.parse(JSON.stringify(result))
    if(data.affectedRows==1){//收藏成功后更新收藏次数
      var updateFavTimes=$sql.course.addFavTimes;
      conn.query(updateFavTimes,[params.cid],function(err,result){
        var updateResult=JSON.parse(JSON.stringify(result))
        if(updateResult.affectedRows==1){
          return res.send({
            status:1,
            msg:'success'
          })
        }
      })
    
    }
    else{
      return res.send({
        status:1,
        msg:'error'
      })
    }
    
  })

})
router.post('/seeCourse',(req,res)=>{//将观看视频记录插入到t_user_seecourse
  var sql = $sql.course.see;
  var params=req.body;
  conn.query(sql,[params.uid,params.cid],function(err,result){
    //console.log(err)
  var addResult=JSON.parse(JSON.stringify(result))
  if(addResult.affectedRows==1){
    var updateSeeTimes=$sql.course.addSeeTimes;//t_course_favseetimes中的观看次数+1
    conn.query(updateSeeTimes,[params.cid],function(err,result){
      var updateResult=JSON.parse(JSON.stringify(result))
      if(updateResult.affectedRows==1){
        return res.send({
          status:1,
          msg:'success'
        })
      }
    })
    
  }
  })

})

router.post('/updateSeeTime',(req,res)=>{
  var sql=$sql.course.updateSeeTime;
  var params=req.body;
  conn.query(sql,[params.uid,params.cid],function(err,result){
    var data=JSON.parse(JSON.stringify(result))
    if(data.affectedRows==1){
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

})


//展示观看过的课程列表;
router.post('/seeCourseList',(req,res)=>{
  var sql=$sql.course.querySeeCourseList;
  var params=req.body;
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
        msg:'no'
      })
    }
  })
})

//收藏的课程 favCourseList
router.post('/favCourseList',(req,res)=>{
  var sql=$sql.course.queryFavCourseList;
  var params=req.body;
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
        msg:'no'
      })
    }
  })
})

//取消收藏课程 
router.post('/delFav',(req,res)=>{
  var sql=$sql.course.cancelFav;
  var params=req.body;
  conn.query(sql,[params.uid,params.cid],function(err,result){
    var data=JSON.parse(JSON.stringify(result));
    if(data.affectedRows!=0){
      return res.send({
        msg:'success',
        
      })
    }
    else{
      return res.send({
        msg:'no'
      })
    }
  })
})

//展示图表数据seeChartData
router.post('/seeChartData',(req,res)=>{
  var sql=$sql.course.seeData;
  conn.query(sql,[],function(err,result){
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

//课程收藏量数据展示favChartData
router.post('/favChartData',(req,res)=>{
  var sql=$sql.course.favData;
  conn.query(sql,[],function(err,result){
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

//折线图展示数据
router.post('/detailChart',(req,res)=>{
  var params=req.body;
  //console.log('传递进来的参数'+params.time+''+params.id)
  var seeSql=$sql.course.lineSeeNum;
  conn.query(seeSql,[params.time,params.id],function(err,result){
    console.log(err)
    var seeData=JSON.parse(JSON.stringify(result));
    console.log(seeData)
    var favSql=$sql.course.lineFavNum;

    conn.query(favSql,[params.time,params.id],function(err,result1){
      var favData=JSON.parse(JSON.stringify(result1))
      //console.log(favData)
      return res.send({
        msg:'success',
        seeResult:seeData,
        favResult:favData
      })
    })
   
  })
})
module.exports = router;

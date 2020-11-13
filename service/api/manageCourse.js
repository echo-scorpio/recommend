var models = require('../db');
var express = require('express');
const jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');

//上传文件
var app=express()
var multer=require('multer')
var fs=require('fs')
var path=require('path')

//router.use(multer)
//

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
//查询课程类型总共的记录条数 

router.post('/queryTotalType',(req,res)=>{
  var sql=$sql.manageCourse.totalType;
  var params=req.body;
  conn.query(sql,[params.start,params.num],function(err,result){
   // console.log(err)
    var data=JSON.parse(JSON.stringify(result))
   // console.log(sql+"---"+params.start+"---"+params.num)
    if(data.length==0){
      return res.send({
        status:1,
        msg:'error'
      })
    }
    else{
      return res.send({
        status:1,
        msg:'success',
        list:data
      })
    }
  })
})

//为下拉菜单展示课程类型selType
router.post('/selType',(req,res)=>{
  var sql=$sql.course.totalCourseType;
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

router.post('/showType',(req,res)=>{
  var totalSql=$sql.manageCourse.totalType;
  conn.query(totalSql,[],function(err,result){
    var total=JSON.parse(JSON.stringify(result))
    if(total.length!=0){
      var sql=$sql.manageCourse.queryCType;
      var params=req.body;
      conn.query(sql,[params.start,params.num],function(err,result){
      //  console.log(err)
        var data=JSON.parse(JSON.stringify(result))
        //console.log(sql+"---"+params.start+"---"+params.num)
        if(data.length==0){
          return res.send({
            status:1,
            msg:'error'
          })
        }
        else{
          return res.send({
            status:1,
            msg:'success',
            list:data,
            totalNum:total
          })
        }
      })
    }
    else{
      //没有类型记录
    }
  })

})

/**展示课程各项信息 */
router.post('/show',(req,res)=>{
  var cNums=$sql.manageCourse.totalCourses;
  conn.query(cNums,[],function(err,result){
    //console.log(err)
    var totalCourseNum=JSON.parse(JSON.stringify(result))
    if(totalCourseNum.length!=0){
      var sql = $sql.manageCourse.show;
      var params = req.body;
      //console.log(params);
      conn.query(sql, [params.start,params.num], function (err, result) {
       // console.log(err)
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
            list:data,
            total:totalCourseNum


          })
        }
      })
    }
    else{
      //无课程记录
    }
  })
 
 
})

var uploadImageFolder = './upload/images/';//src\assets\upload\images
var uploadVideoFolder='./upload/videos'
/*var createFolder = function(folder){
  try{
      fs.accessSync(folder); 
  }catch(e){
      fs.mkdirSync(folder);
  }  
};*/

//createFolder(uploadFolder);

// 通过 filename 属性定制
var storageImg = multer.diskStorage({
  
    destination: function (req, file, cb) {
        cb(null, uploadImageFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));  
    }
});

var storageVideo=multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadVideoFolder);    // 保存的路径，备注：需要自己创建
},
filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));  
}
})

// 通过 storage 选项来对 上传行为 进行定制化
var uploadImage = multer({ storage: storageImg })
var uploadVideo=multer({storage:storageVideo})

//上传课程封面
router.post('/addImg', uploadImage.single('cover'), function(req, res){
  var file=req.file;
  res.send({
    ret_code: '0',
    data:file['path']
  });
});
//上传视频
router.post('/addVideo', uploadVideo.single('video'), function(req, res){
  var file=req.file;
  res.send({
    ret_code: '0',
    msg:'上传成功',
    data:file['path']
  });
});

/**添加课程 */
router.post('/addCourse',(req,res)=>{
  var sql=$sql.manageCourse.addCourse;
  var params=req.body;
  conn.query(sql,[params.name,params.imgUrl,params.videoUrl],function(err,result){
    var data=JSON.parse(JSON.stringify(result))
    //console.log(err)
    if(data.affectedRows==1){//affectedRows
        var detailsSql=$sql.manageCourse.addCourseDetails;//插入课程详细信息
        conn.query(detailsSql,[params.intro,params.type,params.prepare,params.steps,params.errors,params.suggests,params.videoTime],function(err,result){
         // console.log(err)
          var detailResult=JSON.parse(JSON.stringify(result))
          if(detailResult.affectedRows==1){
            var addRecordSql=$sql.manageCourse.addFavSeeRecord;//t_course_favseetimes表中插入记录
            conn.query(addRecordSql,[],function(err,result){
              var addRecordResult=JSON.parse(JSON.stringify(result));
              if(addRecordResult.affectedRows==1){
              return  res.send({
              status:1,
              msg:"success"
               })
              }
            })
           
          }
        })
    }
  })
})

router.post('/delCourse',(req,res)=>{
  var sql=$sql.manageCourse.delCourse;
  var params=req.body;
  conn.query(sql,[params.id],function(err,result){//删除课程记录
    var delCResult=JSON.parse(JSON.stringify(result))
    if(delCResult.affectedRows==1){
      var sql1=$sql.manageCourse.delCourseDetail;
      conn.query(sql1,[params.id],function(err,result){//删除课程详细记录
        var delDetailResult=JSON.parse(JSON.stringify(result))
        if(delDetailResult.affectedRows==1){
          var sql2=$sql.manageCourse.delFavSee;
          conn.query(sql2,[params.id],function(err,result){//删除课程收藏观看的记录
            var favSeeResult=JSON.parse(JSON.stringify(result))
            if(favSeeResult.affectedRows==1){
              return res.send({
                status:1,
                msg:'success'
              })
            }
          })
         
        }
      })
    }
  })

})

router.post('/editCourse',(req,res)=>{
  var sql=$sql.manageCourse.editCourse;
  var params=req.body;
  conn.query(sql,[params.name,params.imgUrl,params.videoUrl,params.id],function(err,result){
    var data=JSON.parse(JSON.stringify(result))
      if(data.affectedRows==1){
          var detailSql=$sql.manageCourse.editCourseDetail;
          conn.query(detailSql,[params.intro,params.type,params.prepare,params.steps,params.errors,params.suggests,params.id],function(err,result){
            var detailData=JSON.parse(JSON.stringify(result))
            if(detailData.affectedRows==1){
              return res.send({
                status:1,
                msg:'success'
              })
            }
          })
      }
    
  })
})
//query type whether exists
router.post('/queryTypeStatus',(req,res)=>{
  var params=req.body;
  var query=$sql.manageCourse.queryTypeStatus;
  conn.query(query,[params.type],function(err,result){
    var qResult=JSON.parse(JSON.stringify(result))
    if(qResult.length==1){
      return res.send({
        status:1,
        msg:'exists'
      })
    }
    else{
      return res.send({
        status:1,
        msg:'no'
      })
    }
})

//添加课程类型
router.post('/addCourseType',(req,res)=>{
  var params=req.body;
      var sql=$sql.manageCourse.addType;
  
      conn.query(sql,[params.type],function(err,result){
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

})


  //edit course type
  router.post('/editCourseType',(req,res)=>{
    var params=req.body;
    var sql=$sql.manageCourse.editType;
        conn.query(sql,[params.type,params.id],function(err,result){
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

  //delete the course type
  router.post('/delType',(req,res)=>{
    var params=req.body;
    var sql=$sql.manageCourse.delType;
        conn.query(sql,[params.id],function(err,result){
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
module.exports=router;
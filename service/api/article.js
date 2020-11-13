var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 查询文章列表
router.post('/list', (req, res) => {
  var sql = $sql.article.query;
  var params = req.body;
  console.log(params);
  conn.query(sql, [], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    
    return res.send({
      status: 1,
      msg: "查询成功",
      list: data
    })
  })
});

router.post('/getInfoById', (req, res) => {
  var sql = $sql.article.queryById;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "查询成功",
      data: data
    })
  })
});

router.post('/createArticle', (req, res) => {
  var sql = $sql.article.create;
  var params = req.body;
  console.log(req);
  conn.query(sql, [params.title, params.content, params.keyword, params.type_id, params.type_name], function (err, result) {
    return res.send({
      status: 1,
      msg: "新增成功"
    })
  })
});

// 删除
router.post('/deleteArticle', (req, res) => {
  var sql = $sql.article.delete;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.id], function (err, result) {
    var data = result;
    console.log(result)
    return res.send({
      status: 1,
      msg: "删除成功",
      data: data
    })
  })
});

// 修改
router.post('/updateArticle', (req, res) => {
  var sql = $sql.article.update;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.title, req.body.content, req.body.keyword, req.body.id], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "修改成功",
      data: data
    })
  })
});

// 文章类型list 查询
router.post('/getArticleTypeList', (req, res) => {
  var sql = $sql.article.queryArticleType;
  var params = req.body;
  console.log(params);
  conn.query(sql, [], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    
    return res.send({
      status: 1,
      msg: "查询成功",
      list: data
    })
  })
});

// 根据类型id 查类型名称
router.post('/getArticleTypeById', (req, res) => {
  var sql = $sql.article.queryArticleTypeById;
  var params = req.body;
  // console.log(params);
  conn.query(sql, [params.typeId], function (err, result) {
    var data = JSON.parse(JSON.stringify(result))
    
    return res.send({
      status: 1,
      msg: "查询成功",
      list: data
    })
  })
});

// 新增文章类型
router.post('/createArticleType', (req, res) => {
  var sql = $sql.article.createArticleType;
  // var params = req.body;
  console.log(req);
  conn.query(sql, [req.body.typeId, req.body.typeName, req.body.createDate, req.body.articleType], function (err, result) {
    var data = req.body;
    console.log(result)
    return res.send({
      status: 1,
      msg: "新增成功",
      data: data
    })
  })
});
module.exports = router;

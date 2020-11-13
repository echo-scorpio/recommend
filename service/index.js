// node 后端服务器
const courseApi = require('./api/course');
const userApi = require('./api/user');
const manageCourseApi=require('./api/manageCourse')
const recommendApi=require('./api/recommend')
const manageUserApi=require('./api/manageUser')

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// 后端api路由
app.use('/api/user', userApi);
app.use('/api/course', courseApi);
app.use('/api/manageCourse',manageCourseApi)
app.use('/api/recommend',recommendApi)
app.use('/api/manageUser',manageUserApi)

// 监听端口
app.listen(3004);
console.log('success listen at port:3004......');
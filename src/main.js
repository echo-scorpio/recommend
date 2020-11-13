// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Toast } from 'vux'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import adminIndex from './components/admin/adminIndex'
import manageCourse from './components/admin/manageCourse'
import HelloWorld from './components/HelloWorld'
import VideoTest  from './components/VideoTest'
import Course from './components/Course'
import Video from 'video.js'
import login from './components/login'
import adminLogin from './components/admin'
import logon from './components/logon'
import user from './components/user'
import myFav from './components/myFav'
import myInfo from './components/myInfo'
import seeHistory from './components/seeHistory'
import totalCourse from './components/CourseTabItems/totalCourses'
import 'video.js/dist/video-js.css'
import VueVideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import seeChart from './components/admin/seeChart'
import favChart from './components/admin/favChart'
import detailLineChart from './components/admin/detailLineChart'
//import $ from 'jquery'
Vue.prototype.$video = Video
//import routes from './router/index.js'
Vue.use(VueRouter)
Vue.use(VueVideoPlayer)
Vue.use(ElementUI)

Vue.component('toast', Toast)

const routes = [{
  path: '/',
  component: login
},
{
  path:'/admin',
  component:adminLogin
},
{
  path:'/logon',
  component:logon
},
{
  path:'/user',
  component:user
},
{
  path:'/myFav',
  component:myFav
},
{
path:'/seeHistory',
component:seeHistory
},
{
path:'/myInfo',
component:myInfo
},
{
  path:'/Home',
  component:Home
},
{
  path:'/adminIndex',
  component:adminIndex

},
{
  path:'/manageCourse',
  component:manageCourse
},

{
  path:'/HelloWorld',
  component:HelloWorld
}
,{
  path:'/VideoTest',
  component:VideoTest
}
,{
  path:'/Course',
  component:Course
},
{
  path:'/totalCourse',
  component:totalCourse
},
{
  path:'/seeChart',
  component:seeChart
},
{
  path:'/favChart',
  component:favChart
},
{
  path:'/detailLineChart',
  component:detailLineChart
}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

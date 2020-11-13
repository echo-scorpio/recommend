<template>
  <div>
    
    <tabbar style="background-color: #ffffff;">
      <tabbar-item   link="/home">
        <img slot="icon" src="../assets/demo/home.png">
        <span slot="label">首页</span>
      </tabbar-item >
      <tabbar-item  link="/course">
        <img slot="icon" src="../assets/demo/course.png">
        <span slot="label">课程</span>
      </tabbar-item>
      <tabbar-item badge="2"  link="/user">
        <img slot="icon" src="../assets/demo/me.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
.weui-tabbar {
  position: fixed !important;
}
body{
  background-color: #FFFFFF
}
</style>
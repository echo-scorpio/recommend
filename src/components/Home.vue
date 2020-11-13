<template>
  <div>
    <front-slide></front-slide><!--轮播图 -->
    
    <front-list></front-list>
    <app-footer></app-footer>
  </div>
</template>

<style>
body{
  background-color: #FFFFFF
}
</style>

<script>
import AppFooter from './Footer'
import FrontSlide from './Front-slide'

import FrontList from './FrontList'
import {getUserName} from '@/utils/auth'
export default { //组件引用顺序要与template中声明顺序一样，否则无法显示出组件内容
  components: {
    FrontSlide,
        FrontList,
        AppFooter
  },
  mounted(){
    if(!getUserName()){
      this.$router.push('/')
    }
  }
}
</script>
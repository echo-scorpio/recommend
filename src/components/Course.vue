<template>
  <div class="totalCourseBox">
    <tab>

      <tab-item class="vux-center" selected @on-item-click="onItemClick('tab1')">全部课程</tab-item>
      <tab-item class="vux-center" @on-item-click="onItemClick('tab3')">热门课程</tab-item>
      <tab-item class="vux-center" @on-item-click="onItemClick('tab2')">为您推荐</tab-item>

    
    </tab>
    
       <div :is="tab" keep-alive ></div> <!--跳转模块 -->
     
      <div class="weui-tabbar tab-bottom" :is="footer"></div> <!--底部导航栏-->
 
  </div>
  
</template>


<script>
import { Tab, TabItem} from 'vux'
import tab1 from './CourseTabItems/totalCourses'
import tab2 from './CourseTabItems/recomendCourses'
import tab3 from './CourseTabItems/popularCourses'
import AppFooter from './Footer'
import {getUserName} from '@/utils/auth'
export default {
  components: {
    Tab,
    TabItem,
    tab1,
    tab2,
    tab3,
    AppFooter
    
  },
  mounted(){
    if(!getUserName()){
      this.$router.push('/')
    }
  },

    data () {
      return {
        tab:'tab1',
        footer:'AppFooter'
      
      }
    },
  methods: {
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.index01 = index
      }, 1000)
    },
    onItemClick(index){
      this.tab=index;
    },
    getItem(index){
        this.iscur = index
        this.$emit('getIndex', index)
        console.log('on item click',index)
      },
 
  }
}
</script>

<style lang="less" scoped>
.totalCourseBox{
  width: 100%;
  height: 100%;
}
.weui-tabbar{
  position: fixed !important;
}
.box {
  padding: 15px;
}

.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}

.tab-swiper {
  background-color: #fff;
  height: 100px;
}
.ttt{
  clear: both;
}
</style>
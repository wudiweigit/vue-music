

<template>
  <div id="app">


    <m-header></m-header>


    <tab></tab>
<!-- [2-1.20] 当在推荐/歌手/排行/搜索页面进行切换时都会去发送一次请求且每次请求都会去渲染DOM并重新去触发生命周期的相关函数，使用keepalive来将它们的DOM缓存到内存中-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
    
  </div>
</template>

<script>

import MHeader from 'components/m-header/m-header' 

import Tab from 'components/tab/tab'
 
export default {
  components: {
    MHeader,
    Tab
  }


}
</script>

<!-- <style scoped lang="stylus" rel="stylesheet/stylus">
/*  [  2-1.0 引入通用样式   ] */
@import "~common/stylus/variable";
#app
   color: $color-theme   /*  [  2-1.0 使用通用样式变量   ] */
</style> -->

<!-- <template>
  <div id="app">
    hello world
  </div>
</template> -->

<template>
  <div id="app">

    <!-- [  2-1.2 ] -->
    <m-header></m-header>

    <!-- [  2-1.4 ]  -->
    <tab></tab>
    <!-- [  2-1.3 ]  -->
    <router-view></router-view>
    
  </div>
</template>

<script>
//[  2-1.2  配置别名]
import MHeader from 'components/m-header/m-header' 
// [  2-1.4 ]
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

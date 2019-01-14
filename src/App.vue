

<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>


    <player></player> 
     
    
  </div>
</template>

<script>

import MHeader from 'components/m-header/m-header' 

import Tab from 'components/tab/tab'
import Player from 'components/player/player'
 
export default {
  components: {
    MHeader,
    Tab,
    Player,
  }


}
</script>

<!-- <style scoped lang="stylus" rel="stylesheet/stylus">
/*  [  2-1.0 引入通用样式   ] */
@import "~common/stylus/variable";
#app
   color: $color-theme   /*  [  2-1.0 使用通用样式变量   ] */
</style> -->

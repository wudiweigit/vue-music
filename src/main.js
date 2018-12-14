
import 'babel-polyfill'//[  2-1.1 【补丁】 对es6中promise等API的转义] 一定要写在最前面

import Vue from 'vue'
import App from './App'
import router from './router'   //[  2-1.3 ] 

Vue.config.productionTip = false



import 'common/stylus/index.styl'    // [  2-1.0 使用通用样式 ] 
import fastclick from 'fastclick'//[  2-1.1 解决移动端点击延迟300ms的问题] 
fastclick.attach(document.body)//[  2-1.1 fastclick在body中使用] 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,   //[  2-1.3 ] 
  render: h => h(App)
})

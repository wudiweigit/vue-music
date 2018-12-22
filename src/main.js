
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'  

Vue.config.productionTip = false



import 'common/stylus/index.styl'   
import fastclick from 'fastclick'
fastclick.attach(document.body)

// [  2-1.27  ]
import VueLazyLoad from 'vue-lazyload'  //引入插件
Vue.use(VueLazyLoad, {//使用插件
  loading: require('common/image/default.png')  //引入加载时默认图片
})

new Vue({
  el: '#app',
  router,   
  render: h => h(App)
})

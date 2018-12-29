
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router' 

import store from './store'  //[  3-2  ] store初始化

Vue.config.productionTip = false



import 'common/stylus/index.styl'   
import fastclick from 'fastclick'
fastclick.attach(document.body)


import VueLazyLoad from 'vue-lazyload' 
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')  
})

new Vue({
  el: '#app',
  router,  
  store, //[  3-2  ] store初始化 
  render: h => h(App)
})


import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'  

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
  render: h => h(App)
})

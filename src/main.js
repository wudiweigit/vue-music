
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'  

Vue.config.productionTip = false



import 'common/stylus/index.styl'   
import fastclick from 'fastclick'
fastclick.attach(document.body)


new Vue({
  el: '#app',
  router,   
  render: h => h(App)
})

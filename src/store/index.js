// 入口


//[  3-2  ] store初始化
import Vue from 'vue' 
import Vuex from 'vuex'  //先安装vuex在引入
import * as actions from './actions'  
import * as getters from './getters'  
import state from './state'   
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'   //一个插件


Vue.use(Vuex) //注册插件

const debug = process.env.NODE_ENV !== 'production'// vuex 有一个调试工具(在开发环境使用)
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,  //严格模式
    plugins: debug ? [createLogger()] : []
})
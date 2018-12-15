import Vue from 'vue'
// [  2-1.3]
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

Vue.use(Router)// [  2-1.3]

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend' //默认页面重定向到recommend路由中

    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})

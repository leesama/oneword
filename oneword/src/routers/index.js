import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@views/home/home')
    },
    {
      path: '/crosstime',
      component: () => import('@views/crosstime/crosstime')
    },
    {
      path: '/message',
      component: () => import('@views/message/message')
    }
  ]
})

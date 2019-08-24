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
      name: 'home',
      component: () => import('@views/home/home')
    },
    {
      path: '/crosstime',
      name: 'crosstime',
      component: () => import('@views/crosstime/crosstime')
    },
    {
      path: '/message',
      component: () => import('@views/message/message')
    },
    {
      path: '/crosstimeDetail',
      component: () => import('@views/message/message')
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

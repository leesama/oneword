import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/home/home.vue'
import Message from '@views/home/message.vue'
import ChooseCrosstime from '@views/crosstime/choose-crosstime.vue'
import Crosstime from '@views/crosstime/crosstime.vue'
import HotComment from '@views/comment/hot-comment.vue'
import Comment from '@views/comment/comment.vue'
import Explore from '@views/explore/explore.vue'
import ExploreType from '@views/explore/explore-type.vue'
import Root from '@views/home/root.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Root,
      children: [{
        path: 'home',
        name: 'home',
        component: Home,
        meta: { index: 1 }
      }, {
        path: 'message',
        name: 'message',
        component: Message,
        meta: { index: 1 }
      },
      {
        path: 'explore',
        redirect: '/explore/all',
        name: 'explore',
        component: Explore,
        children: [ {
          path: '/explore/:type',
          name: 'explore-type',
          component: ExploreType,
          meta: { index: 1 },
          // 只有特定的书
          beforeEnter(to, from, next) {
            const pathSuffix = ['all', 'origin', 'taobao']
            pathSuffix.includes(to.params.type) ? next() : next('/')
          }
        }]
      }]
    },
    {
      path: '/choose-crosstime',
      name: 'choose-crosstime',
      component: ChooseCrosstime,
      meta: { index: 2 }
    },
    {
      path: '/crosstime',
      name: 'crosstime',
      component: Crosstime,
      meta: { index: 3 }
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta: { index: 2 }
    },
    {
      path: '/hot-comment',
      name: 'hot-comment',
      component: HotComment,
      meta: { index: 3 }
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

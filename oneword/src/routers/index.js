import Vue from 'vue'
import cookies from 'vue-cookies'
import Router from 'vue-router'
import store from '../store/index'
import { getUserinfoAndBooklist } from '@models'
import Home from '@views/home/home.vue'
import ChooseCrosstime from '@views/crosstime/choose-crosstime.vue'
import Crosstime from '@views/crosstime/crosstime.vue'
import HotComment from '@views/comment/hot-comment.vue'
import Comment from '@views/comment/comment.vue'
import Explore from '@views/explore/explore.vue'
import All from '@views/explore/all.vue'
import Origin from '@views/explore/origin.vue'
import Word from '@views/explore/word.vue'
import Poem from '@views/explore/poem.vue'
import Movie from '@views/explore/movie.vue'
import Quotation from '@views/explore/quotation.vue'
import Lyric from '@views/explore/lyric.vue'
import Message from '@views/home/message.vue'
import Login from '@views/register-login/register-login.vue'
import Mine from '@views/home/mine.vue'
import Root from '@views/home/root.vue'
import newCard from '@views/newcard/newcard.vue'
import NotFound from '@views/404/404.vue'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { index: 1 }
    },
    {
      path: '/',
      redirect: '/home',
      component: Root,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: { index: 1 }
        },
        {
          path: 'explore',
          redirect: '/explore/all',
          name: 'explore',
          component: Explore,
          children: [
            {
              path: '/explore/all',
              name: 'all',
              component: All,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/origin',
              name: 'origin',
              component: Origin,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/word',
              name: 'word',
              component: Word,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/poem',
              name: 'poem',
              component: Poem,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/movie',
              name: 'movie',
              component: Movie,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/quotation',
              name: 'quotation',
              component: Quotation,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            },
            {
              path: '/explore/lyric',
              name: 'lyric',
              component: Lyric,
              meta: { index: 1 }
              // 只有特定的参数才会跳转到该页面
            }
          ]
        },
        {
          path: 'message',
          name: 'message',
          component: Message,
          meta: { index: 1 }
        },
        {
          path: 'mine',
          name: 'mine',
          component: Mine,
          meta: { index: 1 }
        }
      ]
    },
    {
      path: '/new-word',
      name: 'new-word',
      component: newCard,
      meta: { index: 1 }
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
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
// 添加路由守卫
router.beforeEach(async(to, from, next) => {
  const publicPath = ['/login']
  const isLogin = cookies.get('oneword')
  const isPublic = publicPath.includes(to.path)
  // 公共路径外的路径鉴权
  if (!isPublic && !isLogin) {
    next('/login')
  }
  // 公共路径外的路径在登录状态下需要请求用户信息并存到vuex
  if (!isPublic && isLogin && !store.state.common.userInfoAndBookList) {
    const data = await getUserinfoAndBooklist()
    store.commit('SET_USERINFO_AND_BOOKLIST', data)
  }
  next()
})

export default router

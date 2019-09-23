import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import anime from 'animejs'
// 发布的时候记得打开registerServiceWorker
// import './registerServiceWorker'
import './common/css/border.css'
import './common/css/normalize.css'
import './common/fonts/iconfont.css'
import VueLazyload from 'vue-lazyload'
// 用于输入框高度自适应
import TextareaAutosize from 'vue-textarea-autosize'
// 自定义的message 提示消息插件
import toastMessage from '@/plugins/toast'
// 需开启observer,Intersection Observer API提供了一种异步观察目标元素与祖先元素或顶级文档viewport的交集中的变化的方法。
Vue.use(VueLazyload, {
  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
Vue.use(toastMessage)
Vue.use(TextareaAutosize)

Vue.prototype.$anime = anime
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

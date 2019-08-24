import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import ErrorPlugin from './common/js/errorPlugin'
import anime from 'animejs'
// 发布的时候记得打开registerServiceWorker
// import './registerServiceWorker'
import './common/css/border.css'
import './common/css/normalize.css'
import './common/fonts/iconfont.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(ErrorPlugin)
Vue.prototype.$anime = anime
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

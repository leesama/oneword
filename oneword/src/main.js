import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import ErrorPlugin from './util/errorPlugin'
import anime from 'animejs'
// import './registerServiceWorker'
import './assets/iconfont.css'
import './assets/normalize.css'
import './assets/border.css'

Vue.use(ErrorPlugin)
Vue.prototype.$anime = anime
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

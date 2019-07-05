import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import { get } from './util/http'
import ErrorPlugin from './util/errorPlugin'
import './registerServiceWorker'

Vue.use(ErrorPlugin)
Vue.prototype.$axios = get
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

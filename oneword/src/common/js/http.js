import axios from 'axios'
import Vue from 'vue'
import router from '../../routers'
import store from '@store'
const vueToast = new Vue()
const urlMap = {
  development: 'http://192.168.1.2:8080/',
  production: '/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const needShowMaskRequest = [
  '/yiyan/updateuserinfo',
  '/yiyan/newbook',
  '/yiyan/newcard',
  '/yiyan/newcomment'
]

// 请求拦截
axios.interceptors.request.use(
  config => {
    // post请求显示loading遮罩
    for (const i of needShowMaskRequest) {
      if (config.url.includes(i)) {
        store.commit('SET_LOADING_MASK_VISIBLE', true)
        return config
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截  401 token过期处理
axios.interceptors.response.use(
  response => {
    // 关闭遮罩
    if (store.getters.loadingMaskVisible) {
      store.commit('SET_LOADING_MASK_VISIBLE', false)
    }
    return response
  },
  error => {
    const { status } = error.response
    if (status === 401) {
      vueToast.$toastMessage('登录失效，请重新登录')
      // 页面跳转
      router.push('/login')
    }

    return Promise.reject(error)
  }
)
function get(url) {
  return function(params = {}) {
    return axios
      .get(`${baseUrl}${url}`, params, { timeout: 3000 })
      .then(res => {
        const { status, data } = res
        if (status === 200) {
          return data
        }
      })
      .catch(e => {
        if (e.response.status !== 401) {
          vueToast.$toastMessage('Sorry,请重试:(')
        }
      })
  }
}

function post(url) {
  return function(params = {}) {
    return axios
      .post(`${baseUrl}${url}`, params, { timeout: 3000 })
      .then(res => {
        const { status, data } = res
        if (status === 200) {
          return data
        }
      })
      .catch(e => {
        if (e.response.status !== 401) {
          vueToast.$toastMessage('Sorry,请重试:(')
        }
      })
  }
}

export { get, post }

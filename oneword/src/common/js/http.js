import axios from 'axios'
import store from '@store'
const urlMap = {
  development: 'http://192.168.1.5:8080',
  production: '/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
/**
 * 全局异常处理，请求失败修改errorloadin状态值，每次请求之前也修改为隐藏状态值，确保用户请求时错误状态是隐藏的
 *
 */
function get (url) {
  return function (params = {}) {
    store.dispatch('setErrorVisible', false)
    return axios
      .get(`${baseUrl}${url}`, { params, timeout: 3000 })
      .then(res => {
        const { status, data } = res
        if (status === 200) {
          return data
        }
      })
      .catch(e => {
        store.dispatch('setErrorVisible', true)
        setTimeout(() => {
          store.dispatch('setErrorVisible', false)
        }, 2000)
      })
  }
}

export { get }

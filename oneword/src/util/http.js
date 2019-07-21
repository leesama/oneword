import axios from 'axios'

const urlMap = {
  development: 'http://localhost:8080',
  production: '/'
}
const baseUrl = urlMap[process.env.NODE_ENV]

function get (url) {
  return function (params = {}) {
    return axios
      .get(`${baseUrl}${url}`, { params })
      .then(res => {
        const {
          status,
          data: { data }
        } = res
        if (status === 200) {
          return data
        }
      })
      .catch(e => {
        // console.log(e)
        // 之后设置errorloding
      })
  }
}

export { get }

/*
 * @Author: leecho
 * @since: 2019-08-08 11:22:59
 * @lastTime: 2019-08-11 13:34:46
 * @LastAuthor: leecho
 * @message:存储通用数据
 */

import types from '../mutation-types'
const common = {
  state: { isShowHttpError: false },
  mutations: {
    [types.SHOW_HTTP_ERROR] (state) {
      state.isShowHttpError = true
    },
    [types.NOT_SHOW_HTTP_ERROR] (state) {
      state.isShowHttpError = false
    }
  }
}
export default common

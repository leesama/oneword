/*
 * @Author: leecho
 * @since: 2019-08-08 11:22:59
 * @lastTime: 2019-08-14 23:49:57
 * @LastAuthor: leecho
 * @message:存储通用数据
 */

import * as types from '../mutation-types'
const common = {
  state: { errorLoadingVisible: false },
  mutations: {
    [types.SET_ERROR_VISIBLE] (state, visible) {
      state.errorLoadingVisible = visible
    }
  }
}
export default common

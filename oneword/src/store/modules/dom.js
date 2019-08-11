/*
 * @Author: leecho
 * @since: 2019-08-10 23:24:56
 * @lastTime: 2019-08-11 22:26:25
 * @LastAuthor: leecho
 * @message: 存储与dom节点有关的数据
 */
import types from '../mutation-types'
const dom = {
  state: { cardWidth: 0, vw: 0 },
  mutations: {
    [types.SET_CARD_WIDTH] (state, width) {
      state.cardWidth = width
    },
    [types.SET_VW] (state, vw) {
      state.vw = vw
    }
  }
}

export default dom

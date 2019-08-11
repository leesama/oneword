import types from './mutation-types.js'
const actions = {
  showHttpError ({ commit }) {
    commit(types.SHOW_HTTP_ERROR)
  },
  notShowHttpError ({ commit }) {
    commit(types.NOT_SHOW_HTTP_ERROR)
  },
  setCardWidth ({ commit }, cardWidth) {
    commit(types.SET_CARD_WIDTH, cardWidth)
  },
  setVW ({ commit }, vw) {
    commit(types.SET_VW, vw)
  }
}

export default actions

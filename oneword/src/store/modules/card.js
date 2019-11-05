import * as types from '../mutation-types'
const card = {
  state: {
    homeCardInfo: [],
    crosstimeCardInfo: [],
    hotCardInfo: [],
    allCardInfo: [],
    originCardInfo: [],
    wordCardInfo: [],
    poemCardInfo: [],
    movieCardInfo: [],
    quotationCardInfo: [],
    lyricCardInfo: []
  },
  mutations: {
    /**
     * @description: 设置不同类型store的信息
     * @param {type}  type:要设置的store ,info：cardinfo
     * @return:
     */
    [types.SET_CARDS_INFO](state, { type, info }) {
      state[`${type}CardInfo`] = info
    },
    [types.ADD_CARD_REPLYCNT](state, { type, cardId, num }) {
      for (const i of state[`${type}CardInfo`]) {
        if (i.textcardid === cardId) {
          i.replycnt = i.replycnt + num
        }
      }
    },
    [types.ADD_CARD_COMMENTCNT](state, { type, cardId, num }) {
      for (const i of state[`${type}CardInfo`]) {
        if (i.textcardid === cardId) {
          i.commentcnt = i.commentcnt + num
        }
      }
    },
    [types.RESET_CARD_STATE](state) {
      Object.assign(state, JSON.parse(localStorage.getItem('initState')).card)
    }
  }
}
export default card

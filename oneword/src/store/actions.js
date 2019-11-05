import * as types from './mutation-types.js'
const actions = {
  setMusicState({ commit }, { musicSrc, imgSrc, musicInfo }) {
    commit(types.SET_MUSIC_SRC, musicSrc)
    commit(types.SET_IMG_SRC, imgSrc)
    commit(types.SET_MUSIC_INFO, musicInfo)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_DURATION, '0:00')
  },
  addCardReplyAndCommentCnt({ commit }, { type, cardId, num }) {
    commit(types.ADD_CARD_COMMENTCNT, { type, cardId, num })
    commit(types.ADD_CARD_REPLYCNT, { type, cardId, num })
  },
  resetState({ commit }) {
    commit(types.RESET_CARD_STATE)
    commit(types.RESET_COMMON_STATE)
    commit(types.RESET_MUSIC_STATE)
  }
}

export default actions

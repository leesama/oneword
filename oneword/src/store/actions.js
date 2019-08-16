import * as types from './mutation-types.js'
const actions = {
  setErrorVisible ({ commit }, visible) {
    commit(types.SET_ERROR_VISIBLE, visible)
  },
  setMusicState ({ commit }, { musicSrc, imgSrc }) {
    commit(types.SET_MUSIC_SRC, musicSrc)
    commit(types.SET_IMG_SRC, imgSrc)
    commit(types.SET_PLAYING_STATE, true)
  }
}

export default actions

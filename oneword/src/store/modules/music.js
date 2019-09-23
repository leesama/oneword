import * as types from '../mutation-types'
const music = {
  state: {
    musicSrc: '',
    imgSrc: '',
    playing: false,
    duration: '',
    currentTime: '0:00',
    progress: 0,
    musicInfo: {}
  },
  mutations: {
    [types.SET_MUSIC_SRC](state, musicSrc) {
      state.musicSrc = musicSrc
    },
    [types.SET_IMG_SRC](state, imgSrc) {
      state.imgSrc = imgSrc
    },
    [types.SET_PLAYING_STATE](state, playing) {
      state.playing = playing
    },
    [types.SET_PROGRESS](state, progress) {
      state.progress = progress
    },
    [types.SET_DURATION](state, duration) {
      state.duration = duration
    },
    [types.SET_CURRENTTIME](state, currentTime) {
      state.currentTime = currentTime
    },
    [types.SET_MUSIC_INFO](state, musicInfo) {
      state.musicInfo = musicInfo
    }
  }
}

export default music

/*
 * @Author: leecho
 * @since: 2019-08-10 23:24:56
 * @lastTime: 2019-08-16 22:39:40
 * @LastAuthor: leecho
 * @message: 存储与music组件有关的数据
 */
import * as types from '../mutation-types'
const music = {
  state: {
    musicSrc: '',
    imgSrc: '',
    playing: false,
    progress: 0
  },
  mutations: {
    [types.SET_MUSIC_SRC] (state, musicSrc) {
      state.musicSrc = musicSrc
    },
    [types.SET_IMG_SRC] (state, imgSrc) {
      state.imgSrc = imgSrc
    },
    [types.SET_PLAYING_STATE] (state, playing) {
      state.playing = playing
    },
    [types.SET_PROGRESS] (state, progress) {
      state.progress = progress
    }
  }
}

export default music

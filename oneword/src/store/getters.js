const getters = {
  errorLoadingVisible: state => state.common.errorLoadingVisible,
  musicSrc: state => state.music.musicSrc,
  imgSrc: state => state.music.imgSrc,
  playing: state => state.music.playing,
  progress: state => state.music.progress
}

export default getters

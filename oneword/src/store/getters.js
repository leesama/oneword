const getters = {
  errorLoadingVisible: state => state.common.errorLoadingVisible,
  musicSrc: state => state.music.musicSrc,
  imgSrc: state => state.music.imgSrc,
  playing: state => state.music.playing,
  progress: state => state.music.progress,
  duration: state => state.music.duration,
  currentTime: state => state.music.currentTime,
  musicInfo: state => state.music.musicInfo
}

export default getters

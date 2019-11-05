const getters = {
  loadingMaskVisible: state => state.common.loadingMaskVisible,
  userInfoAndBookList: state => state.common.userInfoAndBookList,
  musicSrc: state => state.music.musicSrc,
  imgSrc: state => state.music.imgSrc,
  playing: state => state.music.playing,
  progress: state => state.music.progress,
  duration: state => state.music.duration,
  currentTime: state => state.music.currentTime,
  musicInfo: state => state.music.musicInfo,
  homeCardInfo: state => state.card.homeCardInfo,
  crosstimeCardInfo: state => state.card.crosstimeCardInfo,
  hotCardInfo: state => state.card.hotCardInfo,
  allCardInfo: state => state.card.allCardInfo,
  originCardInfo: state => state.card.originCardInfo,
  wordCardInfo: state => state.card.wordCardInfo,
  poemCardInfo: state => state.card.poemCardInfo,
  movieCardInfo: state => state.card.movieCardInfo,
  quotationCardInfo: state => state.card.quotationCardInfo,
  lyricCardInfo: state => state.card.lyricCardInfo,
  getCardInfo: state => (type, cardId) => {
    for (const i of state.card[`${type}CardInfo`]) {
      if (i.textcardid === cardId) {
        return i
      }
    }
  }
}

export default getters

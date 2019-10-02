const cardContentProps = {
  props: {
    content: {
      type: String
    },
    title: {
      type: String
    },
    isCenter: {
      type: Boolean
    },
    hasImg: { type: String },
    from: { type: String },
    isRadius: { type: Boolean }
  }
}
const cardFixedPropsMethods = {
  props: {
    cardInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    cardToClientLeft() {
      return this.$refs.card.getBoundingClientRect().left
    },
    handleTap() {
      this.$emit('cardTap', { textcardid: this.cardInfo.textcardid, width: this.$refs.card.clientWidth, height: this.$refs.card.clientHeight, left: this.$refs.card.getBoundingClientRect().left, top: this.$refs.card.getBoundingClientRect().top })
    },
    handleReplyClick() {
      this.$router.push({ name: 'comment', params: { cardInfo: this.cardInfo } })
    }
  },
  computed: {
    from() {
      return this.cardInfo.from
    },
    title() {
      return this.cardInfo.title
    }
  }
}
const cardFooterComputed = {
  computed: {
    replycnt() {
      return !this.cardInfo.replycnt ? 0 : Number(this.cardInfo.replycnt)
    },
    collectcnt() {
      return !this.cardInfo.collectcnt ? 0 : Number(this.cardInfo.collectcnt)
    },
    // 喜欢的数量等于评论数-回复数
    likecnt() {
      return !this.cardInfo.commentcnt
        ? 0
        : Number(this.cardInfo.commentcnt - this.replycnt)
    }
  }
}

const CardImgComputed = {
  computed: {
    imgSrc() {
      return this.cardInfo.picpath
    }
  }
}

const CardTextComputed = {
  computed: {
    // class相关属性begin

    // 内容是否居中居中
    isCenter() {
      return this.cardInfo.type.substr(10, 1) === '0'
    },
    // 图片是否为圆形
    isRadius() {
      return this.cardInfo.type.substr(4, 1) === '0'
    },
    // 是否竖向排列文字
    contentComponent() {
      return this.cardInfo.type.substr(6, 1) === '0'
        ? 'CardVerticalContent'
        : 'CardHorizontalContent'
    },
    // class相关属性end

    // style相关属性begin
    fontStyle() {
      let fontFamily
      const type = this.cardInfo.type
      const fontPrefix = type.substr(2, 1)
      const fontSuffix = type.substr(8, 1)
      if (fontPrefix === 'v') {
        switch (fontSuffix) {
          case '0':
            fontFamily = 'FZQingKeBenYueSongS-R-GB'
            break
          case '1':
            fontFamily = 'FZSongYi-Z13S'
            break
          default:
            return
        }
      } else {
        switch (fontSuffix) {
          case '0':
            fontFamily = 'FZQingKeBenYueSongS-R-GB'
            break
          case '1':
            fontFamily = 'FZSongYi-Z13S'
            break
          case '2':
            fontFamily = 'FZZhengHeiS-EL-GB'
            break
          case '3':
            fontFamily = 'FZShuSong-Z01S'
            break
          default:
            return
        }
      }
      return { fontFamily }
    },
    // style相关属性end

    type() {
      switch (this.cardInfo.category) {
        case '0':
          return '文字'
        case '1':
          return '语录'
        case '2':
          return '歌词'
        case '3':
          return '电影'
        case '4':
          return '诗'
        default:
          return '文字'
      }
    },
    username() {
      return this.cardInfo.creator.username
    },
    content() {
      return this.cardInfo.content
        .replace(/\n/g, '<br>')
        .replace(/\r/g, '&nbsp;')
    },
    bookname() {
      return this.cardInfo.originbook.bookname
    },
    original() {
      return this.cardInfo.original
    },
    from() {
      return this.cardInfo.from
    },
    title() {
      return this.cardInfo.title
    }
  }
}
const cardDetailPropsComputed = {
  props: {
    cardInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    musicSrc() {
      return this.cardInfo.musicurl
    },
    smallavatar() {
      return this.cardInfo.creator.smallavatar
    },
    dateTime() {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDay() + 1

      const today = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day}`
      return today === this.cardInfo.datetime.slice(0, 10) ? this.cardInfo.datetime.slice(10, 16) : this.cardInfo.datetime.slice(5, 10)
    },
    username() {
      return this.cardInfo.creator.username
    },
    imgSrc() {
      return this.cardInfo.picpath
    },
    title() {
      return this.cardInfo.title
    },
    from() {
      return this.cardInfo.from
    },
    type() {
      switch (this.cardInfo.category) {
        case '0':
          return '文字'
        case '2000':
          return '音乐'
        case '3':
          return '电影'
        case '1000':
          return '诗'
        default:
          return '文字'
      }
    }
  },
  methods: {
    handlebackClick() {
      this.$emit('back')
    }
  }
}

const pageCommon = {
  data() {
    return {
      list: [],
      cardContainerVisible: false,
      cardTapCardData: {},
      cardContainerData: [],
      containerCardIndex: 0
    }
  },
  methods: {
    handleCardTap(i) {
      this.cardTapCardData = i
      this.cardContainerVisible = true
      // 这里需要把bs禁用掉，之后在开启，否则有概率无法移除transform样式
      this.$refs.scroll.disable()
    },
    handleBack(i) {
      this.$refs.scroll.enable()
      this.containerCardIndex = i
      this.cardContainerVisible = false
    }
  }

}

export {
  cardContentProps,
  cardFixedPropsMethods,
  cardFooterComputed,
  CardImgComputed,
  cardDetailPropsComputed,
  CardTextComputed,
  pageCommon
}

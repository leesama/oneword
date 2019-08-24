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
      default () {
        return {}
      }
    }
  },
  computed: {
    from () {
      return this.cardInfo.from
    },
    title () {
      return this.cardInfo.title
    }
  }
}
const cardFooterComputed = {
  computed: {
    replycnt () {
      return !this.cardInfo.replycnt ? 0 : Number(this.cardInfo.replycnt)
    },
    collectcnt () {
      return !this.cardInfo.collectcnt ? 0 : Number(this.cardInfo.collectcnt)
    },
    likecnt () {
      return !this.cardInfo.commentcnt
        ? 0
        : Number(this.cardInfo.commentcnt - this.replycnt)
    }
  }
}

const CardImgComputed = {
  computed: {
    imgSrc () {
      return this.cardInfo.picpath
    }
  }
}
export {
  cardContentProps,
  cardFixedPropsMethods,
  cardFooterComputed,
  CardImgComputed
}

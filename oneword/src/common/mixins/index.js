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
  methods: {
    /**
     * @description: scroll touchend的时候调用此方法，传递滚动信息给scroll组件
     * @param {type}
     * @return:
     */
    cardToClientLeft () {
      return this.$refs.card.getBoundingClientRect().left
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

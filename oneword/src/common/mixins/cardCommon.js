import { newLike, cancelLike } from '@models'
import { mapMutations } from 'vuex'
const cardCommon = {
  data() {
    return {
      liked: false
    }
  },

  props: {
    cardInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    ...mapMutations({ addCardCommentCnt: 'ADD_CARD_COMMENTCNT' }),
    cardToClientLeft() {
      return this.$refs.card.getBoundingClientRect().left
    },
    handleTap() {
      this.$emit('cardTap', {
        textcardid: this.cardInfo.textcardid,
        width: this.$refs.card.clientWidth,
        height: this.$refs.card.clientHeight,
        left: this.$refs.card.getBoundingClientRect().left,
        top: this.$refs.card.getBoundingClientRect().top
      })
    },
    _getStoreOfCard() {
      if (this.$el.className === 'flex-text') {
        return this.$parent.$parent.$parent.$parent.$options.name
      } else {
        return this.$route.name
      }
    },
    handleReplyClick() {
      // 点击回复的时候会携带参数跳转到comment页面,commet通过参数读取vuex数据
      this.$router.push({
        name: 'comment',
        params: {
          cardid: this.cardInfo.textcardid,
          feelingCnt: this.cardInfo.commentcnt,
          from: this._getStoreOfCard()
        }
      })
    },
    async handleLikeClick() {
      // 如果是喜欢状态，请求取消喜欢，请求成功修改喜欢状态，失败不修改
      if (this.liked) {
        const cancellike = await cancelLike({
          cardid: this.cardInfo.textcardid
        })
        if (cancellike.code === 0) {
          this.$toastMessage('已取消同感')
          this.addCardCommentCnt({
            type: this._getStoreOfCard(),
            cardId: this.cardInfo.textcardid,
            num: -1
          })
          this.liked = false
        } else {
          this.$toastMessage('取消同感失败')
        }
      } else {
        const like = await newLike({ cardid: this.cardInfo.textcardid })
        if (like.code === 0) {
          this.$toastMessage('已同感')
          this.addCardCommentCnt({
            type: this._getStoreOfCard(),
            cardId: this.cardInfo.textcardid,
            num: 1
          })
          this.liked = true
        } else {
          this.$toastMessage('同感失败')
        }
      }
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
export { cardCommon }

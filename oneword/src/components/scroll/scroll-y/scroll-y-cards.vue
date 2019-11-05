<template>
  <div class="scroll-y-cards">
    <scroll-y
      ref="scroll"
      class="scroll"
      :pullDown="true"
      :pullUp="true"
      @pullUp="handlePullUp"
      @pullDown="handlePullDown"
    >
      <CardText
        ref="cardText"
        v-for="item in cardList"
        :cardInfo="item"
        :key="item.textcardid"
        @cardTap="handleCardTap"
      />
    </scroll-y>
    <card-container
      @back="handleBack"
      :cardContainerData="cardList"
      :cardTapCardData="cardTapCardData"
      v-if="cardContainerVisible"
    ></card-container>
  </div>
</template>

<script>
import CardContainer from '@components/card-detail/card-detail-container/card-detail-container.vue'
import CardText from '@components/card/card-flex/card-flex-text/card-flex-text'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
const CARDS_REQUEST_LENGTH = 10
export default {
  name: 'scroll-y-cards',
  data() {
    return {
      list: [],
      cardContainerVisible: false,
      cardTapCardData: {},
      containerCardIndex: 0,
      cardList: []
    }
  },
  props: {
    cardListData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleCardTap(i) {
      this.cardTapCardData = i
      this.$refs.scroll.disable()
      this.cardContainerVisible = true
      this.$emit('cardContainerShow')
    },
    handleBack(i) {
      this.$refs.scroll.enable()
      this.$refs.scroll.scrollToElement(this.$refs.cardText[i].$el)
      this.cardContainerVisible = false
      this.$emit('cardContainerClose')
    },
    handlePullUp() {
      this.$emit('pullUp', {
        datetime: this.cardList[this.cardList.length - 1].datetime
      })
    },
    handlePullDown() {
      this.pullDown = true
      this.$emit('pullDown')
    }
  },
  activated() {
    this.$refs.scroll.baseScroll.refresh()
  },
  watch: {
    cardListData(newV, oldV) {
      // this.pullDown标识着这次是刷新或者第一次加载请求来的数据,否则就是下拉
      if (this.pullDown) {
        this.cardList = newV
        this.$refs.scroll.finishPullDown()
        this.pullDown = null
        // 请求到的数据数目小于设定值，关闭下拉，否则打开下拉
        if (newV.length < CARDS_REQUEST_LENGTH) {
          this.$refs.scroll.closePullUp()
        } else {
          this.$refs.scroll.openPullUp()
        }
      } else {
        this.cardList = newV
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
        this.$refs.scroll.finishPullUp()
        // 上滑请求数据条数如果小于3，关闭下拉
        if (newV.length - oldV.length < CARDS_REQUEST_LENGTH) {
          this.$refs.scroll.closePullUp()
        }
      }
    }
  },
  components: { ScrollY, CardText, CardContainer }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.scroll-y-cards
  height 100%
  .scroll
    background-color #f2f2f2
    normalFont()
    & >>> .scroll-content
      padding-top 51px
      padding-bottom 130px
</style>

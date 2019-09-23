<template>
  <div class="explore">
    <scroll-y ref="exploreScroll" class="scroll">
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
      cardClassName=".explore-tab .flex-text"
      scrollContentClassName=".explore-tab .scroll-content"
      :cardContainerData="cardList"
      :cardTapCardData="cardTapCardData"
      v-if="cardContainerVisible"
    ></card-container>
  </div>
</template>

<script>
import CardContainer from '@components/card-detail/card-detail-container/card-detail-container.vue'
import CardText from '@components/card/card-flex/card-flex-text/card-flex-text'
import { getAllTextCard } from '@models/'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
export default {
  name: 'explore-type',
  data() {
    return {
      list: [],
      cardContainerVisible: false,
      cardTapCardData: {},
      containerCardIndex: 0,
      cardList: []
    }
  },
  methods: {
    handleCardTap(i) {
      this.cardTapCardData = i
      this.$refs.exploreScroll.disable()
      this.cardContainerVisible = true
      this.$emit('cardContainerShow')
    },
    handleBack(i) {
      this.$refs.exploreScroll.scrollToElement(this.$refs.cardText[i].$el)
      this.$refs.exploreScroll.enable()
      this.cardContainerVisible = false
      this.$emit('cardContainerClose')
    }
  },
  updated() {
    this.$refs.exploreScroll.refreshAfterAnimation()
  },
  async created() {
    const data = await getAllTextCard()
    this.cardList = this.cardContainerData = data.textcardlist
  },
  components: { ScrollY, CardText, CardContainer }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.explore
  height 100%
  .scroll
    background-color #f2f2f2
    normalFont()
    & >>> .scroll-content
      padding-top 51px
</style>

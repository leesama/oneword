<template>
  <div class="home-container">
    <header>
      <the-header>
        <template #mid>
          <span>订阅</span>
        </template>
        <template #right>
          <router-link tag="i" to="/choose-crosstime" class="iconfont icon-fanhui"></router-link>
        </template>
      </the-header>
    </header>
    <scroll-x
      class="homeScroll scroll"
      ref="scroll"
      :data="list"
      @refresh="loadData"
      @leftSlip="loadLeftSlipData"
      @cardTap="handleCardTap"
      :containerCardIndex="containerCardIndex"
    />
    <card-container
      @back="handleBack"
      cardClassName=".homeScroll .card-container"
      scrollContentClassName=".homeScroll .scroll-content"
      :cardContainerData="cardContainerData"
      :cardTapCardData="cardTapCardData"
      v-if="cardContainerVisible"
    ></card-container>
  </div>
</template>

<script>
import CardContainer from '@components/card-detail/card-detail-container/card-detail-container'
import { formatTo1Level } from '@js/utils.js'
import TheHeader from '@components/detail/the-header/the-header'
import ScrollX from '@components/scroll/scroll-x/scroll-x'
import { getFeeds } from '@models'
import { pageCommon } from '@mixins'

export default {
  name: 'Home',
  mixins: [pageCommon],
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.list = (await getFeeds()).slice(0, 3)
      this.cardContainerData = formatTo1Level(this.list)
      this.day = 3
    },
    async loadLeftSlipData() {
      const nextDay = this.day + 3
      this.list = this.list.concat((await getFeeds()).slice(this.day, nextDay))
      this.cardContainerData = formatTo1Level(this.list)
      this.day = nextDay
    }
  },
  components: { TheHeader, ScrollX, CardContainer }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.home-container
  background linear-gradient(to bottom, #efefef, #dedede)
  box-sizing border-box
  padding-bottom 145px
  filled()
  display flex
  flex-direction column
  header
    height 130px
    .right i
      font-size 100px
</style>

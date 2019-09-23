<template>
  <div class="crosstime-container">
    <header>
      <the-header>
        <template #left>
          <router-link tag="i" class="iconfont" to="/choose-crosstime">&#xe612;</router-link>
        </template>
        <template #mid>
          <span>穿越</span>
        </template>
      </the-header>
    </header>
    <scroll-x
      ref="scroll"
      class="crosstime-scroll"
      :data="list"
      @refresh="loadData"
      @leftSlip="loadLeftSlipData"
      @cardTap="handleCardTap"
      :containerCardIndex="containerCardIndex"
    />
    <card-container
      @back="handleBack"
      cardClassName=".crosstime-scroll .card-container"
      scrollContentClassName=".crosstime-scroll .scroll-content"
      :cardContainerData="cardContainerData"
      :cardTapCardData="cardTapCardData"
      v-if="cardContainerVisible"
    ></card-container>
  </div>
</template>

<script>
import CardContainer from '@components/card-detail/card-detail-container/card-detail-container'
import { formatTo1Level } from '@js/utils.js'
import TheHeader from '@components/detail/the-header/the-header.vue'
import ScrollX from '@components/scroll/scroll-x/scroll-x'
import { getCards } from '@models'
import { pageCommon } from '@mixins'
export default {
  name: 'crosstime',
  mixins: [pageCommon],
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.list = (await getCards()).slice(0, 3)
      this.cardContainerData = formatTo1Level(this.list)
      this.day = 3
    },
    async loadLeftSlipData() {
      const nextDay = this.day + 3
      this.list = this.list.concat((await getCards()).slice(this.day, nextDay))
      this.cardContainerData = formatTo1Level(this.list)
      this.day = nextDay
    }
  },
  components: { TheHeader, ScrollX, CardContainer }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.crosstime-container
  position absolute
  background linear-gradient(to bottom, #f0f0f0, #dddddd)
  filled()
  display flex
  flex-direction column
  header
    height 130px
</style>

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
      :data="homeCardInfo"
      @refresh="loadData"
      @leftSlip="loadLeftSlipData"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import TheHeader from '@components/detail/the-header/the-header'
import ScrollX from '@components/scroll/scroll-x/scroll-x'
import { getFeeds } from '@models'
export default {
  name: 'home',
  created() {
    this.loadData()
  },
  methods: {
    ...mapMutations({ setCardInfo: 'SET_CARDS_INFO' }),
    async loadData() {
      const data = (await getFeeds()).data.textcardlist
      // 数据存入vuex
      this.setCardInfo({
        type: 'home',
        info: data
      })
    },
    async loadLeftSlipData(datetime) {
      const data = (await getFeeds({ datetime })).data.textcardlist
      this.setCardInfo({
        type: 'home',
        info: this.homeCardInfo.concat(data)
      })
    }
  },
  computed: { ...mapGetters(['homeCardInfo']) },
  components: { TheHeader, ScrollX }
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

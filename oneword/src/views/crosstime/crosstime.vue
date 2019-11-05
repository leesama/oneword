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
      class="scroll"
      ref="scroll"
      :data="crosstimeCardInfo"
      @refresh="loadData"
      @leftSlip="loadLeftSlipData"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import TheHeader from '@components/detail/the-header/the-header.vue'
import ScrollX from '@components/scroll/scroll-x/scroll-x'
import { getFeeds } from '@models'

export default {
  name: 'crosstime',
  created() {
    this.loadData()
  },
  methods: {
    ...mapMutations({ setCardInfo: 'SET_CARDS_INFO' }),
    async loadData() {
      const data = (await getFeeds()).data.textcardlist
      // 数据存入vuex
      this.setCardInfo({
        type: 'crosstime',
        info: data
      })
    },
    async loadLeftSlipData(datetime) {
      const data = (await getFeeds({ datetime })).data.textcardlist
      this.setCardInfo({
        type: 'crosstime',
        info: this.crosstimeCardInfo.concat(data)
      })
    }
  },
  computed: { ...mapGetters(['crosstimeCardInfo']) },
  components: { TheHeader, ScrollX }
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

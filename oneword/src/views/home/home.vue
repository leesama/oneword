<template>
  <div class="home-content">
    <the-header>
      <template #mid>
        <span>订阅</span>
      </template>
      <template #right>
        <router-link tag="i" to="/crosstime" class="iconfont icon-fanhui"></router-link>
      </template>
    </the-header>
    <scroll-x :data="list" @refresh="loadData" @leftSlip="loadLeftSlipData" />
  </div>
</template>

<script>
import { formatFeedData } from '@js/utils.js'

import TheHeader from '@components/detail/the-header/the-header'
import ScrollX from '@components/scroll/scroll-x/scroll-x'
import { getfeeds } from '@models'
export default {
  name: 'Home',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const data = await getfeeds()
      this.list = formatFeedData(data).slice(0, 3)
      this.day = 3
    },
    async loadLeftSlipData () {
      const data = await getfeeds()
      this.list = this.list.concat(
        formatFeedData(data).slice(this.day, this.day + 1)
      )
      this.day += 1
    }
  },
  components: { TheHeader, ScrollX }
}
</script>
<style lang='stylus' scoped>
.home-content
  background linear-gradient(to bottom, #efefef, #dedede)
  position absolute
  height 100%
  box-sizing border-box
  padding-bottom 145px
  width 100%
  display flex
  flex-direction column
  overflow hidden
  i
    position absolute
    right 0
    top 0
    font-size 100px
</style>

<template>
  <div class="home-content">
    <the-header>
      <template #mid>
        <span>订阅</span>
      </template>
      <template #right>
        <i class="iconfont icon-fanhui"></i>
      </template>
    </the-header>
    <scroll-x :data="list" @refresh="loadData" @leftSlip="loadLeftSlipData" />
    <music-player />
    <the-footer />
  </div>
</template>

<script>
import MusicPlayer from '@components/music/music-player/music-player'
import TheHeader from '@components/detail/the-header/the-header'
import TheFooter from '@components/detail/the-footer/the-footer.vue'
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
    // 格式化Feed数据
    formatFeedData (data) {
      let newData = []
      let map = {}
      for (const i of data) {
        const time = i.datetime.substring(0, 10)
        if (!map[time]) {
          newData.push({
            time,
            card: [i]
          })
          map[time] = true
        } else {
          for (const j of newData) {
            if (j.time === time) {
              j.card.push(i)
              break
            }
          }
        }
      }
      for (const i of newData) {
        const itime = i.time
        i.time = {
          year: itime.substr(0, 4),
          month: itime.substr(5, 2),
          day: itime.substr(8, 2)
        }
      }
      return newData
    },
    async loadData () {
      const data = await getfeeds()
      this.list = this.formatFeedData(data).slice(0, 3)
      this.day = 3
    },
    async loadLeftSlipData () {
      const data = await getfeeds()
      this.list = this.list.concat(
        this.formatFeedData(data).slice(this.day, this.day + 1)
      )
      this.day += 1
    }
  },
  components: { TheHeader, TheFooter, ScrollX, MusicPlayer }
}
</script>
<style lang='stylus' scoped>
.home-content
  background linear-gradient(to bottom, #efefef, #dedede)
  position absolute
  height 100%
  width 100%
  display flex
  flex-direction column
  overflow hidden
</style>

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
    <scroll-x>
      <card-home></card-home>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
      <span>22222222222222</span>
    </scroll-x>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@components/the-header/the-header'
import TheFooter from '@components/the-footer/the-footer.vue'
import ScrollX from '@components/scroll-x/scroll-x'
import CardHome from '@components/card-home/card-home.vue'
import { getfeeds } from '@models'
export default {
  name: 'Home',
  data () {
    return {
      list: []
    }
  },
  async created () {
    const data = await getfeeds()
    console.log(this.FormatData(data))
  },
  methods: {
    FormatData (data) {
      let newData = []
      let map = {}
      for (const i of data) {
        const time = i.datetime.substring(0, 10)
        if (!map[time]) {
          newData.push({ time, card: [i] })
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
      return newData
    }
  },
  components: { TheHeader, TheFooter, ScrollX, CardHome }
}
</script>
<style lang='stylus' scoped>
.home-content
  background-color #efefef
  position absolute
  height 100%
  width 100%
  display flex
  flex-direction column
  overflow hidden
</style>

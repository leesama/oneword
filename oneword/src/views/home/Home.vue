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
      <card-home :list=></card-home>
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
    let newData = []
    let newDataItem = {}

    var arr = [
      { id: '1001', name: '值1', value: '111' },
      { id: '1001', name: '值1', value: '11111' },
      { id: '1002', name: '值2', value: '25462' },
      { id: '1002', name: '值2', value: '23131' },
      { id: '1002', name: '值2', value: '2315432' },
      { id: '1003', name: '值3', value: '333333' }
    ]
    var map = {}
    var dest = []
    for (var i = 0; i < arr.length; i++) {
      // 每一项的值
      var ai = arr[i]
      // 如果map对象中中没有 这项的id，直接将该项添加进新数组里
      if (!map[ai.id]) {
        dest.push({
          id: ai.id,
          name: ai.name,
          data: [ai]
        })
        // 在map中记录该项
        map[ai.id] = ai
      } else {
        // 如果map中有该项，
        for (var j = 0; j < dest.length; j++) {
          var dj = dest[j]
          if (dj.id == ai.id) {
            dj.data.push(ai)
            break
          }
        }
      }
    }
    console.log(dest)
    // 分组：如果新数组没数据，直接添加第一条数据，如果有了数据，遍历新数组，如果新数组中某一项的time旧数组time一致，将旧数组项添加进该项,跳出for循环 这里的问题是我们如何判断循环结束后，还是没有一致的time
    // for (const i of data) {
    //   // 获得时间
    //   const time = i.datetime.substring(0, 10)
    //   // 如果新数组中没有
    //   if (!newData[i.time]) {
    //     newData.push({ time, card: [i] })
    //   } else {
    //     // 如果有数据，遍历数组中的数据
    //     for (const j of newData) {
    //       // 如果新数组中有某项的time和旧数组time一致，将旧数组项添加进该项,跳出for循环
    //       if (j.time === time) {
    //         j.card.push(i)
    //         break
    //       }
    //     }
    //   }
    // }
    // console.log(newData)
    // [{time:2019,card:[{},{}]}]
    // data.forEach(i => {
    //   console.log(i)
    // })
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

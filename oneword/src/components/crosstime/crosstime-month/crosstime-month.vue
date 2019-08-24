<template>
  <scroll :scrollY="true" class="scroll">
    <div class="month-container">
      <div
        class="month"
        v-for="(item, index) in timeList"
        :key="index"
        @tap="handleClick(index,item)"
      >
        <div class="dot" v-show="dotVisible(index)" />
        {{item.month}}月
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@components/scroll/scroll-base/scroll-base'
export default {
  name: 'crosstime-month',
  data () {
    return { time: '201603', index: 0 }
  },
  methods: {
    handleClick (index, item) {
      this.index = index
      this.$emit('monthChange', this.timeList[index])
    },
    dotVisible (i) {
      return i === this.index
    }
  },
  computed: {
    timeList () {
      const monthArray = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      const date = new Date()
      const currentYear = date.getFullYear()
      const currentMonth = date.getMonth() + 1
      const pastYear = Number(this.time.slice(0, 4))
      const pastMonth = Number(this.time.slice(4, 6))
      if (currentYear === pastYear) {
        return monthArray
          .filter((i, k) => 12 - k >= pastMonth && 12 - k <= currentMonth)
          .map(i => ({ year: currentYear, month: i }))
      } else {
        const currentYearArray = monthArray.slice(12 - currentMonth, 12)
        const pastYearArray = monthArray.slice(0, 13 - pastMonth)
        if (currentYear - pastYear > 1) {
          const totalArray = []
          let lastyear = currentYear - 1
          totalArray.push.apply(
            totalArray,
            currentYearArray.map(i => ({
              year: currentYear,
              month: i
            }))
          )
          while (lastyear > pastYear) {
            totalArray.push.apply(
              totalArray,
              monthArray.map(i => ({ year: lastyear, month: i }))
            )
            lastyear--
          }
          totalArray.push.apply(
            totalArray,
            pastYearArray.map(i => ({ year: pastYear, month: i }))
          )
          return totalArray
        } else {
          return currentYearArray
            .map(i => ({ year: currentYear, month: i }))
            .concat(pastYearArray.map(i => ({ year: pastYear, month: i })))
        }
      }
    }
  },
  components: { Scroll }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.scroll
  height 100%
  width 180px
  .month
    position relative
    leftcenter()
    box-sizing border-box
    padding-right 40px
    font1()
    color #7c7c7c
    height 135px
    width 180px
    .dot
      position absolute
      left 30px
      content ''
      width 20px
      height 20px
      border-radius 50%
      background #4a4a4a
</style>

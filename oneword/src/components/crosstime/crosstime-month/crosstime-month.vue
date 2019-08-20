<template>
  <div>
    <scroll :scrollY="true">
      <div class="month">1月</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@components/scroll/scroll-base/scroll-base'
export default {
  name: 'crosstime-month',
  data () {
    return { time: '201601' }
  },
  computed: {
    timeList () {
      const monthArray = [
        '12月',
        '11月',
        '10月',
        '9月',
        '8月',
        '7月',
        '6月',
        '5月',
        '4月',
        '3月',
        '2月',
        '1月'
      ]
      const date = new Date()
      const currentYear = date.getFullYear()
      const currentMonth = date.getMonth() + 1
      const pastYear = Number(this.time.slice(0, 4))
      const pastMonth = Number(this.time.slice(4, 6))
      if (currentYear === pastYear) {
        return [{ [currentYear]: monthArray.slice(pastMonth, currentMonth) }]
      } else {
        const currentYearArray = monthArray.slice(12 - currentMonth, 12)
        const pastYearArray = monthArray.slice(12 - pastMonth, 12)
        if (currentYear - pastYear > 1) {
          const totalArray = []
          let lastyear = currentYear - 1
          totalArray.push({ [currentYear]: currentYearArray })
          while (lastyear > pastYear) {
            totalArray.push({ [lastyear]: monthArray })
            lastyear--
          }
          totalArray.push({ [pastYear]: pastYearArray })
          return totalArray
        } else {
          return [
            { [currentYear]: currentYearArray },
            { [pastYear]: pastYearArray }
          ]
        }
      }
    }
  },
  components: { Scroll }
}
</script>
<style lang='stylus' scoped>
.class
  height 130px
  width 180px
</style>

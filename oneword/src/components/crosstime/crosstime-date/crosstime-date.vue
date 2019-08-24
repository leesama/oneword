<template>
  <scroll :scrollY="true" class="scroll" ref="scroll">
    <div class="card-container">
      <a
        @tap="handleClick(item)"
        class="card"
        v-for="item in dateArray"
        :key="item.date"
        :class="{cardclicked:clickedClassVisible(item)}"
      >
        <p>
          <span>{{item.year}}</span>
          <span>{{item.month}}</span>
          <span>{{item.day}}</span>
        </p>
        <p>{{item.date}}</p>
      </a>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@components/scroll/scroll-base/scroll-base'

const date = new Date()
// 今天的月份年份对象
const thisMonth = { year: date.getFullYear(), month: date.getMonth() + 1 }
export default {
  name: 'crosstime-date',
  data () {
    return { clickedCard: {} }
  },
  props: {
    date: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    dateArray () {
      if (
        JSON.stringify(this.date) === '{}' ||
        JSON.stringify(this.date) === JSON.stringify(thisMonth)
      ) {
        this.refreshDom()
        return this.getThisMonthDates()
      } else {
        this.refreshDom()
        return this.getDates(this.date)
      }
    },
    clickedCardObjectKeyName () {
      return JSON.stringify(this.date) === '{}'
        ? JSON.stringify(thisMonth)
        : JSON.stringify(this.date)
    }
  },
  created () {
    if (localStorage.getItem('cardClicked')) {
      this.clickedCard = JSON.parse(localStorage.getItem('cardClicked'))
    }
  },
  methods: {
    clickedClassVisible (item) {
      if (!this.clickedCard[this.clickedCardObjectKeyName]) {
        return false
      } else {
        return this.checkIfCardKeyExist(item)
      }
    },
    handleClick (item) {
      if (!this.clickedCard[this.clickedCardObjectKeyName]) {
        this.$set(this.clickedCard, this.clickedCardObjectKeyName, [])
        if (!this.checkIfCardKeyExist(item)) {
          this.pushKey(item)
        }
      } else {
        this.pushKey(item)
      }
      this.$router.push({ path: '/crosstimeDetail', query: item })
    },
    checkIfCardKeyExist (item) {
      return this.clickedCard[this.clickedCardObjectKeyName].includes(
        JSON.stringify(item)
      )
    },
    pushKey (item) {
      this.clickedCard[this.clickedCardObjectKeyName].push(JSON.stringify(item))
      localStorage.setItem('cardClicked', JSON.stringify(this.clickedCard))
    },

    getDates ({ year, month }) {
      let dayArry = []
      let day = new Date(year, month, 0).getDate()
      for (let k = day; k >= 1; k--) {
        dayArry.push(this.formatDate({ year, month }, k))
      }
      return dayArry
    },
    getThisMonthDates () {
      let dayArry = []
      for (let k = date.getDate(); k >= 1; k--) {
        dayArry.push(this.formatDate(thisMonth, k))
      }

      return dayArry
    },
    formatDate ({ year, month }, date) {
      let day = `星期${'日一二三四五六'.charAt(
        new Date(year, month, date).getDay()
      )}`
      month = `${month}月`
      return { ...{ year, month }, day: day, date: date }
    },
    refreshDom () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  components: { Scroll }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.scroll
  width 100%
  .card-container
    font1()
    margin-top 15px
    display flex
    flex-wrap wrap
    .card
      margin 15px 30px 15px 0
      width 500px
      height 325px
      background #fefefe
      color black
      p:first-child
        margin 25px 0 80px 25px
        span:first-child
          padding-right 15px
      p:nth-child(2)
        text-align center
        font-size 90px
    .cardclicked
      color #b2b2b2
</style>

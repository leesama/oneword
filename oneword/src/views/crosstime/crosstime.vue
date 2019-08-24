<template>
  <div class="crosstime">
    <the-header>
      <template #left>
        <router-link tag="i" class="iconfont" to="/">&#xe612;</router-link>
      </template>
      <template #mid>
        <span>穿越</span>
      </template>
    </the-header>
    <div class="main">
      <crosstime-month @monthChange="handleMonthChange" />
      <crosstime-date :date="date" />
    </div>
  </div>
</template>

<script>
import CrosstimeMonth from '@components/crosstime/crosstime-month/crosstime-month.vue'
import CrosstimeDate from '@components/crosstime/crosstime-date/crosstime-date.vue'
import TheHeader from '@components/detail/the-header/the-header.vue'

export default {
  name: 'crosstime',
  data () {
    return {
      date: {}
    }
  },
  methods: {
    handleMonthChange (date) {
      this.date = date
    }
  },
  components: { CrosstimeMonth, CrosstimeDate, TheHeader }
}
</script>
<style lang='stylus' scoped>
.crosstime
  background linear-gradient(to bottom, #f0f0f0, #dddddd)
  z-index 100
  position fixed
  display flex
  flex-direction column
  top 0
  left 0
  right 0
  bottom 0
  height 100%
  .main
    flex 1
    display flex
</style>

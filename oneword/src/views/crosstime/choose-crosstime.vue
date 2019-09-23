<template>
  <div class="container">
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
  name: 'choose-crosstime',
  data() {
    return {
      date: {}
    }
  },
  methods: {
    handleMonthChange(date) {
      this.date = date
    }
  },
  components: { CrosstimeMonth, CrosstimeDate, TheHeader }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.container
  position absolute
  filled()
  background linear-gradient(to bottom, #f0f0f0, #dddddd)
  display flex
  flex-direction column
  .main
    flex 1
    display flex
</style>

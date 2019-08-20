<template>
  <!-- <transition name="rightToLeft"> -->
  <div class="crosstime">
    <the-header>
      <template #left>
        <router-link tag="i" class="iconfont" to="/">&#xe612;</router-link>
      </template>
      <template #mid>
        <span>穿越</span>
      </template>
    </the-header>
    <crosstime-month />
  </div>
  <!-- </transition> -->
</template>

<script>
import CrosstimeMonth from '@components/crosstime/crosstime-month/crosstime-month.vue'
import TheHeader from '@components/detail/the-header/the-header.vue'
export default {
  name: 'crosstime',
  methods: {
    backHome () {}
  },
  components: { CrosstimeMonth, TheHeader }
}
</script>
<style lang='stylus' scoped>
.crosstime
  background red
  z-index 100
  position fixed
  top 0
  left 0
  right 0
  bottom 0
</style>

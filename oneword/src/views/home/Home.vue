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
export default {
  name: 'Home',
  data () {
    return {}
  },

  components: { TheHeader, TheFooter, ScrollX }
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

<template>
  <div class="root-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from '@components/detail/the-footer/the-footer'
export default {
  name: 'root',
  components: { TheFooter }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.root-container
  display flex
  flex-direction column
  filled()
</style>

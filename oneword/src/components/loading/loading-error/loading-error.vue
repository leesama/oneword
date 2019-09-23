<template>
  <div v-if="errorLoadingVisible">Sorry,请重试:(</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'loading-error',
  computed: mapGetters([
    'errorLoadingVisible'
  ])
}
</script>
<style lang='stylus' scoped>
div
  font-family FZZhengHeiS-EL-GB
  height 106px
  width 434px
  background #4a4a4a
  position fixed
  left 0px
  right 0px
  margin-left auto
  margin-right auto
  bottom 300px
  color #fff
  text-align center
  line-height 106px
  border-radius 10px
</style>

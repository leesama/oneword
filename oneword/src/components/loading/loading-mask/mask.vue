<template>
  <div class="ball-container" v-if="loadingMaskVisible">
    <div class="ball" ref="ball" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loading',
  computed: {
    ...mapGetters(['loadingMaskVisible'])
  },
  mounted() {
    this.$anime({
      targets: this.$refs.ball,
      scale: 1.4,
      loop: true,
      direction: 'alternate',
      easing: 'linear',
      duration: 300
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.ball-container
  z-index 999
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(0, 0, 0, 0.3)
  center()
  .ball
    background #4a4a4a
    width 50px
    height 50px
    border-radius 50%
</style>

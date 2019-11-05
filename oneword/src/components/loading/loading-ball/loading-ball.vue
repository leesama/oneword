<template>
  <div class="endball" :class="loadingClass">
    <div class="ball" ref="ball" v-if="!changeEnd"></div>
    <div v-if="changeEnd">- End -</div>
  </div>
</template>

<script>
export default {
  name: 'loading-ball',
  // direction 为1小球竖向排列，2小球横向排列
  props: {
    direction: { type: Number, default: 1 },
    changeEnd: { type: Boolean, default: true }
  },
  computed: {
    loadingClass() {
      return this.direction === 1
        ? 'vertical-ball-wrapper'
        : 'horizontal-ball-wrapper'
    }
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
.vertical-ball-wrapper
  display inline-flex
  width 900px
  height 600px
  justify-content center
  align-items center
.horizontal-ball-wrapper
  width 100%
  height 300px
  center()
.ball
  background #4a4a4a
  width 50px
  height 50px
  border-radius 50%
  box-shadow 0 5px 10px #545353
.endball
  font-size 40px
  font3()
</style>

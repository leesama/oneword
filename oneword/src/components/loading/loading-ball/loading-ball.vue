<template>
  <div class="loadingball">
    <div class="ball" ref="ball"></div>
  </div>
</template>

<script>
export default {
  name: 'loading-ball',
  mounted () {
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
.loadingball
  display inline-flex
  width 900px
  height 600px
  justify-content center
  align-items center
  .ball
    background #4a4a4a
    width 50px
    height 50px
    border-radius 50%
</style>

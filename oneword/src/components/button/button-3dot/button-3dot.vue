<template>
  <div class="dot-wrapper">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  name: 'button-share',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.dot-wrapper
  height 100%
  display flex
  center()
  padding-left 25px
  padding-right 71px
  .dot
    width 10px
    background #4a4a4a
    height 10px
    border-radius 50%
    &:nth-child(1)
      margin-right 9px
    &:nth-child(2)
      margin-right 9px
</style>

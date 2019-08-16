<template>
  <header>
    <slot name="mid"></slot>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  name: 'the-header'
}
</script>
<style lang='stylus' scoped>
header
  box-shadow '0px' '-2px' '5px' '5px' #dddddd
  position relative
  line-height 130px
  text-align center
  height 130px
  background-color #f6f6f6
</style>

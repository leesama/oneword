<template>
  <header>
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="mid"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
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
  display grid
  grid-template-columns repeat(3, 33.33%)
  line-height 130px
  text-align center
  height 130px
  background-color #f6f6f6
  div:first-child
    justify-self start
    padding-left 80px
  span
    font-size 60px
    font-family FZQingKeBenYueSongS-R-GB
</style>

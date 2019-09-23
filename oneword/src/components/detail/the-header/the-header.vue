<template>
  <div class="detail-header border-bottom">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="mid"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-header'
}
</script>
<style lang='stylus' scoped>
.detail-header
  color #4a4a4a
  display grid
  grid-template-columns 100px auto 100px
  line-height 130px
  text-align center
  height 130px
  background-color #f6f6f6
  div:first-child
    justify-self start
    padding-left 80px
  div:nth-child(3)
    justify-self end
    padding-right 60px
  span
    font-size 60px
    font-family FZQingKeBenYueSongS-R-GB
.border-bottom
  &:before
    border-color #e8e8e8 !important
  &:after
    border-color #e8e8e8 !important
</style>

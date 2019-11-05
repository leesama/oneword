<template>
  <the-header :class="{transparent:transparent}">
    <template #left>
      <span @click="handleLeftClick">
        <slot name="left">
          <i class="iconfont">&#xe618;</i>
        </slot>
      </span>
    </template>
    <template #mid>
      <span>
        <slot name="mid" />
      </span>
    </template>
    <template #right>
      <span @click="handleRightClick" v-if="right">
        <slot name="right">完成</slot>
      </span>
    </template>
  </the-header>
</template>

<script>
import TheHeader from '@components/detail/the-header/the-header'
export default {
  name: 'the-header-have-close',
  props: {
    transparent: { type: Boolean, default: true },
    right: { type: Boolean, default: true }
  },
  methods: {
    handleLeftClick() {
      this.$emit('close')
    },
    handleRightClick() {
      this.$emit('rightClick')
    }
  },
  components: { TheHeader }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.transparent
  background none
  &:before
    border none
>>>
  .left
    padding-left 0px !important
    &>span
      padding 30px 30px 30px 50px
      font-size 60px
  .center
    &>span
      font-size 50px
  .right
    padding-right 0px !important
    display flex
    &>span
      height 130px
      normalFont()
      color #4779a7
      font-size 45px
      padding 0 50px
    span:last-child
      padding 0 60px 0 0
</style>

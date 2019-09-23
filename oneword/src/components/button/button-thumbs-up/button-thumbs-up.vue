<template>
  <span class="button" :class="like?'active':''" @click.stop="handleClick">
    <span>{{number}}</span>
    <i class="iconfont">&#xe608;</i>
  </span>
</template>

<script>
export default {
  name: 'button-thumbs-up',
  props: {
    number: { type: String },
    like: { type: Boolean, default: false }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.button
  padding-bottom 20px
  display flex
  flex-direction row
  & > span
    font-size 30px
    color #7f7f7f
    padding-top 10px
    padding-right 17px
  & > .iconfont
    color #b4b4b4
    font-size 38px
.active
  & > span
    color #7190a9
  & > .iconfont
    color #7190a9
</style>

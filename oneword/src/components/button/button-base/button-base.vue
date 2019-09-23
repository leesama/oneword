<template>
  <div class="button" @click.stop="handleClick">
    <i class="iconfont" v-html="iconFontCode"></i>
    <span v-if="numberVisible">{{number}}</span>
  </div>
</template>

<script>
export default {
  name: 'button-base',
  props: {
    number: { type: Number, default: 0 },
    numberVisible: { type: Boolean, default: true },
    iconFontCode: { type: String, required: true }
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
  normalFont()
  padding-left 40px
  padding-right 40px
  height 100%
  center()
  i
    font-size 47px
    font-weight bold
  span
    font-size 30px
    margin-left 10px
</style>

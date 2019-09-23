<template>
  <div class="container">
    <div class="input-wrapper">
      <textarea-autosize
        rows="1"
        class="textarea-autosize"
        placeholder="写下感悟"
        ref="myTextarea"
        v-model="content"
        @focus.native="onFocusTextarea"
        @blur.native="onBlurTextarea"
      />

      <span />
      <span @click="handleClik">发送</span>
    </div>
    <div class="mask" v-show="maskVisible" @click="handleClickMask" />
  </div>
</template>

<script>
export default {
  name: 'buttom-input',
  data() {
    return {
      content: '',
      maskVisible: false
    }
  },
  methods: {
    handleClickMask() {},
    handleClik() {
      this.content = ''
      this.$emit('click', this.content)
    },
    onFocusTextarea(e) {
      this.maskVisible = true
    },
    onBlurTextarea(e) {
      this.maskVisible = false
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.input-wrapper
  z-index 2
  font-size 42px
  display flex
  justify-content space-between
  align-items center
  position fixed
  bottom 0
  left 0
  right 0
  box-sizing border-box
  box-shadow 0 0 8px 4px #dadada
  min-height 130px
  background-color #fefefe
  .textarea-autosize
    border 0
    caret-color #376cf3
    box-sizing border-box
    line-height 60px
    padding 24px 30px 24px 45px
    flex 1
    normalFont()
    font-size 42px
    &::placeholder
      color #c7c7cc
  &>span:nth-child(2)
    display block
    height 90px
    width 3px
    background-color #d4d7da
  &>span:nth-child(3)
    padding-right 72px
    padding-left 55px
    padding-top 20px
    padding-bottom 20px
    colorBlue()
.mask
  position fixed
  left 0
  right 0
  top 130px
  bottom 0
  background-color #000
  z-index 1
  opacity 0.4
</style>

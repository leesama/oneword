<template>
  <div class="toast-wrapper">
    <div class="mask" @click="handleCancelClick" v-if="toastVisible" />
    <transition name="toast-transition">
      <div class="toast" v-if="toastVisible">
        <span v-for="(item, index) in toastInfo" :key="index" @click="handleClick(index)">{{item}}</span>
        <span @click="handleCancelClick">取消</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    toastInfo: {
      type: Array,
      default() {
        return ['回复', '复制', '举报']
      }
    },
    toastVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(i) {
      this.$emit('toastClick', i)
    },
    handleCancelClick() {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang='stylus' scoped>
.mask
  background-color #000
  opacity 0.4
  position fixed
  height 100%
  top 130px
  left 0
  right 0
.toast
  z-index 20
  font-size 50px
  font-weight 400
  border-top-left-radius 30px
  border-top-right-radius 30px
  user-select none
  position fixed
  bottom 0
  background-color white
  left 0
  right 0
  display flex
  flex-direction column
  span
    height 150px
    display flex
    color #000000
    justify-content center
    align-items center
    border-bottom 1px solid #f2f2f2
    &:active
      background-color #fafafa
      color #616161
    &:first-child
      border-top-left-radius 30px
      border-top-right-radius 30px
    &:nth-last-child(2)
      border-bottom none
    &:last-child
      border-top 18px solid #f2f2f2
      border-bottom none
.toast-transition-enter, .toast-transition-leave-to
  transform translate3d(0, 100%, 0)
.toast-transition-enter-active, .toast-transition-leave-active
  transition all 0.1s ease-out
</style>

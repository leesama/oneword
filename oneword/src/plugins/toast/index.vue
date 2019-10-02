<template>
  <transition name="fade">
    <div class="toastMessageBox" v-if="show">{{message}}</div>
  </transition>
</template>

<script>
export default {
  name: 'toastMessage',
  data() {
    return {
      message: '',
      show: false
    }
  }
}
</script>

<style  lang='stylus' scoped>
.fade-enter
  opacity 0
.fade-leave
  opacity 1
.fade-enter-active, .fade-leave-active
  transition 300ms
.toastMessageBox
  font-family FZZhengHeiS-EL-GB
  height 106px
  padding 0 100px
  background #4a4a4a
  position fixed
  top 85%
  left 50%
  transform translate(-50%, -50%)
  color #fff
  text-align center
  line-height 106px
  border-radius 10px
</style>

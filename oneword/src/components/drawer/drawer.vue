<template>
  <div class="drawer-wrapper">
    <div class="mask" @click="handleCancelClick" v-if="visible" />
    <transition name="drawer-transition">
      <div class="drawer" v-if="visible">
        <span
          :class="{colorspan:item.color&&item.color ===true}"
          v-for="(item, index) in drawerInfo"
          :key="index"
          @click="handleClick(index)"
        >{{item.word?item.word:item}}</span>
        <span @click="handleCancelClick">取消</span>
      </div>
    </transition>
  </div>
</template>

<script>
// drawerInfo 对象可以传入[{color:true,word:'哈哈'}]数组。color true字体会为红色显示
export default {
  name: 'drawer',
  props: {
    drawerInfo: {
      type: Array,
      default() {
        return []
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(i) {
      this.$emit('click', i)
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
.drawer
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
  .colorspan
    color #e93323
.drawer-transition-enter, .drawer-transition-leave-to
  transform translate3d(0, 100%, 0)
.drawer-transition-enter-active, .drawer-transition-leave-active
  transition all 150ms ease-out
</style>

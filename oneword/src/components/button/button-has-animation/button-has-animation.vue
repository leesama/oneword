<template>
  <div class="circle-container" @click="handleClick" :class="circleClassName">
    <div class="circle-background"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  name: 'button-has-animation',
  data() {
    return { select: false, circleClassName: '' }
  },
  methods: {
    handleClick() {
      this.select = !this.select
      if (this.select) {
        this.circleClassName = 'selected'
        this.$emit('selected')
      } else {
        this.circleClassName = 'unselected'
        this.$emit('unselected')
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.circle-container
  width 140px
  height 80px
  border 7px solid #e3e3e3
  border-radius 60px
  background-color #fefefe
  leftcenter()
  overflow hidden
  position relative
  .circle-background
    background-color #fefefe
    position absolute
    border-radius 60px
    top 0
    right 0
    width 70%
    height 100%
  .circle
    position absolute
    top 0
    left 0
    height 80px
    width 80px
    background-color #fefefe
    box-shadow 5px 0px 10px #dddddd
    border-radius 50%
.selected
  background-color #4a4a4a
  transition all 0.3s
  .circle-background
    transition all 0.3s
    transform scale(0.5)
  .circle
    transition all 0.3s
    transform translate3d(4.8vw, 0, 0)
.unselected
  background-color #fefefe
  transition all 0.3s
  .circle-background
    transition all 0.3s
    transform scale(1)
  .circle
    transition all 0.3s
    transform translate3d(0, 0, 0)
</style>

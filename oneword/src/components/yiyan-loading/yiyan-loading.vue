<template>
  <div class="loadding-wrapper" ref="loaddingWrapper">
    <ul ref="itemlist">
      <li v-for="(item, index) in list" :style="{height: item[0] }" :key="index"></li>
    </ul>
  </div>
</template>

<script>
const LONG_LINE_HEIGHT = '20px'
const SHORT_LINE_HEIGHT = '10px'
// scroll滚动的距离
const scrollX = 60
// 动画的x轴移动的距离
const animationX = 40

export default {
  name: 'yiyan-loading',
  data () {
    return {
      list: [
        [LONG_LINE_HEIGHT, 90, 0, -22, 0],
        [LONG_LINE_HEIGHT, 50, 1, -10, 0],
        [LONG_LINE_HEIGHT, 90, 2, 2, 0],
        [LONG_LINE_HEIGHT, 65, 3, 5, 0],
        [SHORT_LINE_HEIGHT, 0, 4, 20, 0],
        [LONG_LINE_HEIGHT, 115, 5, 35, 0],
        [SHORT_LINE_HEIGHT, 135, 6, 40, -5],
        [SHORT_LINE_HEIGHT, 90, 7, 55, 4],
        [SHORT_LINE_HEIGHT, 45, 8, 70, -5],
        [LONG_LINE_HEIGHT, 90, 9, 30, 0],
        [SHORT_LINE_HEIGHT, 145, 10, 25, -5],
        [SHORT_LINE_HEIGHT, 90, 11, 40, 4],
        [SHORT_LINE_HEIGHT, 45, 12, 55, -5]
      ]
    }
  },
  props: ['scrollDistance', 'scrolled', 'flick', 'touchEnd'],
  mounted () {
    // 每个li容器的高度缓存到实例上
    this.itemHeight = this.$refs.loaddingWrapper.clientHeight / 13
  },
  watch: {
    scrollDistance (val) {
      if (val < 0) return
      // 200毫秒后再执行动画，用来判定是否快速滑动
      // if (this.locked) return
      this.timer = setTimeout(() => {
        this.items.forEach((item, index) => {
          if (val > scrollX) return
          const rate = val / scrollX
          const x = (animationX + this.list[index][4]) * rate
          const y =
            (this.list[index][2] * this.itemHeight -
              index * this.itemHeight -
              this.list[index][3]) *
            rate
          const rotate = this.list[index][1] * rate
          const opacity = 0.9 * rate
          this.$anime.set(item, {
            translateX () {
              return x
            },
            translateY () {
              return y
            },
            rotate () {
              return rotate
            },
            opacity () {
              return opacity
            }
          })
        })
      }, 200)
    },
    scrolled (val) {
      // 记录开始滚动的时间
      this.scrollBeginTime = new Date().getTime()
      this.list.sort(() => 0.5 - Math.random())
      // dom更新后将其缓存起来
      this.$nextTick(function () {
        this.items = this.$refs.itemlist.querySelectorAll('li')
      })
    },
    touchEnd (val) {
      // 如果触摸结束时间减去开始滚动时间小于200毫秒并且的值大于20，判定为用户快速滑动了滚动条头部，直接执行动画
      if (new Date().getTime() - this.scrollBeginTime < 200 && val > 20) {
        this.items.forEach((item, index) => {
          const x = animationX + this.list[index][4]
          const y =
            this.list[index][2] * this.itemHeight -
            index * this.itemHeight -
            this.list[index][3]
          this.$anime({
            targets: item,
            translateX: x,
            translateY: y,
            rotate: this.list[index][1],
            duration: 700,
            opacity: 0.9,
            direction: 'alternate',
            easing: 'easeOutQuint'
          })
        })
      }
    }
  },
  methods: {}
}
</script>
<style lang='stylus' scoped>
.loadding-wrapper
  display inline-flex
  align-items center
ul
  margin-left -50px
  display grid
  grid-template-columns 5px
  grid-template-rows repeat(13, 1fr)
  align-items center
li
  opacity 0
  background #888888
  width 5px
</style>

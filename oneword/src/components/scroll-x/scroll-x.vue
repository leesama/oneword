<template>
  <base-scroll
    :probeType="3"
    :listenScroll="true"
    :scrollX="true"
    @scroll="scroll"
    :beforeScroll="true"
    @beforeScroll="beforeScroll"
    ref="baseScroll"
  >
    <div class="scroll-content">
      <ul ref="itemlist">
        <li
          v-for="(item, index) in list"
          :style="{height: item[0] }"
          :key="index"
        ></li>
      </ul>
      <slot></slot>
    </div>
  </base-scroll>
</template>

<script>
import BaseScroll from '@components/scroll-base/scroll-base'
const LONG_LINE_HEIGHT = '20px'
const SHORT_LINE_HEIGHT = '10px'
// scroll滚动的距离
const scrollX = 60
// 动画的x轴移动的距离
const animationX = 60

export default {
  name: 'scroll-x',
  data () {
    return {
      data: {},
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
  props: {
    listt: {
      type: Array,
      default () {
        return []
      }
    }
  },

  mounted () {
    // 加载后滚动条滚动一定距离并禁止scroll
    this.fixedScroll()
    // 计算并初始化数据，为滚动动画做准备
    this.initForAnimate()
    // 指定动画进行到结尾处
    this.animateByScroll(scrollX)
  },
  methods: {
    initForAnimate () {
      // 每个li容器的高度和li节点缓存到实例上，为了以后计算高度做准备
      this.itemHeight = this.$refs.itemlist.clientHeight / 13
      // 将dom缓存起来
      this.items = this.$refs.itemlist.querySelectorAll('li')
    },
    scroll (e) {
      // 如果滚动的距离大于
      const x = e.x
      // 持续的动画执行时，会disable scroll,当scroll回滚到0的时候，让其启用,并且执行刷新scroll方法，保证滚动效果正常
      if (x <= 0) {
        this.locked = false
        this.$refs.baseScroll.enable()
        this.$refs.baseScroll.refresh()
      }
      if (this.locked) {
        this.animateByScroll(x)
        return
      }
      // 如果滚动时间小于300ms,不传递scroll的值到动画
      if (new Date().getTime() - this.scrollBeginTime < 300) {
        // 如果滚动的距离大于scrollX，加锁
        if (x >= scrollX) {
          this.locked = true
          this.$refs.baseScroll.disable()
          this.animateByScroll(scrollX)
          this.$refs.baseScroll.scrollTo(90, 0, 1000)
        }
        return
      }
      if (x < 0 || x > scrollX) return
      this.animateByScroll(x)
    },
    // 滚动开始前记录当前时间
    beforeScroll () {
      this.scrollBeginTime = new Date().getTime()
      // 滚动之前将滚动项顺序打乱
      this.list.sort(() => 0.5 - Math.random())
      // dom更新后将其缓存起来
      this.$nextTick(function () {
        this.items = this.$refs.itemlist.querySelectorAll('li')
      })
    },
    // 根据scroll值进行动画
    animateByScroll (val) {
      this.items.forEach((item, index) => {
        const rate = val / scrollX
        const x = animationX + this.list[index][4]
        const y =
          this.list[index][2] * this.itemHeight -
          index * this.itemHeight -
          this.list[index][3]
        const rotate = this.list[index][1]
        const opacity = 0.9
        if (val > scrollX) {
          return
        }
        this.$anime.set(item, {
          translateX () {
            return x * rate
          },
          translateY () {
            return y * rate
          },
          rotate () {
            return rotate * rate
          },
          opacity () {
            return opacity * rate
          }
        })
      })
    },
    // 固定的滚动距离
    fixedScroll () {
      // disable： DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。scroll事件不影响，所以回弹的时候，会传递scrollDistance
      this.$refs.baseScroll.disable()
      this.$refs.baseScroll.scrollTo(0, 0, 3000)
    }
  },
  components: { BaseScroll }
}
</script>
<style lang='stylus' scoped>
.scroll-content
  display inline-flex
  align-items center
ul
  width 200px
  margin-left -200px
  display grid
  grid-template-columns 5px
  grid-template-rows repeat(13, 1fr)
  align-items center
li
  opacity 0
  background #888888
  width 5px
</style>

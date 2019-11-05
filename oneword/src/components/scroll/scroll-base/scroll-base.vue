<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import NestedScroll from '@better-scroll/nested-scroll'

BScroll.use(NestedScroll)
BScroll.use(ScrollBar)
BScroll.use(PullUp)
BScroll.use(PullDown)
export default {
  name: 'scroll-base',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    preventDefaultException: {
      type: Object,
      default() {
        return {}
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    tap: {
      type: String,
      default: ''
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },

    /**
     * 是否派发右侧拉动的事件，用于右拉加载
     */
    rightSlip: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    scrollDistance: {
      type: Number,
      default: 0
    },
    touchEnd: {
      type: Boolean,
      default: false
    },
    scrollEnd: {
      type: Boolean,
      default: false
    },
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    bounce: {
      type: [Object, Boolean]
    },
    leftSlip: {
      type: Boolean,
      default: false
    },
    momentum: {
      type: Boolean,
      default: true
    },
    bounceTime: {
      type: Number,
      default: 800
    },
    tagException: {
      type: Object,
      default() {
        return {}
      }
    },
    scrollBar: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullDown: {
      type: Boolean,
      default: false
    },
    directionLockThreshold: {
      type: Number,
      default: 5
    },
    momentumLimitDistance: {
      type: Number,
      default: 15
    },
    nestedScroll: { type: Boolean, default: false }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    this._initScroll()
  },
  // beforeDestroy () {
  //   this.destroy()
  // },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        tagException: this.tagException,
        startX: this.startX,
        startY: this.startY,
        probeType: this.probeType,
        scrollX: this.scrollX,
        useTransition: false,
        click: this.click,
        scrollY: this.scrollY,
        bounce: this.bounce,
        bounceTime: this.bounceTime,
        tap: this.tap,
        stopPropagation: this.stopPropagation,
        momentum: this.momentum,
        momentumLimitDistance: this.momentumLimitDistance,
        preventDefaultException: this.preventDefaultException,
        scrollbar: this.scrollBar,
        pullUpLoad: this.pullUp,
        nestedScroll: this.nestedScroll,
        pullDownRefresh: {
          threshold: 110,
          stop: 100
        },
        directionLockThreshold: this.directionLockThreshold
      })
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到左侧事件，用于右滑加载
      if (this.leftSlip) {
        this.watching = false
        this.watch = function() {
          // watching是leftSlip事件的标识，如果wathching有值，说明还在监听pullingup事件中，直接返回
          if (this.watching) {
            return
          }
          // 如果没值，赋值为真，监听滚动事件
          this.watching = true

          this.scroll.on('scroll', this.check, this)
        }
        this.check = function(pos) {
          if (
            this.scroll.movingDirectionX === 1 &&
            pos.x <= this.scroll.maxScrollX + 50
          ) {
            // 滚动结束后修改触发标识，不再监听leftSlip事件，ps:不再监听leftSlip事件之后才再次监听 这里不直接在scrollEnd后再次监听事件是因为触发leftSlip后，会执行异步操作，执行leftSlipfinish后再次触发
            this.scroll.once('scrollEnd', () => {
              this.watching = false
            })
            // 触发下拉事件
            this.$emit('leftSlip')
            this.scroll.off('scroll', this.check)
          }
        }

        this.watch()
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullUp) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullUp')
        })
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pullDown) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullDown')
        })
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
      if (this.touchEnd) {
        this.scroll.on('touchEnd', pos => {
          // 滚动到底部
          this.$emit('touchEnd', pos)
        })
      }
      if (this.scrollEnd) {
        this.scroll.on('scrollEnd', pos => {
          // 滚动到底部
          this.$emit('scrollEnd', pos)
        })
      }
    },
    stop() {
      // 代理better-scroll的stop方法
      this.scroll && this.scroll.stop()
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    isEnabled() {
      return this.scroll.enabled
    },

    destroy() {
      this.scroll && this.scroll.destroy()
    },
    refresh() {
      // 代理better-scroll的refresh方法

      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollBy() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    leftSlipfinish() {
      // 在事件中的话，一旦结束，就再次监听事件，如果没有在事件中，直接监听事件，
      if (this.watching) {
        this.scroll.once('scrollEnd', this.watch, this)
      } else {
        this.watch()
      }
    },
    leftSlipClose() {
      if (!this.watching) {
        return
      }
      this.watching = false
      this.scroll.off('scroll', this.check)
    },
    leftSlipOpen() {
      this.watch()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    openPullUp() {
      this.scroll.openPullUp()
    },
    closePullUp() {
      this.scroll.closePullUp()
    },
    off(event) {
      this.scroll.off(event)
    },
    finishPullDown() {
      this.scroll.finishPullDown()
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<style lang='stylus' scoped>
// 这里加上relative定位，是因为scrollbar是绝对定位的，而我们又有多个scrollbar在同一个页面的情况
.scroll-wrapper
  position relative
  width 100%
  height 100%
  overflow hidden
</style>

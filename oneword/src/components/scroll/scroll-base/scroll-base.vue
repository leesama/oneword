<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  name: 'scroll-base',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
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
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
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
    bounce: {
      type: Object,
      default () {
        return {}
      }
    },
    leftSlip: {
      type: Boolean,
      default: false
    },
    momentum: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    this._initScroll()
  },
  // beforeDestroy () {
  //   this.destroy()
  // },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        startX: this.startX,
        probeType: this.probeType,
        scrollX: this.scrollX,
        useTransition: false,
        click: this.click,
        scrollY: this.scrollY,
        bounce: this.bounce,
        bounceTime: 1500,
        tap: 'tap',
        momentum: this.momentum
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
        this.watch = function () {
          // watching是pullingUp 事件的标识，如果wathching有值，说明还在监听pullingup事件中，直接返回
          if (this.watching) {
            return
          }
          // 如果没值，赋值为真，监听滚动事件
          this.watching = true
          this.scroll.on('scroll', check, this)
        }
        const check = function (pos) {
          if (
            this.scroll.movingDirectionX === 1 &&
            pos.x <= this.scroll.maxScrollX + 20
          ) {
            // 滚动结束后修改触发标识，不再监听pullingup事件，ps:不再监听pullingup事件之后才再次监听 这里不直接在scrollEnd后再次监听事件是因为触发pullingUp后，会执行异步操作，执行leftSlipfinish后再次触发
            this.scroll.once('scrollEnd', watching => {
              this.watching = false
            })
            // 触发下拉事件
            this.$emit('leftSlip')
            // 不再执行scroll触发的check方法，也就是说之后不会再触发pullingUp
            this.scroll.off('scroll', check)
          }
        }

        this.watch()
      }
      // 上滑事件
      // if (this.pullup) {
      //   this.scroll.on('scrollEnd', () => {
      //     // 滚动到底部
      //     if (this.scroll.y <= this.scroll.maxScrollY + 50) {
      //       console.log(22)
      //       this.$emit('scrollToEnd')
      //     }
      //   })
      // }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
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
    stop () {
      // 代理better-scroll的stop方法
      this.scroll && this.scroll.stop()
    },
    disable () {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable () {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    isEnabled () {
      return this.scroll.enabled
    },
    destroy () {
      this.scroll && this.scroll.destroy()
    },
    refresh () {
      // 代理better-scroll的refresh方法

      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollBy () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
    },
    scrollToElement () {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    leftSlipfinish () {
      // 在事件中的话，一旦结束，就再次监听事件，如果没有在事件中，直接监听事件，
      if (this.watching) {
        this.scroll.once('scrollEnd', this.watch, this)
      } else {
        this.watch()
      }
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<style lang='stylus' scoped>
.scroll-wrapper
  height 100%
  overflow hidden
</style>

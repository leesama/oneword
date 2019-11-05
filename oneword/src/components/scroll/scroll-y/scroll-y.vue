<template>
  <scroll-base
    class="scroll-wrapper-y"
    :scrollBar="scrollBar"
    tap="tap"
    :bounceTime="1500"
    :probeType="3"
    :scrollY="true"
    :scrollX="true"
    :listenScroll="true"
    @scroll="scroll"
    :beforeScroll="true"
    @beforeScroll="beforeScroll"
    :scrollEnd="true"
    @scrollEnd="scrollEnd"
    ref="baseScroll"
    :pullUp="pullUp"
    @pullUp="handlePullUp"
    :pullDown="pullDown"
    @pullDown="handlePullDown"
    :directionLockThreshold="0"
    :click="false"
  >
    <div class="scroll-content" ref="scroll_content">
      <ul class="animation-ul">
        <li v-for="(item, index) of list" class="animation-li" ref="li" :key="index"></li>
      </ul>
      <slot />
      <LoadingBall :direction="2" v-if="loadingBallVisible" :changeEnd="changeEnd" />
    </div>
  </scroll-base>
</template>

<script>
import LoadingBall from '@components/loading/loading-ball/loading-ball.vue'
import ScrollBase from '@components/scroll/scroll-base/scroll-base.vue'
const PULLDOWN_SPACING_TIME = 700
export default {
  name: 'scroll-y',
  data() {
    return {
      // 用来记录每一条动画中的li的长度，需要偏转的角度，位置，x轴偏移量，y轴偏移量
      list: [
        [90, 0, 110, 5],
        [0, 1, 40, 15],
        [90, 2, -30, 5],
        [0, 3, -120, -5]
      ],
      loadingBallVisible: false,
      changeEnd: false
    }
  },
  props: {
    pullDown: { type: Boolean, default: false },
    // 第一次加载展示pulldown动画
    firstLoadPullDown: { type: Boolean, default: true },
    pullUp: { type: Boolean, default: false },
    scrollBar: { type: Boolean, default: true }
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    initScroll() {
      this.baseScroll = this.$refs.baseScroll
      if (this.firstLoadPullDown) {
        this.baseScroll.disable()
        this.animateByScroll(60)
        this.baseScroll.scrollTo(0, 100, 600)
        setTimeout(() => {
          this.baseScroll.stop()
        }, 600)
        this.baseScroll.scroll.trigger('pullingDown')
      }
    },
    scroll(e) {
      let y = e.y
      if (y > 0) {
        // 打乱li动画项对应的移动信息的数组，这里是为了实现每次scroll时，顶部的动画都能随机变化移动
        // 滚动之前将滚动项顺序打乱
        if (!this.items) {
          this.list.sort(() => 0.5 - Math.random())
          // dom更新后将其缓存起来
          this.$nextTick(function() {
            this.items = this.$refs.li
          })
        }
        if (
          this.scrollBeginTime &&
          new Date().getTime() - this.scrollBeginTime < 300 &&
          y >= 60
        ) {
          this.scrollBeginTime = null
          this._triggerPullingDown()
        }
        this.animateByScroll(y)
      }
    },
    // 滚动开始前记录当前时间
    beforeScroll() {
      this.scrollBeginTime = new Date().getTime()
    },
    scrollEnd(e) {
      const y = e.y
      // 滚动结束，标记动画结束
      // 持续的动画执行时，会disable scroll,当scroll结束时，让其启用,刷新scroll
      if (y === 0 && !this.baseScroll.scroll.enabled) {
        this.baseScroll.enable()
        this.baseScroll.refresh()
      }
      this.items = null
    },
    // 根据scroll值进行动画
    animateByScroll(val) {
      this.items &&
        this.items.forEach((item, index) => {
          const rate = val / (80 + (this.list[index][1] / 4) * 20)
          // 动画的项需要移动的x轴距离,需要移动到的位置减去当前位置加上偏移位置
          const x = (this.list[index][1] - index) * 80 + this.list[index][2]
          // 动画的项需要移动的y轴距离
          const y = 70 + this.list[index][3]
          const rotate = this.list[index][0]
          const opacity = 1
          if (y * rate <= y) {
            this.$anime.set(item, {
              translateX() {
                return x * rate
              },
              translateY() {
                return y * rate
              },
              rotate() {
                return rotate * rate
              },
              opacity() {
                return opacity * rate
              }
            })
          } else {
            this.$anime.set(item, {
              translateX() {
                return x
              },
              translateY() {
                return y
              },
              rotate() {
                return rotate
              },
              opacity() {
                return opacity
              }
            })
          }
        })
    },
    refresh() {
      this.baseScroll.refresh()
    },
    disable() {
      this.baseScroll.disable()
    },
    enable() {
      this.baseScroll.enable()
    },
    handlePullUp() {
      this.loadingBallVisible = true
      this.$emit('pullUp')
    },
    openPullUp() {
      this.baseScroll.openPullUp()
      this.changeEnd = false
    },
    finishPullUp() {
      this.baseScroll.finishPullUp()
      this.loadingBallVisible = false
    },
    closePullUp() {
      this.baseScroll.closePullUp()
      this.loadingBallVisible = true
      this.changeEnd = true
    },
    scrollToElement(el) {
      this.baseScroll.scrollToElement(el, 0, true, true)
    },
    handlePullDown() {
      this.pullDownBeginTime = new Date().getTime()
      this.loadingBallVisible = false
      this.changeEnd = false
      this.$emit('pullDown')
    },
    // 如果请求没有一秒，延迟到1秒后再执行完成下拉
    finishPullDown() {
      const spacingTime = new Date().getTime() - this.pullDownBeginTime
      if (spacingTime < PULLDOWN_SPACING_TIME) {
        setTimeout(() => {
          this.baseScroll.scrollTo(0, 0, 600)
          this.baseScroll.finishPullDown()
        }, PULLDOWN_SPACING_TIME - spacingTime)
      } else {
        this.baseScroll.scrollTo(0, 0, 600)
        this.baseScroll.finishPullDown()
      }
    },
    // 手动触发pullingDown
    _triggerPullingDown() {
      this.baseScroll.disable()
      this.animateByScroll(60)
      this.baseScroll.scrollTo(0, 100, 600)
      // 这里指定minScroll是因为我们手动触发pullingDown，不会触发达到默认的阈值，这时候指定到默认值
      this.baseScroll.scroll.minScrollY = 100
      this.baseScroll.scroll.trigger('pullingDown')
    }
  },
  components: { ScrollBase, LoadingBall }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
// bs内容区域必须高于wrpper才能滚动,写死内容区域最小高度大于wrapper高度，避免内容小于wrapper高度
.scroll-content
  min-height 100.5%
  position relative
  .animation-ul
    top '-90px'
    left 50%
    transform translateX(-50%)
    position absolute
    center()
    .animation-li
      margin-left '30px'
      margin-right '30px'
      will-change transform
      height '1px'
      width '20px'
      background #b6b6b6
</style>

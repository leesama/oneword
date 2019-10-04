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
    :touchEnd="true"
    @touchEnd="touchEnd"
    :scrollEnd="true"
    @scrollEnd="scrollEnd"
    ref="baseScroll"
    :pullUpLoad="pullUpLoad"
    @pullingUp="pullingUp"
    :directionLockThreshold="0"
    :click="false"
  >
    <div class="scroll-content" ref="scroll_content">
      <ul class="animation-ul">
        <li v-for="(item, index) of list" class="animation-li" ref="li" :key="index"></li>
      </ul>
      <slot />
      <LoadingBall :direction="2" v-if="showLodingBall" />
    </div>
  </scroll-base>
</template>

<script>
import LoadingBall from '@components/loading/loading-ball/loading-ball.vue'
import ScrollBase from '@components/scroll/scroll-base/scroll-base.vue'
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
      loadingBallVisible: true,
      animationRuning: true
    }
  },
  props: {
    showLoading: { type: Boolean, default: true },
    pullUpLoad: { type: Boolean, default: false },
    scrollBar: { type: Boolean, default: true },
    showLodingBall: { type: Boolean, default: true }
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    initScroll() {
      this.baseScroll = this.$refs.baseScroll
      if (this.showLoading) {
        this.items = this.$refs.li
        this.baseScroll.disable()
        this.animateByScroll(60)
        this.baseScroll.scrollTo(0, 100, 600)
      }
    },
    scroll(e) {
      let y = e.y
      if (y > 0) {
        // scroll左侧动画
        // 打乱li动画项对应的移动信息的数组，这里是为了实现每次scroll时，顶部的动画都能随机变化移动
        if (!this.items) {
          // 滚动之前将滚动项顺序打乱
          this.list.sort(() => 0.5 - Math.random())
          // dom更新后将其缓存起来
          this.$nextTick(function() {
            this.items = this.$refs.li
          })
        }
        if (this.locked) {
          // 如果加锁了，直接返回    如果 x大于60.将锁取消，之后就会走执行动画的逻辑
          if (y > 60) {
            this.locked = false
          }
          return
        }
        if (
          this.scrollBeginTime &&
          new Date().getTime() - this.scrollBeginTime < 300 &&
          y >= 60
        ) {
          // 如果滚动的距离大于scrollX，加锁
          this.locked = true
          // 把this.scrollBeginTime null作为标记,防止多次触发
          this.scrollBeginTime = null
          this.baseScroll.disable()
          this.animateByScroll(60)
          this.baseScroll.scrollTo(0, 100, 600)
          // 刷新事件触发后,标记为动画运行中
          this.animationRuning = true
          return
        }
        this.animateByScroll(y)
      }
    },
    // 滚动开始前记录当前时间
    beforeScroll() {
      this.scrollBeginTime = new Date().getTime()
    },
    scrollEnd() {
      // 持续的动画执行时，会disable scroll,当scroll结束时，让其启用
      if (!this.baseScroll.isEnabled()) {
        this.baseScroll.enable()
      }
      this.items = null
      // 滚动结束，标记动画结束
      if (this.animationRuning) {
        this.animationRuning = false
      }
    },
    touchEnd(e) {
      const y = e.y
      // 触发刷新事件
      if (y >= 60) {
        this.$emit('refresh')
        this.baseScroll.disable()
        this.baseScroll.scrollBy(0, 0, 0)
        // 刷新事件触发后,标记为动画运行中
        this.animationRuning = true
      }
    },
    // 根据scroll值进行动画
    animateByScroll(val) {
      this.$nextTick(() => {
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
      })
    },
    // 动画执行完毕刷新scroll
    refreshAfterAnimation() {
      if (!this.animationRuning) {
        this.baseScroll.refresh()
      } else {
        // 如果滚动动画在执行中不能直接刷新scroll，会卡死，需要监听动画执行完毕再刷新
        // 监听动画执行完毕状态，动画完毕状态后刷新scroll,取消监听器
        this.cancelWatchAnimation = this.$watch('animationRuning', newV => {
          if (!newV) {
            this.baseScroll.refresh()
            this.cancelWatchAnimation()
          }
        })
      }
    },
    refresh() {
      this.$refs.baseScroll.refresh()
    },
    disable() {
      this.$refs.baseScroll.disable()
    },
    enable() {
      this.$refs.baseScroll.enable()
    },
    pullingUp() {
      this.$emit('pullingUp')
    },
    scrollToElement(el) {
      this.$refs.baseScroll.scrollToElement(el, 0, true, true)
    }
  },
  components: { ScrollBase, LoadingBall }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
// bs内容区域必须高于wrpper才能滚动,写死内容区域最小高度大于wrapper高度，避免内容小于wrapper高度
.scroll-content
  min-height 100.001%
  position relative
  .animation-ul
    top '-100px'
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

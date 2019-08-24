<template>
  <base-scroll
    :observeDom="false"
    :startX="90"
    :probeType="3"
    :listenScroll="true"
    :scrollX="true"
    @scroll="scroll"
    :beforeScroll="true"
    @beforeScroll="beforeScroll"
    :scrollEnd="true"
    @scrollEnd="scrollEnd"
    :touchEnd="true"
    @touchEnd="touchEnd"
    :leftSlip="true"
    @leftSlip="leftSlip"
    ref="baseScroll"
    :bounce="{right:false}"
    :momentum="false"
  >
    <div class="scroll-content" ref="scroll_content">
      <ul ref="itemlist">
        <li v-for="(item, index) of list" :style="{height: item[0] }" ref="li" :key="index"></li>
      </ul>
      <div class="card_container" v-for="item of data" :key="item.time.day">
        <div class="time" ref="time">
          <span>{{item.time.year}}</span>
          <span>/</span>
          <span>{{item.time.month}}</span>
          <span>/</span>
          <span>{{item.time.day}}</span>
        </div>

        <component
          ref="cardList"
          :cardInfo="cardItem"
          v-for="cardItem of item.card"
          :key="cardItem.textcardid"
          :is="componentType(cardItem)"
        ></component>
      </div>
      <loading-ball v-if="loadingBallVisible" />
    </div>
  </base-scroll>
</template>

<script>
import LoadingBall from '@components/loading/loading-ball/loading-ball'
import BaseScroll from '@components/scroll/scroll-base/scroll-base'
import TextCard from '@components/card/card-fixed/card-fixed-text/card-fixed-text'
import MusicCard from '@components/card/card-fixed/card-fixed-music/card-fixed-music'
import TopicCard from '@components/card/card-fixed/card-fixed-topic/card-fixed-topic'
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
      ],
      loadingBallVisible: false
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },

  mounted () {
    // 加载后禁止scroll让滚动条回滚并缓存scroll
    this.fixedScroll()
    // 计算并初始化数据，为滚动动画做准备
    this.initForAnimate()
    // 指定动画进行到结尾处
    this.animateByScroll(scrollX)
    // 当前卡片索引
    this.cardIndex = 0
  },
  methods: {
    initForAnimate () {
      // 每个li容器的高度和li节点缓存到实例上，为了以后计算高度做准备
      this.lastScrollX = 90
      this.itemHeight = this.$refs.itemlist.clientHeight / 13
      // 将dom缓存起来
      this.items = this.$refs.li
    },
    scroll (e) {
      let x = e.x
      if (x > 0) {
        try {
          // scroll左侧动画
          // 之前考虑在beforestart中缓存dom就能确保scroll时dom能缓存好，但是这样每次滑动都会重新计算，影响性能
          // 缓存动画，这里是为了实现每次scroll时，左侧的动画都能随机变化移动
          if (!this.items) {
            // 滚动之前将滚动项顺序打乱
            this.list.sort(() => 0.5 - Math.random())
            // dom更新后将其缓存起来
            this.$nextTick(function () {
              this.items = this.$refs.li
            })
          }
          // 快速滑动判断 begin
          if (this.locked) {
            // 如果加锁了，直接返回    如果 x大于60.将锁取消，之后就会走执行动画的逻辑
            if (x > scrollX) {
              this.locked = false
            }
            return
          }
          // 如果滚动时间小于300ms,不传递scroll的值到动画
          // this.scrollBeginTime 有值说明还没有触发快速滑动
          if (
            this.scrollBeginTime &&
            new Date().getTime() - this.scrollBeginTime < 300 &&
            x >= 40
          ) {
            // 如果滚动的距离大于scrollX，加锁
            this.locked = true
            // 把this.scrollBeginTime null作为标记,防止多次触发
            this.scrollBeginTime = null
            this.baseScroll.disable()
            this.animateByScroll(60)
            this.baseScroll.scrollTo(90, 0, 500)
            this.$emit('refresh')
            return
          }
          // 快速滑动判断 end

          this.animateByScroll(x)
        } catch (error) {}
      }

      // scroll右侧动画
    },
    // 滚动开始前记录当前时间
    beforeScroll () {
      this.scrollBeginTime = new Date().getTime()
    },
    scrollEnd (e) {
      // scrollEnd的时候的e.x值，就是下次scroll的时候的x坐标值
      this.scrollStartX = e.x
      this.items = null
      // 持续的动画执行时，会disable scroll,当scroll结束时，让其启用
      if (!this.baseScroll.isEnabled()) {
        this.baseScroll.enable()
      }
      // 如果数据改变了，刷新bs,必须等到滚动动画执行完毕时再刷新，否则页面会卡住  （scrollEnd就是滚动动画完毕时）
      if (this.dataChanged) {
        this.baseScroll.refresh()
        this.dataChanged = false
      }
    },
    touchEnd (e) {
      const x = e.x
      if (x < 0) {
        const offsetX = x - this.scrollStartX
        const time = new Date().getTime() - this.scrollBeginTime
        if (time < 300 && offsetX > 0) {
          // 右滑动
          const scrollN = this.cardIndex - Math.ceil(offsetX / (this.vw / 10))
          this.cardIndex = scrollN < 0 ? 0 : scrollN
          this.scrollToCardByIndex(this.cardIndex, 1000)
        } else if (time < 300 && offsetX < 0) {
          // 左滑动
          // 要滚动到的card在cardlist中对应的索引
          const scrollN =
            this.cardIndex - Math.ceil(offsetX / (this.vw / 10)) + 1
          this.cardIndex =
            scrollN > this.cardMaxIndex ? this.cardMaxIndex : scrollN
          this.scrollToCardByIndex(this.cardIndex, 1000)
        } else if (offsetX > this.vw / 4) {
          // 右拖动
          const scrollN = this.cardIndex - 1
          this.cardIndex = scrollN < 0 ? 0 : scrollN
          this.scrollToCardByIndex(this.cardIndex)
        } else if (offsetX < -this.vw / 4) {
          // 左拖动
          const scrollN = this.cardIndex + 1
          this.cardIndex =
            scrollN > this.cardMaxIndex ? this.cardMaxIndex : scrollN
          this.scrollToCardByIndex(this.cardIndex)
        } else {
          // 其他情况滚动回原位置
          this.scrollToCardByIndex(this.cardIndex)
        }
      }
      // 触发刷新事件
      if (x >= 60) {
        this.$emit('refresh')
      }
      // if (e.x) {
      // }
    },
    scrollToCardByIndex (index, time = 500) {
      this.baseScroll.scrollToElement(this.cardDomList[index].$el, time, true)
    },
    // 根据scroll值进行动画
    animateByScroll (val) {
      // 小于5不执行动画，是为了防止执行动画时dom还没有缓存好而报错，给一定的缓冲时间

      this.items.forEach((item, index) => {
        const rate = val / (40 + (this.list[index][2] / 13) * 20)
        // 动画的项需要移动的x轴距离
        const x = animationX + this.list[index][4]
        // 动画的项需要移动的y轴距离
        const y =
          this.list[index][2] * this.itemHeight -
          index * this.itemHeight -
          this.list[index][3]
        const rotate = this.list[index][1]
        const opacity = 0.9
        if (x * rate <= x) {
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
        } else {
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
        }
      })
    },
    // 固定的滚动距离
    fixedScroll () {
      // disable： DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。scroll事件不影响，所以回弹的时候，会传递scrollDistance
      this.baseScroll = this.$refs.baseScroll
      this.baseScroll.disable()
      setTimeout(() => {
        this.baseScroll.scrollTo(0, 0, 1000)
      }, 500)
    },
    leftSlip () {
      this.$emit('leftSlip')
      this.loadingBallVisible = true
    },
    componentType (cardInfo) {
      return cardInfo.category === '2000'
        ? 'MusicCard'
        : cardInfo.category === '100002'
          ? 'TopicCard'
          : 'TextCard'
    }
  },
  watch: {
    // data改变时缓存dom和一些信息用于滑动动画
    data () {
      // 左滑
      if (this.loadingBallVisible) {
        this.$nextTick(() => {
          this.cardDomList = this.$refs.cardList
          this.cardMaxIndex = this.cardDomList.length - 1
          this.baseScroll.leftSlipfinish()
          setTimeout(() => {
            this.baseScroll.refresh()
          }, 20)
          this.loadingBallVisible = false
        })
      } else {
        // 刷新
        this.dataChanged = true
        this.$nextTick(() => {
          this.cardDomList = this.$refs.cardList
          this.cardMaxIndex = this.cardDomList.length - 1
          if (!this.vw) {
            this.vw = window.innerWidth
          }
        })
      }
    }
  },
  components: {
    BaseScroll,
    LoadingBall,
    TextCard,
    MusicCard,
    TopicCard
  }
}
</script>
<style lang='stylus' scoped>
.scroll-content
  display inline-flex
  align-items center
  height 100%
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
.card_container
  display inline-flex
  align-items center
.time
  width 140px
  font-family FZZhengHeiS-EL-GB
  display flex
  flex-direction column
  align-items center
  color #b4b4b4
  font-size 30px
  span:nth-child(2n)
    margin 20px 0
</style>
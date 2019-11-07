<template>
  <div class="scroll-x-cards">
    <base-scroll
      :startX="90"
      :probeType="3"
      :listenScroll="true"
      tap="tap"
      :bounceTime="2500"
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
        <div class="card_container" v-for="item of cardList" :key="item.time.day">
          <div class="time" ref="time">
            <span>{{item.time.year}}</span>
            <span>/</span>
            <span>{{item.time.month}}</span>
            <span>/</span>
            <span>{{item.time.day}}</span>
          </div>
          <component
            @cardTap="handleCardTap"
            class="card"
            ref="cardOriginList"
            :cardInfo="cardItem"
            v-for="cardItem of item.card"
            :key="cardItem.textcardid"
            :is="componentType(cardItem)"
          ></component>
        </div>
        <loading-ball v-show="loadingBallVisible" :changeEnd="cardEndVisible" />
      </div>
    </base-scroll>
    <card-container
      @back="handleBack"
      :cardContainerData="cardOriginList"
      :cardTapCardData="cardTapCardData"
      v-if="cardContainerVisible"
    ></card-container>
  </div>
</template>

<script>
import CardContainer from '@components/card-detail/card-detail-container/card-detail-container.vue'
import LoadingBall from '@components/loading/loading-ball/loading-ball'
import BaseScroll from '@components/scroll/scroll-base/scroll-base'
import TextCard from '@components/card/card-fixed/card-fixed-text/card-fixed-text'
import MusicCard from '@components/card/card-fixed/card-fixed-music/card-fixed-music'
const LONG_LINE_HEIGHT = '20px'
const SHORT_LINE_HEIGHT = '10px'
// scroll滚动的距离
const scrollX = 60
// 动画的x轴移动的距离
const animationX = 60

export default {
  name: 'scroll-x',
  data() {
    return {
      // 用来记录每一条动画中的li的长度，需要偏转的角度，位置，x轴偏移量，y轴偏移量
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
      loadingBallVisible: false,
      cardOriginList: [],
      cardEndVisible: false,
      cardContainerVisible: false
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // 加载后禁止scroll
    this.fixedScroll()
    // 计算并初始化数据，为滚动动画做准备
    this.initForAnimate()
    // 指定动画进行到结尾处
    this.animateByScroll(scrollX)
    // yiyan从下向上改变透明度
    this.liBgcolorFixedChange()
    // 当前卡片索引
    this.cardIndex = 0
  },
  activated() {
    if (!this.fixedBeginTime) {
      this.baseScroll.refresh()
    }
  },
  methods: {
    // 从下至上li颜色每50毫秒变化一个  第一次加载li位置是正确排列的，从下至上直接变化就行了
    liBgcolorFixedChange() {
      let i = 13
      this.fixedInterval = setInterval(() => {
        if (i > 0) {
          i--
          this.items[i].style.background = '#4a4a4a'
        } else {
          clearInterval(this.fixedInterval)
          this.fixedInterval = null
        }
      }, 50)
    },
    // 从下至上li颜色每50毫秒变化一个，之后li位置变化了，需要判断之后变化
    liBgcolorAnimateChange() {
      let i = 13
      this.fixedInterval = setInterval(() => {
        if (i > 0) {
          i--
          const needChangeIndex = this.list.findIndex(item => item[2] === i)
          this.items &&
            (this.items[needChangeIndex].style.background = 'rgb(74, 74, 74)')
        } else {
          clearInterval(this.fixedInterval)
          this.fixedInterval = null
        }
      }, 40)
    },
    // 清除li颜色
    clearLiBgcolor() {
      this.items.forEach(i => {
        i.style.background = '#888888'
      })
    },
    initForAnimate() {
      // 每个li容器的高度和li节点缓存到实例上，为了以后计算高度做准备
      this.lastScrollX = 90
      this.itemHeight = this.$refs.itemlist.clientHeight / 13
      // 将dom缓存起来
      this.items = this.$refs.li
    },
    scroll(e) {
      let x = e.x
      if (x > 0) {
        // scroll左侧动画
        // 之前考虑在beforestart中缓存dom就能确保scroll时dom能缓存好，但是这样每次滑动都会重新计算，影响性能
        // 缓存动画，这里是为了实现每次scroll时，左侧的动画都能随机变化移动
        if (!this.items) {
          // 滚动之前将滚动项顺序打乱
          this.list.sort(() => 0.5 - Math.random())
          // dom更新后将其缓存起来
          this.$nextTick(function() {
            this.items = this.$refs.li
            this.clearLiBgcolor()
          })
        }
        // 如果滚动时间小于300ms,不传递scroll的值到动画
        // this.scrollBeginTime 有值说明还没有触发快速滑动
        if (
          this.scrollBeginTime &&
          new Date().getTime() - this.scrollBeginTime < 300 &&
          x >= 40
        ) {
          // 把this.scrollBeginTime null作为标记,防止多次触发
          this.scrollBeginTime = null
          this.baseScroll.disable()
          this.animateByScroll(60)
          this.baseScroll.scroll.minScrollX = 90
          this.baseScroll.scrollTo(90, 0, 520)
          this.liBgcolorAnimateChange()
          this.refreshBeginTime = new Date().getTime()
          this.$emit('refresh')
          return
        }
        // 快速滑动判断 end

        this.animateByScroll(x)
      }

      // scroll右侧动画
    },
    // 滚动开始前记录当前时间
    beforeScroll() {
      this.scrollBeginTime = new Date().getTime()
    },
    scrollEnd(e) {
      const x = e.x
      this.scrollStartX = e.x
      // 滚动结束，标记动画结束
      // 持续的动画执行时，会disable scroll,当scroll结束时，让其启用,刷新scroll
      if (x === 0 && !this.baseScroll.scroll.enabled) {
        this.clearLiBgcolor()
        this.baseScroll.enable()
        this.baseScroll.refresh()
      }
      // scrollEnd的时候的e.x值，就是下次scroll的时候的x坐标值

      this.items = null
    },
    touchEnd(e) {
      const x = e.x
      if (x < 0) {
        const offsetX = x - this.scrollStartX
        const time = new Date().getTime() - this.scrollBeginTime
        if (time < 200 && offsetX > 20) {
          // 右滑动
          const scrollN = this.cardIndex - Math.ceil(offsetX / (this.vw / 10))
          this.cardIndex = scrollN < 0 ? 0 : scrollN
          this.scrollToCardByIndex(this.cardIndex, 1000)
        } else if (time < 200 && offsetX < -20) {
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
        } else if (-this.vw / 4 < offsetX < this.vw / 4) {
          this.scrollToCardByIndex(this.cardIndex)
        } else {
          // 其他情况 (用户在滑动过程中点击)
          for (let i = 0; i < this.cardMaxIndex; i++) {
            const cardToClientLeft = this.cardDomList[i].getBoundingClientRect()
              .left

            // 如果某个卡片距离浏览器左端的距离大于0小于视窗的一半,滚动到该卡片
            if (cardToClientLeft > 0 && cardToClientLeft <= this.vw / 2) {
              this.cardIndex = i
              this.scrollToCardByIndex(this.cardIndex)
              return
            }
            if (cardToClientLeft > this.vw / 2 && cardToClientLeft <= this.vw) {
              this.cardIndex = i - 1
              this.scrollToCardByIndex(this.cardIndex)
              return
            }
          }
        }
      }
      // 触发刷新事件
      if (x >= 60) {
        this.baseScroll.scroll.minScrollX = 90
        this.refreshBeginTime = new Date().getTime()
        this.$emit('refresh')
        this.baseScroll.disable()
        this.liBgcolorAnimateChange()
      }
    },
    scrollToCardByIndex(index, time = 700) {
      this.baseScroll.scrollToElement(this.cardDomList[index], time, true)
    },
    // 根据scroll值进行动画
    animateByScroll(val) {
      // 小于5不执行动画，是为了防止执行动画时dom还没有缓存好而报错，给一定的缓冲时间
      // 遍历每一条li,每一条li应该移动的参数和list数组的每一项对应
      this.items &&
        this.items.forEach((item, index) => {
          const rate = val / (40 + (this.list[index][2] / 13) * 20)
          // 动画的项需要移动的x轴距离
          const x = animationX + this.list[index][4]
          // 动画的项需要移动的y轴距离,需要移动到的位置减去当前位置
          const y =
            this.list[index][2] * this.itemHeight -
            index * this.itemHeight -
            this.list[index][3]
          const rotate = this.list[index][1]
          const opacity = 1
          if (x * rate <= x) {
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
    // 固定的滚动距离
    fixedScroll() {
      // disable： DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。scroll事件不影响，所以回弹的时候，会传递scrollDistance
      this.baseScroll = this.$refs.baseScroll
      this.baseScroll.disable()
      this.fixedBeginTime = new Date().getTime()
    },
    // 监听到左滑，触发左滑事件到上级组件，并显示loadingball
    leftSlip() {
      this.$emit(
        'leftSlip',
        this.cardOriginList[this.cardOriginList.length - 1].datetime
      )
      this.leftSlipping = true
    },
    componentType(cardInfo) {
      return cardInfo.category === '2000' ? 'MusicCard' : 'TextCard'
    },

    cacheDom() {
      this.$nextTick(() => {
        this.cardDomList = Array.from(document.querySelectorAll('.card'))
        this.cardDomList.push(document.querySelector('.endball'))
        this.cardMaxIndex = this.cardDomList.length - 1
        if (!this.vw) {
          this.vw = window.innerWidth
        }
      })
    },
    handleCardTap(i) {
      this.cardTapCardData = i
      this.cardContainerVisible = true
      // 这里需要把bs禁用掉，之后在开启，否则有概率无法移除transform样式
      this.$refs.baseScroll.disable()
      // this.$emit('cardTap', i)
    },
    handleBack(i) {
      this.$refs.baseScroll.enable()
      this.containerCardIndex = i
      this.cardContainerVisible = false
      this.cardIndex = i
      this.scrollToCardByIndex(i, 0)
    },
    disable() {
      this.baseScroll.disable()
    },
    enable() {
      this.baseScroll.enable()
    }
  },

  computed: {
    // 根据时间格式化数据
    cardList() {
      const newData = []
      const map = {}
      for (const i of this.cardOriginList) {
        const time = i.datetime.substring(0, 10)
        if (!map[time]) {
          newData.push({
            time,
            card: [i]
          })
          map[time] = true
        } else {
          for (const j of newData) {
            if (j.time === time) {
              j.card.push(i)
              break
            }
          }
        }
      }
      for (const i of newData) {
        const itime = i.time
        i.time = {
          year: itime.substr(0, 4),
          month: itime.substr(5, 2),
          day: itime.substr(8, 2)
        }
      }
      return newData
    }
  },
  watch: {
    // 这里为了让加载有个延迟的动画效果，使用了一个中间数据cardOriginList
    // data改变时缓存dom和一些信息用于滑动动画
    data(newVal) {
      // 如果新的数据的长度比之前的数据长度小n条，因为后端传过来的数据是n条一次的，小于n条就表示没有数据了，这时取消左滑事件，显示end
      // 左滑
      if (this.leftSlipping) {
        // 如果传入的的数据的长度小于3，显示end,关闭左拉
        this.leftSlipping = null
        if (newVal.length - this.cardOriginList.length < 10) {
          this.cardOriginList = newVal
          this.cardEndVisible = true
          this.$nextTick(() => {
            this.cardDomList = Array.from(document.querySelectorAll('.card'))
            this.cardDomList.push(document.querySelector('.endball'))
            this.cardMaxIndex = this.cardDomList.length - 1
            this.baseScroll.refresh()
            this.baseScroll.leftSlipClose()
          })
        } else {
          this.cardOriginList = newVal
          this.$nextTick(() => {
            this.cardDomList = Array.from(document.querySelectorAll('.card'))
            this.cardDomList.push(document.querySelector('.endball'))
            this.cardMaxIndex = this.cardDomList.length - 1
            this.baseScroll.refresh()
            this.baseScroll.leftSlipfinish()
          })
        }
      } else {
        // 刷新
        // 第一次加载数据如果获取时间小于600毫秒，会延迟一定时间，使数据显示用时达到500ms
        // fixedBeginTime有值，标志这是第一次加载数据
        this.baseScroll.leftSlipOpen()
        this.cardEndVisible = false
        if (this.fixedBeginTime) {
          const dateRequestTime = new Date().getTime() - this.fixedBeginTime
          if (dateRequestTime < 600) {
            setTimeout(() => {
              this.loadingBallVisible = true
              this.cardOriginList = newVal
              this.cacheDom()
              this.baseScroll.scrollTo(0, 0, 2000)
            }, 600 - dateRequestTime)
          } else {
            this.loadingBallVisible = true
            this.cardOriginList = newVal
            this.cacheDom()
            this.baseScroll.scrollTo(0, 0, 2000)
          }
          this.fixedBeginTime = null
        } else {
          // 右滑刷新
          const dateRequestTime = new Date().getTime() - this.refreshBeginTime
          if (dateRequestTime < 600) {
            setTimeout(() => {
              this.cardOriginList = newVal
              this.cacheDom()
              this.baseScroll.scroll.minScrollX = 0
              this.baseScroll.scrollTo(0, 0, 2000)
            }, 600 - dateRequestTime)
          } else {
            this.cardOriginList = newVal
            this.cacheDom()
            this.baseScroll.scroll.minScrollX = 0
            this.baseScroll.scrollTo(0, 0, 2000)
          }
        }
      }
    }
  },
  components: {
    BaseScroll,
    LoadingBall,
    TextCard,
    MusicCard,
    CardContainer
  }
}
</script>
<style lang='stylus' scoped>
.scroll-x-cards
  display inline-flex
  align-items center
  height 100%
.scroll-content
  display inline-flex
  align-items center
  height 100%
ul
  width 250px
  margin-left -200px
  display grid
  grid-template-columns 5px
  grid-template-rows repeat(13, 1fr)
  align-items center
  li
    will-change transform
    opacity 0
    background #888888
    width 5px
    border-radius 1px
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

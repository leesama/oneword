<template>
  <div>
    <scroll-base
      class="card-wrapper"
      v-if="containerVisible"
      :scrollX="true"
      :momentum="false"
      ref="baseScroll"
      :beforeScroll="true"
      @beforeScroll="beforeScroll"
      :scrollEnd="true"
      @scrollEnd="scrollEnd"
      :touchEnd="true"
      @touchEnd="touchEnd"
      :stopPropagation="true"
      :momentumLimitDistance="30"
      :directionLockThreshold="0"
      :tagException="{ className: /(^|\s)process-btn(\s|$)/ }"
    >
      <div class="card-container">
        <component
          :is="componentType(item)"
          :cardInfo="item"
          v-for="(item, index) in cardContainerData"
          ref="cardList"
          :key="index"
          @back="handleBack"
        ></component>
      </div>
    </scroll-base>

    <div class="mask" ref="mask" v-show="maskVisible"></div>
  </div>
</template>

<script>
import ScrollBase from '@components/scroll/scroll-base/scroll-base.vue'
import TextCard from '@components/card-detail/card-detail-text/card-detail-text.vue'
import MusicCard from '@components/card-detail/card-detail-music/card-detail-music'
export default {
  name: 'card-detail-container',
  data() {
    return {
      maskVisible: false,
      containerVisible: false
    }
  },
  props: {
    cardTapCardData: {
      type: Object,
      default() {
        return {}
      }
    },
    cardContainerData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.transitionAnimation()
  },
  methods: {
    transitionAnimation() {
      this.vw = window.innerWidth
      this.vh = window.innerHeight
      // 隐藏头部底部
      document.querySelector('header').style.visibility = 'hidden'
      if (document.querySelector('.detail-footer')) {
        document.querySelector('.detail-footer').style.visibility = 'hidden'
      }
      // 处理betterscroll样式, 必须删除scroll Content中的transition样式，否则z-index会无效，删除之后需要通过position来定位
      this.scrollContentDom = this.$el.parentNode.querySelector(
        '.scroll-content'
      )
      this.transformStyle = this.scrollContentDom.getAttribute('style')

      const tranformLeft = this.transformStyle.split('(')[1].split(')')[0]
      const tranformTop = this.transformStyle.split('(')[2].split(')')[0]
      const interval = setInterval(() => {
        this.scrollContentDom.setAttribute(
          'style',
          `position:relative;left:${tranformLeft};top:${tranformTop};`
        )
      }, 10)
      setTimeout(() => {
        clearInterval(interval)
      }, 50)
      // card置于最前
      const index = this.cardContainerData.findIndex(
        i => i.textcardid === this.cardTapCardData.textcardid
      )
      let cardDom
      if (this.$el.parentNode.querySelector('.scroll-content .flex-text')) {
        cardDom = this.$el.parentNode.querySelectorAll(
          '.scroll-content .flex-text'
        )[index]
        cardDom.style.height = `${cardDom.scrollHeight}px`
        cardDom = cardDom.querySelectorAll('main')[0]
      } else {
        cardDom = this.$el.parentNode.querySelectorAll(
          '.scroll-content .card-container'
        )[index]
      }
      cardDom.setAttribute('style', 'position:fixed;z-index:9999')
      // 显示遮罩
      this.maskVisible = true
      // 遮罩不透明度逐渐增加
      this.$anime({
        targets: this.$refs.mask,
        easing: 'linear',
        opacity: 1,
        duration: 200
      })
      // card移动

      this.$anime({
        targets: cardDom,
        easing: 'linear',
        translateX:
          (this.vw - this.cardTapCardData.width) / 2 -
          this.cardTapCardData.left,
        translateY:
          (this.vh - this.cardTapCardData.height) / 2 -
          this.cardTapCardData.top,
        translateZ: 0,
        duration: 300,
        complete: () => {
          setTimeout(() => {
            // 显示容器
            this.containerVisible = true
            // 遮罩不透明度逐渐减小
            this.$anime({
              targets: this.$refs.mask,
              easing: 'linear',
              opacity: 0,
              duration: 300
            })
            // card不透明度逐渐减小
            this.$anime({
              targets: cardDom,
              easing: 'linear',
              opacity: 0,
              duration: 300,
              complete: () => {
                // 复原header，footer
                document.querySelector('header').style.visibility = 'visible'
                if (document.querySelector('.detail-footer')) {
                  document.querySelector('.detail-footer').style.visibility =
                    'visible'
                }
                // 复原card
                this.$anime.set(cardDom, {
                  translateX() {
                    return 0
                  },
                  opacity() {
                    return 1
                  },
                  translateY() {
                    return 0
                  },
                  translateZ() {
                    return 0
                  }
                })
                cardDom.removeAttribute('style')
                // 关闭遮罩
                this.maskVisible = false
                // 复原betterscroll content
                this.scrollContentDom.setAttribute('style', this.transformStyle)
              }
            })
          }, 100)
        }
      })
    },
    beforeScroll() {
      this.scrollBeginTime = new Date().getTime()
    },
    scrollEnd(e) {
      this.scrollBeginX = e.x
    },
    scrollByIndex(index, time = 500) {
      this.baseScroll.scrollToElement(this.$refs.cardList[index].$el, time)
    },
    _scrollToLeft() {
      this.cardIndex = this.cardIndex > 0 ? this.cardIndex - 1 : 0
      this.scrollByIndex(this.cardIndex)
    },
    _scrollToRight() {
      const maxIndex = this.cardContainerData.length - 1
      this.cardIndex = this.cardIndex < maxIndex ? this.cardIndex + 1 : maxIndex
      this.scrollByIndex(this.cardIndex)
    },
    touchEnd(e) {
      const offsetX = e.x - this.scrollBeginX
      // 左滑动
      if (
        (new Date().getTime() - this.scrollBeginTime < 300 && offsetX > 20) ||
        offsetX > this.touchEndCritical
      ) {
        this._scrollToLeft()
      } else if (
        // 右滑动
        (new Date().getTime() - this.scrollBeginTime < 300 && offsetX < -20) ||
        offsetX < -this.touchEndCritical
      ) {
        this._scrollToRight()
      } else {
        // 其他
        this.scrollByIndex(this.cardIndex, 300)
      }
    },
    handleBack(i) {
      this.$emit('back', this.cardIndex)
      // 复原transform
    },
    componentType(cardInfo) {
      return cardInfo.category === '2000' ? 'MusicCard' : 'TextCard'
    }
  },
  watch: {
    // cardContainer显示之后滚动到对应的card
    containerVisible(newVal) {
      if (newVal === true) {
        this.$nextTick(() => {
          this.cardIndex = this.cardContainerData.findIndex(
            i => i.textcardid === this.cardTapCardData.textcardid
          )
          this.touchEndCritical = window.innerWidth / 4
          this.baseScroll = this.$refs.baseScroll
          this.scrollByIndex(this.cardIndex, 0)
        })
      }
    }
  },
  components: { TextCard, MusicCard, ScrollBase }
}
</script>
<style lang='stylus' scoped>
.mask
  position fixed
  background-color #fefefe
  opacity 0
  top 0
  bottom 0
  left 0
  right 0
  z-index 12
.card-wrapper
  background-color #fefefe
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 999
  .card-container
    display inline-flex
    // align-items center
    height 100%
</style>

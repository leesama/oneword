<template>
  <div class="third-step">
    <the-header @close="handleClose" :transparent="false">
      <template #left>
        <i class="iconfont">&#xe612;</i>
      </template>
      <template #mid>「选择样式」</template>
    </the-header>

    <scroll-base class="main-scroll" ref="scroll">
      <div class="card-main" ref="main">
        <div class="img-wrapper">
          <transition name="img-transition">
            <card-img ref="wordImg" :src="imgSrc" v-if="imgSrc" class="img" :radius="isRadius" />
          </transition>
        </div>

        <div class="content-wrapper" ref="content">
          <component
            class="content"
            :style="fontStyle"
            :is="contentComponent"
            :isCenter="isCenter"
            :content="cardInfo.content"
            :title="cardInfo.title"
            :hasImg="cardInfo.picpath"
            :from="cardInfo.from"
          ></component>
        </div>
      </div>
    </scroll-base>

    <footer>
      <div class="direction-container">
        <div
          class="direction-button"
          :class="{buttonborder:direction===0}"
          @click="handleClickChangeDirection0"
        >
          <div class="top" />
          <div class="li1" />
          <div class="li2" />
        </div>
        <div
          class="direction-button"
          :class="{buttonborder:direction===1}"
          @click="handleClickChangeDirection1"
        >
          <div class="top" />
          <div class="li-container">
            <div class="li1" />
            <div class="li2" />
          </div>
        </div>
      </div>

      <div class="type-container">
        <div
          class="type-button"
          ref="radiusButton"
          :class="{noimgbutton:!imgSrc}"
          @click="handleClickChangeRadius"
        >
          <div class="circle"></div>
        </div>
        <div class="type-button" ref="fontButton" @click="handleClickChangeFontType">
          <span>T</span>
        </div>
        <div
          class="type-button"
          ref="centerButton"
          :class="{noimgbutton:direction===1}"
          @click="handleClickChangeCenter"
        >
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ScrollBase from '@components/scroll/scroll-base/scroll-base'
import CardInfo from '@components/card/card-base/card-base-info/card-base-info'
import CardImg from '@components/card/card-base/card-base-img/card-base-img.vue'
import { CardImgComputed } from '@mixins'
import TheHeader from '@components/detail/the-header/the-header-have-close.vue'
const CardVerticalContent = () =>
  import('@components/card/card-base/card-base-content-vertical/card-base-content-vertical')
const CardHorizontalContent = () =>
  import('@components/card/card-base/card-base-content-horizontal/card-base-content-horizontal')
export default {
  name: 'newword-third-step',
  mixins: [CardImgComputed],
  data() {
    return {
      isRadius: false,
      isCenter: false,
      direction: 0,
      fontCode: 0
    }
  },
  props: { cardInfo: { type: Object } },
  methods: {
    handleClose() {
      this.$emit('closeThirdStep')
    },
    handleClickChangeDirection0() {
      this.direction = 0
    },
    handleClickChangeDirection1() {
      this.direction = 1
    },
    handleClickChangeRadius(e) {
      this._clickAnimation(this.$refs.radiusButton)
      this.isRadius = !this.isRadius
    },
    handleClickChangeFontType(e) {
      this._clickAnimation(this.$refs.fontButton)
      this.fontCode = this.fontCode === 4 ? 0 : this.fontCode + 1
    },
    handleClickChangeCenter(e) {
      this._clickAnimation(this.$refs.centerButton)
      this.isCenter = !this.isCenter
    },
    _clickAnimation(target) {
      this.$anime.set(target, {
        boxShadow: '0 0 10px white'
      })
      this.$anime({
        targets: target,
        boxShadow: '0 0 10px white',
        duration: 300,
        complete() {
          target.removeAttribute('style')
        }
      })
    }
  },
  computed: {
    contentComponent() {
      return this.direction === 0
        ? 'CardHorizontalContent'
        : 'CardVerticalContent'
    },
    fontStyle() {
      let fontFamily
      switch (this.fontCode) {
        case 0:
          fontFamily = 'FZQingKeBenYueSongS-R-GB'
          break
        case 1:
          fontFamily = 'FZSongYi-Z13S'
          break
        case 2:
          fontFamily = 'FZZhengHeiS-EL-GB'
          break
        case 3:
          fontFamily = 'FZShuSong-Z01S'
          break
        case 4:
          fontFamily = 'FZSuXinShiLiuKaiS-R-GB'
          break
        default:
          return
      }

      return { fontFamily }
    }
  },
  updated() {
    this.$refs.scroll.refresh()
  },
  components: {
    TheHeader,
    ScrollBase,
    CardImg,
    CardVerticalContent,
    CardHorizontalContent,
    CardInfo
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.third-step
  position absolute
  filled()
  display flex
  flex-direction column
  background-color #fefefe
  .main-scroll
    flex 1
    .card-main
      min-height 100.001%
      padding 30px
      .img-wrapper
        height 666px
      .content-wrapper
        padding-left 50px
        padding-right 50px
        margin-bottom 200px
      .img
        height 666px
      & >>> .radius
        border-radius 50%
        height 580px
        width 580px
      .content >>> .titlecontent
        height auto
        overflow visible
        .content
          min-height 30vw
        &:after
          display none
  &>footer
    position relative
    height 245px
    background-color #4a4a4a
    center()
    .direction-container
      top -190px
      display flex
      position absolute
      .direction-button
        padding 3px
        box-shadow 0 0 30px #d8d8d8
        margin-right 66px
        border 3px solid #d8d8d8
        background-color #fefefe
        width 102px
        height 138px
        .top
          width 102px
          height 50px
          background-color #e7e7e7
        &:first-child
          .li1
            height 10px
            width 50px
            background-color #d8d8d8
            margin-top 14px
          .li2
            height 10px
            width 70px
            margin-top 11px
            background-color #d8d8d8
        &:last-child
          .li-container
            display flex
            justify-content center
            align-items flex-start
            margin-top 8px
            .li1
              width 10px
              height 50px
              background-color #d8d8d8
              margin-right 10px
            .li2
              width 10px
              height 73px
              background-color #d8d8d8
      .direction-button:last-child
        margin-right 0px
      .buttonborder
        border 1px solid #9b9b9b
    .type-container
      center()
      .type-button
        margin-right 60px
        height 122px
        width 122px
        background-color #fefefe
        border-radius 50%
        &:last-child
          margin-right 0px
        center()
        .circle
          width 55px
          height 55px
          border-radius 50%
          border 7px solid #4a4a4a
        span
          color #4a4a4a
          font-family FZShuSong-Z01S
          font-weight bold
          font-size 65px
        ul
          li
            height 9px
            margin-bottom 8px
            background-color #4a4a4a
          li:nth-child(1)
            width 38px
          li:nth-child(2)
            width 58px
          li:nth-child(3)
            width 48px
          li:nth-child(4)
            margin-bottom 0px
            width 65px
      .noimgbutton
        background-color #a4a4a4
        pointer-events none
</style>

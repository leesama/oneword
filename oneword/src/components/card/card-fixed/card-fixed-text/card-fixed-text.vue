<template>
  <div class="card" ref="card">
    <header class="textheader">
      <card-img :src="imgSrc" v-if="imgSrc" :radius="isRadius" />
    </header>

    <main>
      <component
        :isRadius="isRadius"
        :style="fontStyle"
        :is="contentComponent"
        :isCenter="isCenter"
        :content="content"
        :title="title"
        :hasImg="imgSrc"
        :from="from"
      ></component>
      <card-info :type="type" :original="original" :username="username" :bookname="bookname" />
    </main>
    <footer>
      <card-footer :replycnt="replycnt" :collectcnt="collectcnt" :likecnt="likecnt" />
    </footer>
  </div>
</template>
<script>
import {
  cardFixedPropsMethods,
  cardFooterComputed,
  CardImgComputed
} from '@mixins'
import CardImg from '@components/card/card-base/card-base-img/card-base-img'
import CardFooter from '@components/card/card-base/card-base-footer/card-base-footer'
import CardInfo from '@components/card/card-base/card-base-info/card-base-info'
import CardVerticalcontent from '@components/card/card-base/card-base-content-vertical/card-base-content-vertical'
import CardHorizontalcontent from '@components/card/card-base/card-base-content-horizontal/card-base-content-horizontal'
export default {
  name: 'card-fixed',
  mixins: [cardFixedPropsMethods, cardFooterComputed, CardImgComputed],
  computed: {
    // class相关属性begin

    // 内容是否居中居中
    isCenter () {
      return this.cardInfo.type.substr(10, 1) === '0'
    },
    // 图片是否为圆形
    isRadius () {
      return this.cardInfo.type.substr(4, 1) === '0'
    },
    // 是否竖向排列文字
    contentComponent () {
      return this.cardInfo.type.substr(6, 1) === '0'
        ? 'CardVerticalcontent'
        : 'CardHorizontalcontent'
    },
    // class相关属性end

    // style相关属性begin
    fontStyle () {
      let fontFamily
      const type = this.cardInfo.type
      const fontPrefix = type.substr(2, 1)
      const fontSuffix = type.substr(8, 1)
      if (fontPrefix === 'v') {
        switch (fontSuffix) {
          case '0':
            fontFamily = 'FZQingKeBenYueSongS-R-GB'
            break
          case '1':
            fontFamily = 'FZSongYi-Z13S'
            break
          default:
            return
        }
      } else {
        switch (fontSuffix) {
          case '0':
            fontFamily = 'FZQingKeBenYueSongS-R-GB'
            break
          case '1':
            fontFamily = 'FZSongYi-Z13S'
            break
          case '2':
            fontFamily = 'FZZhengHeiS-EL-GB'
            break
          case '3':
            fontFamily = 'FZShuSong-Z01S'
            break
          default:
            return
        }
      }
      return { fontFamily }
    },
    // style相关属性end

    type () {
      switch (this.cardInfo.category) {
        case '0':
          return '文字'
        case '2000':
          return 'music'
        case '100002 ':
          return 'topic'
        default:
          return '文字'
      }
    },
    username () {
      return this.cardInfo.creator.username
    },
    content () {
      return this.cardInfo.content
        .replace(/\n/g, '<br>')
        .replace(/\r/g, '&nbsp;')
    },
    bookname () {
      return this.cardInfo.originbook.bookname
    },
    original () {
      return this.cardInfo.original
    }
  },
  watch: {
    // scrollX () {
    //   const cw = this.$refs.card.clientWidth
    //   const vw = window.innerWidth
    //   const cardLeftToClientRight =
    //     vw - this.$refs.card.getBoundingClientRect().right
    //   const cardRightToClientLeft =
    //     this.$refs.card.getBoundingClientRect().left + cw
    //   // card距离右边距距离 0-200之间，逐渐放大
    //   if (cardLeftToClientRight >= 0 && cardLeftToClientRight < 200) {
    //     const rate = cardLeftToClientRight / 200
    //     // 此时不变
    //     this.$anime.set(this.$refs.card, {
    //       scale () {
    //         return 0.95 + 0.05 * rate
    //       }
    //     })
    //     return
    //   }
    //   // card距离右边距距离 0-200之间，逐渐放大
    //   if (cardRightToClientLeft >= 0 && cardRightToClientLeft < 200) {
    //     const rate = cardRightToClientLeft / 200
    //     this.$anime.set(this.$refs.card, {
    //       scale () {
    //         return 0.95 + 0.05 * rate
    //       }
    //     })
    //   }
    // }
  },
  components: {
    CardFooter,
    CardImg,
    CardInfo,
    CardVerticalcontent,
    CardHorizontalcontent
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.border
  &:before
    border-color #d3d3d3
  &:after
    border-color #d3d3d3
.card
  display flex
  margin-right 100px
  box-shadow 0 0 60px 20px #d3d3d3
  width 860px
  height 1535px
  background #fefefe
  display flex
  flex-direction column
  header
    height 485px
  main
    flex 1
    display flex
    flex-direction column
    justify-content space-between
    .content
      .verticalnoimg
        margin-top -100px
      .vertical
        // margin-top -150px
        writing-mode vertical-rl
        text-align left
        display flex
        vertical-align top
        margin-bottom 150px
        flex-direction column
        justify-content space-around
        .cardtext
          line-height 90px
          margin-left 50px
          height auto
          padding-right 50px
          &:before
            margin-left 50px
            display inline-block
            content ''
            width 20px
            height 20px
            background-color #ffffff
            border-radius 50%
            border 3px solid red
            margin-bottom 17px
            color red
          &:after
            content ''
            font-weight bold
            position absolute
            display block
            height 500px
            width 90px
            top 0
            left 0
            background linear-gradient(to right, red)
        .title
          padding-right 20px
          ellipsis()
          height 100%
      .cardtextnotitle
        margin-top 45px
  .border-top
    &:before
      width 828px
      margin-left 16px
  footer
    height 105px
</style>

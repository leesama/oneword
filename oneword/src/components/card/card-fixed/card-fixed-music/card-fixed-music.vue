<template>
  <div class="card-wrapper" ref="card">
    <div class="card-container">
      <header class="textheader" @tap="handleTap">
        <card-img :src="imgSrc" :radius="true" />
      </header>
      <main @tap="handleTap">
        <p>{{title}}</p>
        <p>{{from}}</p>
        <music-control :musicSrc="musicSrc" :imgSrc="imgSrc" :cardInfo="cardInfo" />
      </main>
      <footer>
        <card-footer
          :replycnt="replycnt"
          :collectcnt="collectcnt"
          :likecnt="likecnt"
          :liked="liked"
          @replyClick="handleReplyClick"
          @likeClick="handleLikeClick"
        />
      </footer>
    </div>
  </div>
</template>
<script>
import { cardFooterComputed, CardImgComputed } from '@mixins'
import { cardCommon } from '@mixins/cardCommon.js'
import MusicControl from '@components/music/music-player-control/music-player-control'
import CardImg from '@components/card/card-base/card-base-img/card-base-img'
import CardFooter from '@components/card/card-base/card-base-footer/card-base-footer'
export default {
  name: 'card-fixed',
  mixins: [cardCommon, cardFooterComputed, CardImgComputed],
  components: {
    CardFooter,
    CardImg,
    MusicControl
  },

  computed: {
    musicSrc() {
      return this.cardInfo.musicurl
    }
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
.card-wrapper
  width 860px
  margin-right 100px
  height 1535px
  .card-container
    display flex
    box-shadow 0 0 60px 20px #d3d3d3
    width 860px
    height 1535px
    background #fefefe
    display flex
    flex-direction column
    header
      margin-top 146px
      height 485px
    main
      normalFont()
      flex 1
      margin-top 135px
      text-align center
      & p:first-child
        font-size 45px
        font-weight bolder
      & p:nth-child(2)
        margin-top 40px
        font-size 35px
        color #9b9b9b
        margin-bottom 340px
    .border-top
      &:before
        width 828px
        margin-left 16px
    footer
      height 105px
</style>

<template>
  <div class="music-container">
    <scroll-y :firstLoadPullDown="false" :scrollBar="false">
      <card-header
        :smallavatar="smallavatar"
        :dateTime="dateTime"
        :username="username"
        :type="type"
      />
      <card-img :src="imgSrc" class="img" />
      <p class="title">{{title}}</p>
      <p class="from" :class="classBottom">{{from}}</p>
      <process-bar :musicSrc="musicSrc" />
      <div class="music-control-wrapper">
        <music-control
          :musicSrc="musicSrc"
          :imgSrc="imgSrc"
          :cardInfo="cardInfo"
          class="music-control"
        />
      </div>
    </scroll-y>
    <card-footer
      @backClick="handlebackClick"
      :collectcnt="collectcnt"
      :likecnt="likecnt"
      :replycnt="replycnt"
    ></card-footer>
  </div>
</template>

<script>
import CardFooter from '@components/card-detail/card-detail-base/card-detail-footer/card-detail-footer'
import MusicControl from '@components/music/music-player-control/music-player-control.vue'
import ProcessBar from '@components/music/music-process-bar/music-process-bar.vue'
import ScrollY from '@components/scroll/scroll-y/scroll-y'
import CardImg from '@components/card/card-base/card-base-img/card-base-img.vue'
import { cardDetailPropsComputed, cardFooterComputed } from '@mixins'
import CardHeader from '@components/card-detail/card-detail-base/card-detail-header/card-detail-header.vue'
export default {
  name: 'card-detail-music',
  mixins: [cardDetailPropsComputed, cardFooterComputed],
  computed: {
    // 在pwa和非pwa模式下设定不同的class
    classBottom() {
      return window.screen.height > document.body.clientHeight
        ? 'notpwa'
        : 'pwa'
    }
  },
  components: {
    CardHeader,
    ScrollY,
    CardImg,
    ProcessBar,
    MusicControl,
    CardFooter
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.music-container
  normalFont()
  width 100vw
  height 100%
  .img
    height 950px
    &>>>.radius
      height 645px
      width 645px
  .title
    center()
    font-size 51px
    color #000000
    font-weight bold
    margin-bottom 30px
  .from
    color #9b9b9b
    font-weight 400
    font-size 37px
    center()
  .notpwa
    margin-bottom 50px
  .pwa
    margin-bottom 350px
  .music-control-wrapper
    display flex
    justify-content center
</style>

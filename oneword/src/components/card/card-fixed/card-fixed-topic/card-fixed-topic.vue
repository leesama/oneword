<template>
  <div class="card" ref="card">
    <header class="textheader">
      <card-img :src="imgSrc" :radius="true" />
    </header>
    <main>
      <p>{{title}}</p>
      <p>{{from}}</p>
      <music-player />
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
import MusicPlayer from '@components/music/music-player/music-player.vue'
import CardImg from '@components/card/card-base/card-base-img/card-base-img'
import CardFooter from '@components/card/card-base/card-base-footer/card-base-footer'
export default {
  name: 'card-fixed',
  mixins: [cardFixedPropsMethods, cardFooterComputed, CardImgComputed],
  computed: {},
  components: {
    CardFooter,
    CardImg,
    MusicPlayer
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
    margin-top 146px
    height 485px
  main
    font-family FZZhengHeiS-EL-GB
    flex 1
    margin-top 135px
    text-align center
    & p:first-child
      font-size 40px
      font-weight bolder
    & p:nth-child(2)
      margin-top 40px
      font-size 28px
      color #9b9b9b
      margin-bottom 340px
  .border-top
    &:before
      width 828px
      margin-left 16px
  footer
    height 105px
</style>

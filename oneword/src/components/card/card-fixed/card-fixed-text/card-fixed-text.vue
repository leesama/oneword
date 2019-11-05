<template>
  <div class="card-wrapper" ref="card">
    <div class="card-container">
      <header class="textheader" @tap="handleTap">
        <card-img :src="imgSrc" v-if="imgSrc" :radius="isRadius" />
      </header>
      <main @tap="handleTap">
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
import { cardFooterComputed, CardImgComputed, CardTextComputed } from '@mixins'
import { cardCommon } from '@mixins/cardCommon.js'
import CardImg from '@components/card/card-base/card-base-img/card-base-img'
import CardFooter from '@components/card/card-base/card-base-footer/card-base-footer'
import CardInfo from '@components/card/card-base/card-base-info/card-base-info'
const CardVerticalContent = () =>
  import('@components/card/card-base/card-base-content-vertical/card-base-content-vertical')
const CardHorizontalContent = () =>
  import('@components/card/card-base/card-base-content-horizontal/card-base-content-horizontal')
export default {
  name: 'card-fixed',
  mixins: [cardCommon, cardFooterComputed, CardImgComputed, CardTextComputed],
  components: {
    CardFooter,
    CardImg,
    CardInfo,
    CardVerticalContent,
    CardHorizontalContent
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
      height 485px
    main
      flex 1
      display flex
      flex-direction column
      justify-content space-between
    footer
      height 105px
</style>

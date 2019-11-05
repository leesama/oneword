<template>
  <div class="flex-text" ref="card">
    <header>
      <img
        v-lazy="cardInfo.creator.smallavatar"
        class="user-img"
        :key="cardInfo.creator.smallavatar"
        alt
        v-if="cardInfo.creator.smallavatar"
      />
      <div class="user-img" v-else></div>
      <div class="title">
        <p>
          <span>{{cardInfo.creator.username}}</span>
          <span>{{cardInfo.originbook.bookname}}</span>
        </p>
        <p>
          <span>{{cardInfo.datetime.substr(10,6)}}</span>
        </p>
      </div>
    </header>
    <main @click="handleTap">
      <card-img :src="imgSrc" v-if="imgSrc" :radius="isRadius" />

      <card-content
        :class="{hidemoremask:moreMaskHidden}"
        ref="content"
        :isCenter="true"
        :content="content"
        :style="fontStyle"
        :from="from"
      ></card-content>
      <card-info :type="type" :original="original" :bookname="bookname" />
      <card-footer
        :replycnt="replycnt"
        :collectcnt="collectcnt"
        :likecnt="likecnt"
        @replyClick="handleReplyClick"
        @likeClick="handleLikeClick"
      />
    </main>
  </div>
</template>

<script>
import { CardTextComputed, CardImgComputed, cardFooterComputed } from '@mixins'
import { cardCommon } from '@mixins/cardCommon.js'
import CardFooter from '../../card-base/card-base-footer/card-base-footer.vue'
import CardInfo from '../../card-base/card-base-info/card-base-info.vue'
import CardContent from '../../card-base/card-base-content-horizontal/card-base-content-horizontal'
import CardImg from '../../card-base/card-base-img/card-base-img.vue'
export default {
  name: 'card-flex-text',
  mixins: [CardTextComputed, CardImgComputed, cardFooterComputed, cardCommon],
  data() {
    return {
      moreMaskHidden: true
    }
  },
  props: {
    cardInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    // 如果内容区区块高度大于设定的最大高度，就不隐藏遮罩伪类
    // 61.191626 指的 61.191626vw
    if (
      this.$refs.content.$el.querySelector('.content').clientHeight >
      Math.floor((window.innerWidth / 100) * 61.191626)
    ) {
      this.moreMaskHidden = false
    }
  },
  components: { CardImg, CardContent, CardFooter, CardInfo }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.flex-text
  box-sizing border-box
  padding-bottom 105px
  header
    display flex
    margin-bottom 15px
    .user-img
      width 96px
      height 96px
      border-radius 50%
      box-shadow 0 0 10px #c9c9c9
      margin-left 60px
      margin-right 30px
    .title
      &>p:first-child
        color #4a4a4a
        font-size 40px
        margin-top 10px
        margin-bottom 18px
        &>span:last-child
          margin-left 41px
          colorBlue()
      &>p:nth-child(2)
        colorBlue()
        font-size 30px
  main
    box-shadow 0 0 50px #dedcdc
    width 936px
    border-radius 8px
    margin-left 185px
    background-color #fefefe
    display flex
    flex-direction column
    .imgwrapper
      height 526px
    .imgwrapper >>>.radius
      margin-top 50px
      height 470px
      width 470px
    &>>> .container
      margin-bottom 75px
      .titlecontent
        height auto
        max-height 760px
      .noimg
        margin-top 0px
        margin-bottom 0px
      .notitle
        padding-top 0px
      .notitleimg
        padding-top 0px
        margin-top 0px
        margin-bottom 0px
  .hidemoremask >>> .titlecontent::after
    background none
</style>

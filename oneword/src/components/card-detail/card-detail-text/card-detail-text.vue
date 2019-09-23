<template>
  <div class="text-container">
    <scroll-y ref="scrollY" :showLoading="false" :scrollBar="false" :showLodingBall="false">
      <card-header
        :smallavatar="smallavatar"
        :dateTime="dateTime"
        :username="username"
        :type="type"
      />
      <div class="card-main" ref="main">
        <div class="img-wrapper">
          <card-img :src="imgSrc" v-if="imgSrc" class="img" :radius="isRadius" />
        </div>

        <div class="content-wrapper" ref="content">
          <component
            class="content"
            :style="fontStyle"
            :is="contentComponent"
            :isCenter="isCenter"
            :content="content"
            :title="title"
            :hasImg="imgSrc"
            :from="from"
          ></component>
        </div>
      </div>
    </scroll-y>
    <card-info class="info" :type="type" :original="original" />
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
import ScrollY from '@components/scroll/scroll-y/scroll-y'
import CardInfo from '@components/card/card-base/card-base-info/card-base-info'
import CardImg from '@components/card/card-base/card-base-img/card-base-img.vue'
import {
  cardDetailPropsComputed,
  cardFooterComputed,
  CardTextComputed
} from '@mixins'
import CardHeader from '@components/card-detail/card-detail-base/card-detail-header/card-detail-header.vue'
const CardVerticalContent = () =>
  import('@components/card/card-base/card-base-content-vertical/card-base-content-vertical')
const CardHorizontalContent = () =>
  import('@components/card/card-base/card-base-content-horizontal/card-base-content-horizontal')
export default {
  name: 'card-detail-text',
  mixins: [cardDetailPropsComputed, cardFooterComputed, CardTextComputed],
  updated() {
    // 数据更新后刷新scroll
    // this.$refs.scrollY.refresh()
  },
  mounted() {
    setTimeout(() => {
      if (
        !this.imgSrc &&
        this.$refs.content.clientHeight > (window.innerHeight * 2) / 5
      ) {
        this.$refs.main.style.marginTop = '-40.257vw'
        this.$refs.scrollY.refresh()
      }
    }, 10)
  },
  components: {
    CardHeader,
    ScrollY,
    CardImg,
    CardFooter,
    CardVerticalContent,
    CardHorizontalContent,
    CardInfo
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.text-container
  normalFont()
  width 100vw
  height 100%
  box-sizing border-box
  padding-bottom 132px
  .card-main
    padding 30px
    .img-wrapper
      height 666px
    .content-wrapper
      padding-left 50px
      padding-right 50px
    .img
      height 666px
    & >>> .radius
      border-radius 50%
      height 580px
      width 580px
    .content >>> .titlecontent
      height auto
      overflow visible
      &:after
        display none
  .cardinfo
    normalFont()
    font-size 40px
    box-sizing border-box
    position fixed
    bottom 163px
    width 100vw
    align-items flex-end
    padding-right 39px
    color #b3b3b3
</style>

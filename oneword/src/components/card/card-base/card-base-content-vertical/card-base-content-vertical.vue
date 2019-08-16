<template>
  <div class="container">
    <div class="titlecontent" :class="adjustPositionClass">
      <p class="content">
        <span v-if="title" class="title">{{title}}</span>
        <span v-html="content"></span>
      </p>
    </div>
    <card-from :from="from" v-if="from" />
  </div>
</template>

<script>
import CardFrom from '@components/card/card-base/card-base-from/card-base-from'
import { cardContentProps } from '@mixins'
export default {
  name: 'card-base-content-vertical',
  mixins: [cardContentProps],
  computed: {
    adjustPositionClass () {
      return [
        { imgradius: this.isRadius && this.hasImg },
        { noimg: !this.hasImg },
        { hastitle: this.title }
      ]
    }
  },
  components: { CardFrom }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.container
  margin 61px 48px 0px 48px
  // 130
  word-break break-all
  white-space normal
  line-height 78px
  font-size 44px
  .titlecontent
    center()
    box-sizing border-box
    width 100%
    writing-mode vertical-rl
    text-align left
    position relative
    height 590px
    .content
      overflow hidden
      max-width 610px
      position relative
      padding-right 200px
      margin-right -200px
      // margin-right 90px
      .title
        position absolute
        top 200px
        right 120px
        // margin-left 50px
        font-size 50px
        height 100%
      &:before
        margin-left 7px
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
      padding-bottom 100%
      content ''
      font-weight bold
      position absolute
      display block
      height 71px
      width 90px
      bottom 0
      left 71px
      background linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))
  .hastitle
    margin-left -50px
  .noimg
    height 800px
    margin-top -210px
  .imgradius
    margin-top -30px
    margin-bottom 30px
</style>

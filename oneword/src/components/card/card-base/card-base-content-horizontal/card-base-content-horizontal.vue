<template>
  <div class="container">
    <div class="titlecontent" :class="[{center:isCenter},containerClass]">
      <p v-if="title" class="title">{{title}}</p>
      <p>
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
  name: 'card-base-content-horizontal',
  mixins: [cardContentProps],
  computed: {
    containerClass () {
      return !this.hasImg && !this.title
        ? 'notitleimg'
        : !this.hasImg
          ? 'noimg'
          : !this.title
            ? 'notitle'
            : ''
    },
    fromp () {
      return this.from ? `- ${this.from} -` : ''
    }
  },

  components: { CardFrom }
}
</script>
<style lang='stylus' scoped>
.container
  margin 61px 70px 0 61px
  word-break break-all
  white-space normal
  line-height 70px
  font-family FZSongYi-Z13S
  font-size 44px
  .titlecontent
    box-sizing border-box
    position relative
    height 590px
    overflow hidden
    // margin-bottom 50px
    .title
      overflow hidden
      font-size 50px
      height 71px
      margin-top 50px
      margin-bottom 44px
    &:after
      padding-left 100%
      content ''
      font-weight bold
      position absolute
      display block
      height 71px
      width 50px
      bottom 0
      right 0
      background linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))
.center
  text-align center
.noimg
  margin-bottom 200px
.notitle
  padding-top 50px
.notitleimg
  padding-top 50px
  margin-bottom 300px
</style>

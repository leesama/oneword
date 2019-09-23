<template>
  <div class="card-footer border-top">
    <collect-button :number="collectcnt" class="button" @click="handleCollectClick" />
    <reply-button :number="replycnt" class="button" @click="handleReplyClick" />
    <like-button :number="likecnt" class="button" @click="handleLikeClick" />
  </div>
</template>

<script>
import CollectButton from '@components/button/button-collect/button-collect.vue'
import ReplyButton from '@components/button/button-reply/button-reply'
import LikeButton from '@components/button/button-like/button-like'
export default {
  name: 'card-base-footer',
  props: {
    replycnt: {
      type: Number,
      default: 0
    },
    collectcnt: {
      type: Number,
      default: 0
    },
    likecnt: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleCollectClick() {
      this.$emit('collectClick')
    },
    handleReplyClick() {
      this.$emit('replyClick')
    },
    handleLikeClick() {
      this.$emit('likeClick')
    }
  },
  components: { CollectButton, ReplyButton, LikeButton }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.card-footer
  height 107px
  normalFont()
  font-size 30px
  width 100%
  display grid
  grid-template-columns repeat(3, 1fr)
  align-items center
  justify-items center
  // 这里直接设置高度而不使用grid-template-rows 是因为经测试stylus-px-to-relative-unit插件不会转换grid-template-rows的px高度
  // height 100%
  div
    color #9b9b9b
    i
      font-size 40px
      color #9b9b9b
      margin-right 10px
  .button
    color #9b9b9b
    & >>>i
      color #9b9b9b
      font-weight normal
    & >>> span
      font-size 28px
</style>

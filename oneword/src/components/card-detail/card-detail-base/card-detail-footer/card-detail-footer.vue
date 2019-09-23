<template>
  <div class="footer">
    <back-button @click="handleBackClick" />
    <collect-button :number="collectcnt" />
    <reply-button :number="replycnt" />
    <like-button :number="likecnt" />
    <div class="share-wrapper">
      <share-button />
    </div>
    <dots-button />
  </div>
</template>

<script>
import BackButton from '@components/button/button-back/button-back.vue'
import CollectButton from '@components/button/button-collect/button-collect'
import ReplyButton from '@components/button/button-reply/button-reply'
import LikeButton from '@components/button/button-like/button-like'
import ShareButton from '@components/button/button-share/button-share'
import DotsButton from '@components/button/button-3dot/button-3dot'
export default {
  name: 'card-detail-footer',
  mounted() {},
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
    handleBackClick() {
      this.$emit('backClick')
    }
  },
  components: {
    BackButton,
    CollectButton,
    ReplyButton,
    LikeButton,
    ShareButton,
    DotsButton
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.footer
  box-sizing border-box
  padding-left 20px
  padding-right 20px
  background-color #fefefe
  display flex
  align-items center
  position fixed
  bottom 0
  height 132px
  width 100vw
  color #4a4a4a
  box-shadow 0px 0 80px -5px #ededed
  .share-wrapper
    height 100%
    flex 1
    display flex
    align-items center
    justify-content flex-end
    font-size 50px
    font-weight bold
    .share-btn
      height 100%
      center()
      width 200px
</style>

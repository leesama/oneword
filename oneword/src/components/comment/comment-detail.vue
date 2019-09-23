<template>
  <div class="comment-detail" @tap="handleContentClick">
    <div class="avatar">
      <img :src="commentInfo.creator.smallavatar" alt />
    </div>
    <div class="comment-content">
      <div class="info">
        <div class="info-left">
          <p class="username">
            {{commentInfo.creator.username}}
            <span v-if="receiverName">
              <span class="replywords">回复</span>
              {{receiverName.username}}
            </span>
          </p>
          <p class="time">{{commentInfo.datetime.substr(10,6)}}</p>
        </div>
        <div class="info-right">
          <thumbs-button :number="commentInfo.likecnt" @click="handleClick" :like="like" />
        </div>
      </div>
      <div class="content" ref="content">
        <p ref="innerContent">{{commentInfo.content}}</p>
      </div>
      <p class="more" v-if="moreVisible" @click.stop="handleMoreClick">...更多</p>
    </div>
  </div>
</template>

<script>
import ThumbsButton from '@components/button/button-thumbs-up/button-thumbs-up.vue'
const REQUESTURL = '/likecomment'
export default {
  name: 'comment-detail',
  data() {
    return {
      moreVisible: false
    }
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    like: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.initMoreVisible()
  },
  methods: {
    initMoreVisible() {
      const el = this.$refs.content
      this.moreVisible = el.clientHeight < el.scrollHeight
    },
    handleClick() {},
    handleContentClick() {
      this.$emit('contentClick', this.commentInfo.commentid)
    },
    handleMoreClick() {
      this.moreVisible = false
      this.$anime({
        targets: this.$refs.content,
        maxHeight: this.$refs.innerContent.clientHeight,
        duration: '100',
        easing: 'easeOutQuad',
        complete: () => {
          // 动画执行完毕通知scroll刷新页面
          this.$emit('moreClick')
        }
      })
    }
  },
  computed: {
    receiverName() {
      return this.commentInfo.receiver ? this.commentInfo.receiver : false
    }
    // isOverflowing() {
    //   var element = this.$refs.content
    //   return (
    //     element.offsetHeight < element.scrollHeight ||
    //     element.offsetWidth < element.scrollWidth
    //   )
    // }
  },
  components: { ThumbsButton }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.comment-detail
  color #6e6e6e
  display flex
  padding-top 36px
  padding-bottom 58px
  border-bottom 1px solid $Gray
  .avatar
    height 96px
    width 96px
    margin-right 26px
    img
      border-radius 50%
      height 100%
      width 100%
      center()
  .comment-content
    margin-top 5px
    flex 1
    .info
      display flex
      justify-content space-between
      .info-left
        .username
          colorBlue()
          margin-bottom 23px
        .time
          font-size 30px
          margin-bottom 24px
      .info-right
        padding-right 40px
    .content
      max-height 1000px
      overflow hidden
      line-height 63px
      font-size 43px
      padding-right 80px
    .more
      margin-top 20px
      colorBlue()
</style>

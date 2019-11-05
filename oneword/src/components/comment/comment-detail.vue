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
          <p class="time">{{time}}</p>
        </div>
        <div class="info-right">
          <thumbs-button :number="likecnt" @click="handleThumbsClick" :like="liked" />
        </div>
      </div>
      <div class="content" ref="content">
        <p ref="innerContent" v-html="commentInfo.content" />
      </div>
      <p class="more" v-if="moreVisible" @click.stop="handleMoreClick">...更多</p>
    </div>
  </div>
</template>

<script>
import ThumbsButton from '@components/button/button-thumbs-up/button-thumbs-up.vue'
export default {
  name: 'comment-detail',
  data() {
    return {
      moreVisible: false,
      liked: false,
      likecnt: this.commentInfo.likecnt
    }
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
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
    handleThumbsClick() {
      this.$emit('thumbs', this.commentInfo.commentid, this.liked)
    },
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
    },
    changeThumb() {
      if (this.liked) {
        this.likecnt -= 1
      } else {
        this.likecnt += 1
      }
      this.liked = !this.liked
    }
  },
  computed: {
    time() {
      return this.commentInfo.datetime.substr(0, 10) ===
        new Date().toLocaleDateString().replace(/\//g, '-')
        ? this.commentInfo.datetime.substr(10, 6)
        : this.commentInfo.datetime.substr(5, 5)
    },
    receiverName() {
      return this.commentInfo.receiver ? this.commentInfo.receiver : false
    }
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
    border-radius 50%
    background-color #f2f2f2
    overflow hidden
    img
      width 100%
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

<template>
  <div class="comment">
    <div class="header">
      <the-header>
        <template #left>
          <router-link tag="i" class="iconfont" to="/comment" replace>&#xe612;</router-link>
        </template>
        <template #mid>
          <span>热门</span>
        </template>
      </the-header>
    </div>

    <div class="comment-scroll">
      <!-- 传入commentData,scroll-y会在恰当的时机刷新页面-->
      <scroll-y ref="scroll" :pullUpLoad="true" @pullingUp="handlePullingUp" class="scroll">
        <div class="content">
          <comment-detail
            @contentClick="handleContentClick"
            @moreClick="handleMoreClick"
            v-for="item in commentList"
            :commentInfo="item"
            :key="item.commentid"
          />
        </div>
      </scroll-y>
    </div>
    <bottom-input @click="handleSubmitFeeling" />
    <toast :toastVisible="toastVisible" @cancel="handleCancelToast" />
  </div>
</template>

<script>
import Toast from '@components/toast/toast.vue'
import BottomInput from '@components/input/bottom-input/bottom-input.vue'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
import TheHeader from '@components/detail/the-header/the-header.vue'
import CommentDetail from '@components/comment/comment-detail.vue'
import { getComments } from '@models'
// 这里直接保存上一个页面携带过来的评论数，原app 经测试刷新不会更改....
export default {
  name: 'hot-comment',
  data() {
    return {
      commentData: {},
      sameFeel: '666',
      selectCommentId: 0,
      toastVisible: false
    }
  },
  async created() {
    this.commentData = await getComments()
    // this.sameFeel = this.$route.params.cardInfo.commentcnt
  },
  mounted() {
    this.$refs.scroll.refreshAfterAnimation()
  },
  computed: {
    hotList() {
      return this.commentData.hotlist ? this.commentData.hotlist : []
    },
    commentList() {
      return this.commentData.commentlist ? this.commentData.commentlist : []
    }
  },

  methods: {
    // 监听到加载更多后，会展示更多页面，此时需要刷新scroll
    handleMoreClick() {
      this.$refs.scroll.refresh()
      this.day = 3
    },
    // 处理点击内容事件
    handleContentClick() {
      this.toastVisible = true
    },
    handleCancelToast() {
      this.toastVisible = false
    },
    handlePullingUp() {},
    handleMoreHotClick() {
      this.$router.push({
        name: 'hot-comment',
        params: { cardInfo: this.cardInfo }
      })
    },
    handleSubmitFeeling(content) {
      this.$toastMessage({ message: '33333', time: 1000 })
    }
  },
  components: {
    TheHeader,
    ScrollY,
    Toast,
    CommentDetail,
    BottomInput
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.comment
  color #4a4a4a
  normalFont()
  height 100%
  width 100%
  display flex
  flex-direction column
  background-color #fefefe
  font-size 40px
  .comment-scroll
    flex 1
    overflow hidden
    .totalinfo
      display flex
      justify-content space-between
      height 129px
      color #7f7f7f
      border-bottom 1px solid $Gray
      .left
        display flex
        align-items center
        justify-content space-between
        & span:nth-child(1)
          margin-left 48px
        & span:nth-child(2)
          margin-left 14px
      .right
        display flex
        align-items center
        justify-content space-between
        & span:nth-child(2)
          margin-left 14px
          margin-right 14px
      .to-button
        transform rotate(180deg)
        & >>> .iconfont
          height 48px
    .content
      padding-left 45px
    .check-more-hot
      height 129px
      margin-left 48px
      margin-right 48px
      border-bottom 1px solid $Gray
      colorBlue()
      center()
.comment-scroll >>> .bscroll-indicator
  background-color #a6a6a6 !important
  width 15px !important
.comment-scroll >>> .bscroll-vertical-scrollbar
  top 132px !important
  z-index 1 !important
</style>

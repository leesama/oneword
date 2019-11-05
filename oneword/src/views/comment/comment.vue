<template>
  <div class="comment">
    <div class="header">
      <the-header>
        <template #left>
          <i class="iconfont" @click="handleClickBack">&#xe612;</i>
        </template>
        <template #mid>
          <span>感悟</span>
        </template>
      </the-header>
    </div>

    <div class="comment-scroll">
      <scroll-y
        ref="scroll"
        :pullUp="true"
        @pullUp="handlePullUp"
        :pullDown="true"
        @pullDown="handlePullDown"
      >
        <div class="totalinfo">
          <div class="left">
            <span>{{cardInfo.replycnt}}</span>
            <span>感悟：</span>
          </div>
          <div class="right">
            <span>同感</span>
            <span>{{cardInfo.commentcnt}}</span>
            <to-button class="to-button" />
          </div>
        </div>
        <div class="content">
          <comment-detail
            ref="item"
            @thumbs="handleThumbsClick"
            @contentClick="handleContentClick(key)"
            @moreClick="handleMoreClick"
            v-for="(item,key) in commentData"
            :commentInfo="item"
            :key="item.commentid"
          />
        </div>
      </scroll-y>
    </div>
    <bottom-input @send="handleSubmitFeeling" ref="bottomInput" />
    <drawer
      @click="handleDrawerClick"
      :visible="commentDrawerVisible"
      @cancel="handleCancelCommentDrawer"
      :drawerInfo="commentDrawerInfo"
    />
    <drawer
      @click="handleSelfDrawerClick"
      :visible="commentSelfDrawerVisible"
      @cancel="handleCancelCommentSelfDrawer"
      :drawerInfo="commentSelfDrawerInfo"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Clipboard from 'clipboard'
import Drawer from '@components/drawer/drawer'
import BottomInput from '@components/input/bottom-input/bottom-input.vue'
import ToButton from '@components/button/button-back/button-back.vue'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
import TheHeader from '@components/detail/the-header/the-header.vue'
import CommentDetail from '@components/comment/comment-detail.vue'
import {
  getComments,
  newComment,
  deleteComment,
  likeComment,
  cancelLikeComment
} from '@models'
export default {
  name: 'comment',
  data() {
    return {
      sameFeel: 0,
      feeling: 0,
      commentData: [],
      commentDrawerInfo: ['回复', '复制', { color: true, word: '举报' }],
      commentSelfDrawerInfo: ['复制', { color: true, word: '删除' }],
      commentDrawerVisible: false,
      commentSelfDrawerVisible: false,
      commentSelectIndex: 0,
      cardInfo: {}
    }
  },
  // updated() {
  //   this.$refs.scroll.refreshAfterAnimation()
  // },

  computed: {
    ...mapGetters(['userInfoAndBookList', 'getCardInfo'])
  },
  methods: {
    ...mapActions(['addCardReplyAndCommentCnt']),
    handleClickBack() {
      this.$router.back(-1)
    },
    // 监听到加载更多后，会展示更多页面，此时需要刷新scroll
    handleMoreClick() {
      this.$refs.scroll.refresh()
    },
    async handlePullDown() {
      this.cardId = this.$route.params.cardid
      const from = this.$route.params.from
      // 根据路由参数获得数据
      this.cardInfo = this.getCardInfo(from, this.cardId)
      // 根据上一个路由的参数组合出操作数据的函数
      this.addReplyCnt = num => {
        return this.addCardReplyAndCommentCnt({
          type: from,
          cardId: this.cardId,
          num
        })
      }
      this.commentData = (await getComments({
        cardid: this.cardId
      })).data

      this.$refs.scroll.finishPullDown()

      if (this.commentData.length < 10) {
        this.$refs.scroll.loadingBallVisible = true
        this.$refs.scroll.changeEnd = true
      }
    },
    // 上拉事件
    async handlePullUp() {
      const { data } = await getComments({
        cardid: this.cardId,
        datetime: this.commentData[this.commentData.length - 1].datetime
      })
      if (data.length < 10) {
        this.$refs.scroll.closePullUp()
      } else {
        this.$refs.scroll.finishPullUp()
      }
      this.commentData = this.commentData.concat(data)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    // 处理点击内容事件
    handleContentClick(i) {
      this.commentSelectIndex = i
      if (
        this.commentData[this.commentSelectIndex].creator.uid ===
        this.userInfoAndBookList.user.uid
      ) {
        this.commentSelfDrawerVisible = true
      } else {
        this.commentDrawerVisible = true
      }
    },
    // 处理点击不同的项
    handleDrawerClick(i) {
      switch (i) {
        case 0:
          // eslint-disable-next-line standard/computed-property-even-spacing
          const username = this.commentData[this.commentSelectIndex].creator
            .username
          this.reciverPrefix = ` 回复 ${username} : `
          this.$refs.bottomInput.setContent(this.reciverPrefix)
          // 保存回复用户到的前缀和reciverid用于后面回复功能
          // eslint-disable-next-line standard/computed-property-even-spacing
          this.receiver = this.commentData[this.commentSelectIndex].creator
          break
        case 1:
          let clipboard = new Clipboard('.drawer', {
            text: () => {
              return this.commentData[this.commentSelectIndex].content
            }
          })
          clipboard.on('success', e => {
            this.$toastMessage('复制成功')
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$toastMessage('该浏览器不支持自动复制')
            clipboard.destroy()
          })
          break

        default:
          break
      }
      this.commentDrawerVisible = false
    },

    async handleThumbsClick(commentId, liked) {
      const thumbIndex = this.commentData.findIndex(i => {
        return i.commentid === commentId
      })
      if (
        this.commentData[thumbIndex].creator.uid ===
        this.userInfoAndBookList.user.uid
      ) {
        return this.$toastMessage('不可点赞本人评论')
      }
      // 如果是不喜欢，发送喜欢请求,如果是喜欢状态,发送取消喜欢请求，
      if (!liked) {
        await likeComment({ commentid: commentId })
      } else {
        await cancelLikeComment({ commentid: commentId })
      }
      this.$refs.item[thumbIndex].changeThumb()
    },
    async handleSelfDrawerClick(i) {
      switch (i) {
        case 0:
          let clipboard = new Clipboard('.drawer', {
            text: () => {
              return this.commentData[this.commentSelectIndex].content
            }
          })
          clipboard.on('success', e => {
            this.$toastMessage('复制成功')
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$toastMessage('该浏览器不支持自动复制')
            clipboard.destroy()
          })
          break
        case 1:
          const { code } = await deleteComment({
            commentid: this.commentData[this.commentSelectIndex].commentid
          })
          if (code === 0) {
            this.addReplyCnt(-1)
            this.commentData.splice(this.commentSelectIndex, 1)
          }
          break
        default:
          break
      }
      this.commentSelfDrawerVisible = false
    },
    handleCancelCommentDrawer() {
      this.commentDrawerVisible = false
    },
    handleCancelCommentSelfDrawer() {
      this.commentSelfDrawerVisible = false
    },
    async handleSubmitFeeling(content) {
      // 只有内容和前缀一致，才会在参数中添加reciverid
      if (content.startsWith(this.reciverPrefix)) {
        const replyContent = content.substr(this.reciverPrefix.length)
        const {
          code,
          data: { commentid, datetime }
        } = await newComment({
          content: replyContent,
          cardid: this.cardId,
          receiverid: this.receiver.uid
        })
        if (code === 0) {
          this.commentData.unshift({
            commentid,
            content: replyContent,
            creator: this.userInfoAndBookList.user,
            datetime,
            receiver: this.receiver,
            likecnt: 0,
            textcard: this.cardInfo
          })
          this.addReplyCnt(1)
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      } else {
        const {
          code,
          data: { commentid, datetime }
        } = await newComment({
          content,
          cardid: this.cardId
        })
        if (code === 0) {
          this.commentData.unshift({
            commentid,
            content: content,
            creator: this.userInfoAndBookList.user,
            datetime,
            likecnt: 0,
            textcard: this.cardInfo
          })
          this.addReplyCnt(1)
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      }
    }
  },
  components: {
    TheHeader,
    ScrollY,
    ToButton,
    CommentDetail,
    BottomInput,
    Drawer
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
    margin-bottom 130px
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

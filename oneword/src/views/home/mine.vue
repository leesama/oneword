<template>
  <div class="mine" v-if="userInfo" ref="mine">
    <the-header ref="header">
      <template #right>
        <span class="exit" @click="handleExit">退出登录</span>
      </template>
    </the-header>
    <scroll-y
      class="scroll"
      :scrollBar="false"
      :pullDown="true"
      @pullDown="handlePullDown"
      :firstLoadPullDown="false"
      ref="scroll"
    >
      <div class="main" ref="main">
        <div class="userinfo">
          <div class="picandname">
            <base-img
              :src="userInfo.user.smallavatar"
              class="img"
              @tap.native="handleIntroTap"
              v-if="userInfo.user.smallavatar"
            />
            <div class="noimg" v-else @tap="handleIntroTap" />
            <div class="name">
              <span>{{userInfo.user.username}}</span>
            </div>
          </div>
          <div class="intro" ref="intro">
            <span @tap="handleIntroTap">{{userInfo.user.intro?userInfo.user.intro:"暂无签名"}}</span>
          </div>
          <div class="followandfans">
            <p>
              <span>{{userInfo.user.fanscnt}}</span>
              <span>读者</span>
            </p>
            <p>
              <span>{{userInfo.user.followcnt}}</span>
              <span>订阅</span>
            </p>
          </div>
        </div>
        <div class="book-list">
          <div class="split-line" />
          <div class="wordsname">
            <div>
              <p>
                <span>文集</span>
                <span>{{userInfo.booklist.length}}</span>
              </p>
              <span />
            </div>
            <div>
              <p>
                <span>字句</span>
                <span>1</span>
              </p>
            </div>
            <div>
              <p>
                <span>我同感的</span>
                <span>1</span>
              </p>
            </div>
          </div>
          <div class="wordsnameblock">
            <div v-for="item in userInfo.booklist" :key="item.bookid">
              <img :src="item.picpath" alt />
              <p class="bookname" :class="{wordcolor:item.picpath}">
                <span>{{item.bookname}}</span>
              </p>
              <p class="cardcnt" :class="{wordcolor:item.picpath}">
                <span>{{item.cardcnt?item.cardcnt:0}}</span>字句
              </p>
            </div>
            <div @tap="handleOpenNewBook">
              <p class="bookname">
                <span>新建文集</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll-y>
    <drawer
      class="toast"
      :visible="drawerVisible"
      @cancel="handleCancelDrawer"
      @click="handleDrawerClick"
      :drawerInfo="drawerInfo"
      ref="toast"
    />
    <edit-user-info
      :visible="editUserInfoVisible"
      :userInfo="userInfo.user"
      @update="handleUpdatedUserInfo"
      @close="handleCloseUserInfo"
    />

    <new-book
      :visible="newBookVisible"
      :bookList="userInfo.booklist"
      @update="handleUpdatedNewBook"
      @close="handleCloseNewBook"
    />
  </div>
</template>

<script>
import cookies from 'vue-cookies'
import Drawer from '@components/drawer/drawer'
import TheHeader from '@components/detail/the-header/the-header.vue'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
import { exit } from '@models'
import { vuexMethondAndGetter } from '@mixins/userinfoVuex.js'
import EditUserInfo from './edit-userinfo.vue'
import NewBook from '../newbook/newbook.vue'
import BaseImg from '@components/card/card-base/card-base-img/card-base-img.vue'
export default {
  name: 'mine',
  mixins: [vuexMethondAndGetter],
  data() {
    return {
      isActivated: true,
      drawerInfo: ['编辑资料'],
      drawerVisible: false,
      editUserInfoVisible: false,
      newBookVisible: false,
      coverUploadImg: ''
    }
  },
  methods: {
    handleIntroTap() {
      this.drawerVisible = true
      // 设置要修改的数据的值，与数据初始值一致
      this.uploadImg = this.userInfo.user.smallavatar
      this.uploadUserName = this.userInfo.user.username
      this.uploadIntro = this.userInfo.user.intro
    },
    handleDrawerClick() {
      this.editUserInfoVisible = true
    },
    handleCancelDrawer() {
      this.drawerVisible = false
    },
    handleUpdatedUserInfo(info) {
      const { smallavatar, username, intro } = info
      this.userInfo.user.username = username
      this.userInfo.user.smallavatar = smallavatar
      this.userInfo.user.intro = intro
      this.editUserInfoVisible = false
      this.drawerVisible = false
      // 更新store
      this.setUserInfoAndBookList(this.userInfo)
    },
    handleCloseUserInfo() {
      this.editUserInfoVisible = false
      this.drawerVisible = false
    },
    handleOpenNewBook() {
      this.newBookVisible = true
    },
    handlePullDown() {
      this.$refs.scroll.finishPullDown()
    },
    handleCloseNewBook() {
      this.newBookVisible = false
    },
    handleUpdatedNewBook() {
      this.newBookVisible = false
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    async handleExit() {
      const { code } = await exit()
      if (code === 0) {
        cookies.remove('oneword')
        cookies.remove('oneword.sig')
        this.$toastMessage('退出成功')
        // 刷新页面来清除之前页面的数据
        this.$store.dispatch('resetState')
        this.$router.push('/login')
      } else {
        this.$toastMessage('退出失败,请重试')
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  components: {
    BaseImg,
    ScrollY,
    TheHeader,
    Drawer,
    EditUserInfo,
    NewBook
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.mine
  normalFont()
  display flex
  filled()
  flex-direction column
  .exit
    font-size 48px
  .toast >>>.mask
    top 0
  &>.detail-header
    background-color #fefefe
  .border-bottom:before
    border none
  .main
    padding-bottom 145px
    flex 1
    normalFont()
    background-color #fefefe
    .userinfo
      margin-left 65px
      .picandname
        leftcenter()
        .img
          margin-top 20px
          box-shadow 0 0 50px #e8e8e8
          border-radius 50%
          width 205px
          margin-right 30px
          & >>> .radius
            height 205px
            width 205px
        .noimg
          margin-top 20px
          box-shadow 0 0 50px #e8e8e8
          border-radius 50%
          width 205px
          height 205px
          margin-right 30px
        .name
          font-size 50px
          font-weight bold
      .intro
        width auto
        color #9b9b9b
        font-size 38px
        span
          max-width 1000px
          overflow hidden
          min-width 200px
          display inline-block
          padding-top 50px
          padding-bottom 80px
          text-overflow ellipsis
          white-space nowrap
      .followandfans
        font-size 38px
        display flex
        p
          display flex
          flex-direction column
          color #9b9b9b
          span:first-child
            margin-bottom 25px
            color #4a4a4a
            font-weight bolder
        p:first-child
          margin-right 75px
    .book-list
      margin 0px 0 40px 0
      .split-line
        height 1px
        background-color #f8f8f8
        margin 65px 30px 0px 30px
      .wordsname
        display flex
        align-items center
        height 200px
        color #9b9b9b
        font-weight bold
        font-size 40px
        justify-content space-around
        div
          center()
          flex 1
          height 100%
        div:first-child
          color #4a4a4a
          position relative
          flex-direction column
          &>span:nth-child(2)
            position absolute
            top 140px
            width 14px
            height 14px
            background-color #4a4a4a
        p
          &>span:first-child
            margin-right 12px
      .wordsnameblock
        display grid
        grid-template-columns 50vw 50vw
        grid-template-rows 50vw
        grid-auto-rows 50vw
        div
          position relative
          center()
          margin 1vw
          border-radius 10px
          color #4a4a4a
          background-color #f2f2f2
          img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
          .wordcolor
            color #fefefe
          &>.bookname
            position absolute
            font2()
            font-weight bold
            font-size 45px
          &>.cardcnt
            font-size 30px
            position absolute
            bottom 30px
            left 30px
            span
              margin-right 12px
          &:nth-child(odd)
            margin-left 2vw
          &:nth-child(even)
            margin-right 2vw
.edit-transition-enter
  opacity 0
.edit-transition-enter-active
  transition all 0.5s
.edit-transition-enter-to
  opacity 1
</style>

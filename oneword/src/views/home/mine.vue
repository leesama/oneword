<template>
  <div class="mine" v-if="userInfo.user" ref="mine">
    <the-header ref="header" />
    <scroll-y
      class="scroll"
      :scrollBar="false"
      :showLodingBall="false"
      ref="scroll"
      :showLoading="false"
    >
      <div class="main" ref="main">
        <div class="userinfo">
          <div class="picandname">
            <base-img :src="userInfo.user.smallavatar" class="img" @tap.native="handleIntroTap" />
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
              <p>
                <span>{{item.bookname}}</span>
              </p>
              <p>
                <span>{{item.cardcnt?item.cardcnt:0}}</span>字句
              </p>
            </div>
            <div @tap="handleNewWork">
              <p>
                <span>新建文集</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll-y>
    <toast
      class="toast"
      :toastVisible="toastVisible"
      @cancel="handleCancelToast"
      @toastClick="handleToastClick"
      :toastInfo="toastInfo"
      ref="toast"
    />

    <transition
      name="edit-transition"
      @before-enter="editTransitionBeforeEnter"
      @enter="editTransitionEnter"
      @before-leave="editTransitionBeforeLeave"
    >
      <div class="edit-userinfo" v-if="editUserInfoMaskVisible">
        <header-has-close @close="handleCloseEditUser" />
        <base-img
          :src="userInfo.user.smallavatar"
          class="edit-userinfo-img"
          @click.native="handleEditImgClick"
        />
        <input
          ref="imgInput"
          type="file"
          accept="image/*"
          @change="handleUploadImgSelect"
          style="display:none;"
        />
        <input v-model="userInfo.user.username" />
        <textarea v-model="userInfo.user.intro" ref="textarea" />
        <image-clipper
          :img="uploadImg"
          v-if="imageClipperVisible"
          @cancel="handleCancelImageClip"
          @ok="handleOkImageClip"
        ></image-clipper>
      </div>
    </transition>
    <transition
      name="edit-transition"
      @before-enter="newWorkTransitionBeforeEnter"
      @enter="newWorkTransitionEnter"
      @before-leave="newWorkTransitionBeforeLeave"
    >
      <div v-if="newWorkVisible" class="new-work">
        <header-has-close @close="handleCloseNewWork" />
        <div class="new-work-main" @click="handleAddCover">
          <p>
            <span>文集封面图</span>
            <span>(可无)</span>
          </p>
        </div>
        <input
          ref="coverInput"
          type="file"
          accept="image/*"
          @change="handleCoverImgSelect"
          style="display:none;"
        />
        <image-clipper
          :img="coverUploadImg"
          v-if="coverImageClipperVisible"
          @cancel="handleCancelCoverImageClip"
          @ok="handleOkCoverImageClip"
        ></image-clipper>
        <input ref="newWorkinput" type="text" placeholder="新文集名" />
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderHasClose from '@components/detail/the-header/the-header-have-close.vue'
import ImageClipper from '@components/imageclipper/imageClipper.vue'
import Toast from '@components/toast/toast.vue'
import TheHeader from '@components/detail/the-header/the-header.vue'
import ScrollY from '@components/scroll/scroll-y/scroll-y.vue'
import { getUserinfoAndBooklist } from '@models'
import { reader } from '@js/utils.js'
import BaseImg from '@components/card/card-base/card-base-img/card-base-img.vue'
export default {
  name: 'mine',
  data() {
    return {
      userInfo: {},
      toastVisible: false,
      toastInfo: ['编辑资料'],
      editUserInfoMaskVisible: false,
      username: '',
      userIntro: '',
      imageClipperVisible: false,
      uploadImg: '',
      newWorkVisible: false,
      coverImageClipperVisible: false,
      coverUploadImg: ''
    }
  },
  async created() {
    this.userInfo = await getUserinfoAndBooklist()
  },
  updated() {
    this.$refs.scroll.refreshAfterAnimation()
  },
  methods: {
    handleIntroTap() {
      this.toastVisible = true
    },
    handleToastClick() {
      // this.toastVisible = false
      this.editUserInfoMaskVisible = true
    },
    handleCancelToast() {
      this.toastVisible = false
    },
    // edit transition begin
    editTransitionBeforeEnter() {
      this._handleDomForTransition()
      this.$refs.toast.$el.childNodes[0].style.filter = 'blur(10px)'
      this.$refs.toast.$el.childNodes[1].style.filter = 'blur(10px)'
    },
    editTransitionEnter() {
      this.$refs.textarea.focus()
    },
    editTransitionBeforeLeave() {
      this._handleDomAfterTransition()
      this.$refs.toast.$el.childNodes[0].removeAttribute('style')
      this.$refs.toast.$el.childNodes[1].removeAttribute('style')
      this.toastVisible = false
    },
    // edit transition end
    // new work transition begin
    newWorkTransitionBeforeEnter() {
      document.querySelector('.detail-footer').style.filter = 'blur(10px)'
      this._handleDomForTransition()
    },
    newWorkTransitionEnter() {
      this.$refs.newWorkinput.focus()
    },
    newWorkTransitionBeforeLeave() {
      this._handleDomAfterTransition()
      document.querySelector('.detail-footer').removeAttribute('style')
    },
    // new work transition end
    _handleDomForTransition() {
      this.$refs.scroll.$el.style.filter = 'blur(10px)'
      this.$refs.header.$el.style.filter = 'blur(10px)'
    },
    _handleDomAfterTransition() {
      this.$refs.scroll.$el.removeAttribute('style')
      this.$refs.header.$el.removeAttribute('style')
    },
    handleCloseEditUser() {
      this.editUserInfoMaskVisible = false
    },
    handleEditImgClick() {
      this.$refs.imgInput.click()
    },
    handleUploadImgSelect(e) {
      reader(e.target.files[0]).then(({ result }) => {
        this.uploadImg = result
        this.imageClipperVisible = true
        // 清除input的值，这样重新选择一样的文件也可以触发input change事件
        this.$refs.imgInput.value = ''
      })
    },
    handleCancelImageClip() {
      this.imageClipperVisible = false
    },
    handleOkImageClip(data) {
      this.imageClipperVisible = false
    },
    handleNewWork() {
      this.newWorkVisible = true
    },
    handleCloseNewWork() {
      this.newWorkVisible = false
    },
    handleAddCover() {
      this.$refs.coverInput.click()
    },
    handleCoverImgSelect(e) {
      reader(e.target.files[0]).then(({ result }) => {
        this.coverUploadImg = result
        this.coverImageClipperVisible = true
        this.$refs.coverInput.value = ''
      })
    },
    handleCancelCoverImageClip() {
      this.coverImageClipperVisible = false
    },
    handleOkCoverImageClip(data) {
      this.coverImageClipperVisible = false
      console.log(data)
    }
  },
  components: {
    BaseImg,
    ScrollY,
    TheHeader,
    Toast,
    ImageClipper,
    HeaderHasClose
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.mine
  normalFont()
  display flex
  flex-direction column
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
      & >>> .radius
        height 205px
        width 205px
      & .img
        width 205px
        margin-right 30px
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
          p:first-child
            font2()
            font-weight bold
            font-size 45px
          p:nth-child(2)
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
  .edit-userinfo
    position fixed
    width 100vw
    height 100vh
    left 0
    top 0
    z-index 50
    display flex
    flex-direction column
    .header
      display flex
      justify-content space-between
      span
        center()
        padding-right 55px
        color #4779a7
        font-size 45px
    .edit-userinfo-img
      width 205px
      height 205px
      margin-left 50px
      margin-top 50px
      margin-bottom 80px
      & >>> .radius
        height 205px
        width 205px
    input
      margin-left 55px
      margin-right 55px
      margin-bottom 100px
      background-color transparent
      color #2f2f2f
      font-size 45px
    textarea
      margin-left 55px
      margin-right 55px
      height 1000px
      background-color transparent
      color #2f2f2f
      font-size 45px
  .new-work
    position fixed
    width 100vw
    height 100vh
    left 0
    top 0
    z-index 50
    .header
      display flex
      justify-content space-between
      span
        center()
        padding-right 55px
        color #4779a7
        font-size 45px
    .new-work-main
      box-shadow 0 0 50px #c4c4c4
      margin 0 auto
      margin-top 300px
      height 360px
      width 360px
      margin-bottom 90px
      center()
      p
        display flex
        align-items center
        flex-direction column
        font-size 40px
        font2()
        font-weight bold
        color #555555
        span:last-child
          margin-top 20px
    input
      text-align center
      font2()
      background-color transparent
      caret-color #376cf3
      width 100%
      box-sizing border-box
      padding-left 50px
      padding-right 50px
      font-size 50px
.edit-transition-enter
  opacity 0
.edit-transition-enter-active
  transition all 0.5s
.edit-transition-enter-to
  opacity 1
</style>

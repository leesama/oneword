<template>
  <transition
    name="edit-transition"
    @before-enter="editTransitionBeforeEnter"
    @enter="editTransitionEnter"
    @before-leave="editTransitionBeforeLeave"
  >
    <div class="edit-userinfo" v-if="visible">
      <header-has-close @close="handleCloseEditUser" @rightClick="handlefinishEditUser" />
      <base-img :src="uploadImg" class="edit-userinfo-img" @click.native="handleEditImgClick" />
      <input
        ref="imgInput"
        type="file"
        accept="image/*"
        @change="handleUploadImgSelect"
        style="display:none;"
      />
      <input v-model="uploadUserName" placeholder="用户名" />
      <textarea v-model="uploadIntro" ref="textarea" placeholder="签名" />
      <image-clipper
        :imgSrc="clipperImg"
        v-if="imageClipperVisible"
        @cancel="handleCancelImageClip"
        @ok="handleOkImageClip"
      ></image-clipper>
    </div>
  </transition>
</template>

<script>
import { updateUserInfo } from '@models'
import BaseImg from '@components/card/card-base/card-base-img/card-base-img.vue'
import { base64ToFile } from '@js/utils.js'
import HeaderHasClose from '@components/detail/the-header/the-header-have-close.vue'
import ImageClipper from '@components/imageclipper/imageClipper.vue'
export default {
  name: 'edit-userinfo',
  data() {
    return {
      uploadImg: '',
      uploadIntro: '',
      uploadUserName: '',
      imageClipperVisible: false,
      clipperImg: ''
    }
  },
  props: {
    visible: { type: Boolean, default: false },
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.uploadIntro = this.userInfo.intro ? this.userInfo.intro : ''
    this.uploadImg = this.userInfo.smallavatar ? this.userInfo.smallavatar : ''
    this.uploadUserName = this.userInfo.username
  },
  methods: {
    // edit transition begin
    editTransitionBeforeEnter() {
      document.querySelector('.mine>.scroll-wrapper').style.filter =
        'blur(10px)'
      document.querySelector('.mine>.detail-header').style.filter = 'blur(10px)'
      document.querySelector('.drawer-wrapper>.mask').style.filter =
        'blur(10px)'
      document.querySelector('.drawer-wrapper>.drawer').style.filter =
        'blur(10px)'
    },
    editTransitionEnter() {
      this.$refs.textarea.focus()
    },
    editTransitionBeforeLeave() {
      document.querySelector('.mine>.scroll-wrapper').removeAttribute('style')
      document.querySelector('.mine>.detail-header').removeAttribute('style')
      document.querySelector('.drawer-wrapper>.drawer').removeAttribute('style')
      this.drawerVisible = false
    },
    // edit transition end

    handleEditImgClick() {
      this.$refs.imgInput.click()
    },
    // 选中图片之后
    handleUploadImgSelect(e) {
      this.clipperImg = URL.createObjectURL(e.target.files[0])
      this.imageClipperVisible = true
      // 清除input的值，这样重新选择一样的文件也可以触发input change事件
      this.$refs.imgInput.value = null
    },
    handleCancelImageClip() {
      this.imageClipperVisible = false
    },
    handleOkImageClip(data) {
      this.imageClipperVisible = false
      this.uploadImg = data
    },
    // 完成编辑用户信息
    async handlefinishEditUser() {
      // 判断数据是否被修改
      const ImgChanged = this.uploadImg !== this.userInfo.smallavatar
      const isUserNameChanged = this.uploadUserName !== this.userInfo.username
      const isIntroChanged = this.uploadIntro !== this.userInfo.intro
      // 如果值变化了执行上传操作,否则直接关闭
      if (ImgChanged || isUserNameChanged || isIntroChanged) {
        if (this.uploadUserName.trim().length > 12) {
          return this.$toastMessage('昵称长度过长')
        }
        let formData = new FormData()
        if (ImgChanged) {
          formData.append('pic', base64ToFile(this.uploadImg, 'pic.jpg'))
        }
        if (isUserNameChanged) {
          formData.append('username', this.uploadUserName)
        }
        if (isIntroChanged) {
          formData.append('intro', this.uploadIntro)
        }
        const { code, msg } = await updateUserInfo(formData)
        if (code === 0) {
          this.$emit('update', {
            smallavatar: this.uploadImg,
            intro: this.uploadIntro,
            username: this.uploadUserName.trim()
          })
        } else {
          this.$toastMessage(msg)
        }
      } else {
        this.$emit('close')
      }
    },
    // 关闭编辑用户信息
    handleCloseEditUser() {
      this.$emit('close')
    }
  },
  components: { ImageClipper, HeaderHasClose, BaseImg }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
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
      background-color white
  input
    margin-left 55px
    margin-right 55px
    margin-bottom 100px
    background-color transparent
    color #2f2f2f
    font-size 45px
    &::placeholder
      color #c7c7cc
  textarea
    margin-left 55px
    margin-right 55px
    height 1000px
    background-color transparent
    color #2f2f2f
    font-size 45px
    &::placeholder
      color #c7c7cc
.edit-transition-enter
  opacity 0
.edit-transition-enter-active
  transition all 0.5s
.edit-transition-enter-to
  opacity 1
</style>

<template>
  <transition
    ref="newBook"
    :css="false"
    name="edit-transition"
    @before-enter="newBookTransitionBeforeEnter"
    @enter="newBookTransitionEnter"
    @before-leave="newBookTransitionBeforeLeave"
  >
    <div class="new-book" v-if="visible" ref="newBook">
      <header-has-close @close="handleClose" @rightClick="handlefinish" />
      <div class="new-book-main" @click="handleAddCover">
        <img :src="clipperImg" alt />
        <p>
          <span>+文集封面图</span>
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
        :imgSrc="clipperImg"
        v-if="imageClipperVisible"
        @cancel="handleCancelImageClip"
        @ok="handleOkImageClip"
      ></image-clipper>
      <input ref="newBookinput" type="text" placeholder="新文集名" v-model="bookname" />
    </div>
  </transition>
</template>

<script>
import { vuexMethondAndGetter } from '@mixins/userinfoVuex.js'
import { base64ToFile } from '@js/utils.js'
import { newBook } from '@models'
import ImageClipper from '@components/imageclipper/imageClipper.vue'
import HeaderHasClose from '@components/detail/the-header/the-header-have-close.vue'
export default {
  name: 'newbook',
  mixins: [vuexMethondAndGetter],
  props: {
    visible: { type: Boolean, default: false },
    bookList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      imageClipperVisible: false,
      clipperImg: '',
      bookname: ''
    }
  },
  mounted() {
    // 得到需要blur的dom数组对象
    this.needBlurDom = this.siblings(this.$el)
  },
  methods: {
    // new book transition begin
    newBookTransitionBeforeEnter() {
      this.needBlurDom.forEach(dom => {
        dom.style.filter = 'blur(20px)'
      })
      if (document.querySelector('.detail-footer')) {
        document.querySelector('.detail-footer').style.filter = 'blur(20px)'
      }
    },
    newBookTransitionEnter() {
      this.$refs.newBookinput.focus()
    },
    newBookTransitionBeforeLeave() {
      this.needBlurDom.forEach(dom => {
        dom.removeAttribute('style')
      })
      if (document.querySelector('.detail-footer')) {
        document.querySelector('.detail-footer').removeAttribute('style')
      }
    },
    // new book transition end
    handleCloseNewBook() {
      this.$emit('close')
    },
    handleAddCover() {
      this.$refs.coverInput.click()
    },
    handleCoverImgSelect(e) {
      // URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
      this.clipperImg = URL.createObjectURL(e.target.files[0])
      this.imageClipperVisible = true
      // 清除input的值，这样重新选择一样的文件也可以触发input change事件
      this.$refs.coverInput.value = null
    },
    handleCancelImageClip() {
      this.imageClipperVisible = false
      this.clipperImg = ''
    },
    handleOkImageClip(data) {
      this.clipperImg = data
      this.imageClipperVisible = false
    },
    initData() {
      this.clipperImg = ''
      this.bookname = ''
    },
    async handlefinish() {
      if (!this.bookname) {
        return this.$toastMessage('请输入封面名称')
      }
      if (
        this.bookList.find(i => {
          return i.bookname === this.bookname
        })
      ) {
        return this.$toastMessage('已存在相同文集')
      }
      let formData = new FormData()
      if (this.clipperImg) {
        formData.append('pic', base64ToFile(this.clipperImg, 'pic.jpg'))
      }
      formData.append('bookname', this.bookname)
      const { code, data, msg } = await newBook(formData)
      if (code === 0) {
        const userInfo = this.userInfo
        userInfo.booklist.push(data)
        this.setUserInfoAndBookList(userInfo)
      } else {
        this.$toastMessage(msg)
      }
      this.initData()
      this.$emit('update')
    },
    // 获取兄弟节点数组
    siblings(elm) {
      var a = []
      var p = elm.parentNode.children
      for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) a.push(p[i])
      }
      return a
    },
    handleClose() {
      this.initData()
      this.$emit('close')
    }
  },
  components: { ImageClipper, HeaderHasClose }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.new-book
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
  .new-book-main
    box-shadow 0 0 50px #c4c4c4
    margin 0 auto
    margin-top 300px
    height 360px
    width 360px
    margin-bottom 90px
    center()
    position relative
    background-color #fefefe
    img
      position absolute
      left 0
      right 0
      bottom 0
      top 0
      width 100%
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
</style>

<template>
  <div class="second-step">
    <the-header
      @rightClick="handleToThirdStep"
      :transparent="false"
      ref="header"
      @close="handleClose"
    >
      <template #left>
        <i class="iconfont">&#xe612;</i>
      </template>
      <template #mid>「选择存入文集」</template>
      <template #right>下一步</template>
    </the-header>
    <scroll-base ref="scroll">
      <main>
        <div v-for="(item, index) in bookList" :key="index" @click="handleClickBook(index)">
          {{item.bookname}}
          <i class="iconfont" :class="{select:selectBookIndex===index}">&#xe629;</i>
        </div>
        <div @click="handleNewWork">
          <p>
            <span>新建文集</span>
          </p>
        </div>
      </main>
    </scroll-base>
    <transition
      name="edit-transition"
      @before-enter="newWorkTransitionBeforeEnter"
      @enter="newWorkTransitionEnter"
      @before-leave="newWorkTransitionBeforeLeave"
    >
      <div v-if="newWorkVisible" class="new-work">
        <the-header @close="handleCloseNewWork" />
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
import ImageClipper from '@components/imageclipper/imageClipper.vue'
import { reader } from '@js/utils.js'
import TheHeader from '@components/detail/the-header/the-header-have-close.vue'
import ScrollBase from '@components/scroll/scroll-base/scroll-base.vue'
export default {
  name: 'newword-second-step',
  props: { bookList: { type: Array } },
  data() {
    return {
      selectBookIndex: 0,
      newWorkVisible: false,
      coverImageClipperVisible: false
    }
  },
  methods: {
    handleClickBook(i) {
      this.selectBookIndex = i
    },
    handleToThirdStep() {
      this.$emit('toThirdStep', this.bookList[this.selectBookIndex])
    },
    handleClose() {
      this.$emit('closeSecondStep')
    },

    newWorkTransitionBeforeEnter() {
      this.$refs.header.$el.style.filter = 'blur(10px)'
      this.$refs.scroll.$el.style.filter = 'blur(10px)'
    },
    newWorkTransitionEnter() {
      this.$refs.newWorkinput.focus()
    },
    newWorkTransitionBeforeLeave() {
      this.$refs.header.$el.removeAttribute('style')
      this.$refs.scroll.$el.removeAttribute('style')
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
  components: { TheHeader, ScrollBase, ImageClipper }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.second-step
  display flex
  flex-direction column
  position absolute
  filled()
  background-color #fefefe
  &>.scroll-wrapper
    margin-top 2vw
  main
    margin 0 2vw 0 2vw
    display inline-grid
    grid-template-columns repeat(2, 47vw)
    grid-template-rows 47vw
    grid-auto-rows 47vw
    grid-row-gap 2vw
    grid-column-gap 2vw
    &>div
      font2()
      font-weight bold
      font-size 45px
      center()
      background-color #f2f2f2
      position relative
      .iconfont
        position absolute
        bottom 25px
        right 25px
        border-radius 50%
        box-sizing border-box
        color #dadada
        background-color white
      .select
        color #7190a9
        animation scaleSelect 0.5s 1
      @keyframes scaleSelect
        0%
          transform scale(0.5)
        50%
          transform scale(1.3)
        100%
          transform scale(1)
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

<template>
  <div class="first-step">
    <the-header @rightClick="handleToSecondStep" :transparent="false" @close="handleClose">
      <template #mid>「发布图文」</template>
      <template #right>下一步</template>
    </the-header>
    <div class="main">
      <div class="addimg">
        <div class="imgcontent" @click="handleAddWordCover">
          <img :src="wordImg" alt />
          <p v-show="!wordImg">
            <span>+添加图片</span>
            <span>(可无)</span>
          </p>
        </div>
      </div>
      <input
        ref="wordImgInput"
        type="file"
        accept="image/*"
        @change="handleCoverImgSelect"
        style="display:none;"
      />
      <image-clipper
        :img="wordImg"
        v-if="wordImageClipperVisible"
        @cancel="handleCancelCoverImageClip"
        @ok="handleOkCoverImageClip"
      ></image-clipper>
      <div class="words">
        <input placeholder="标题 (可无)" v-model="title" />
        <textarea-autosize
          class="textarea-autosize"
          placeholder="正文"
          ref="myTextarea"
          v-model="content"
        />
        <input placeholder="出处/作者 (可无)" v-model="user" />
      </div>
      <div class="tag-container">
        <div class="tag">
          <span>选择分类:</span>
          <ul>
            <li
              v-for="(item, index) in category"
              @click="handleClickCategory(index)"
              :key="index"
              :class="{selectedcategory:selectCategoryIndex===index}"
            >{{item}}</li>
          </ul>
        </div>
        <div class="tag">
          <span>我是原创:</span>
          <button-animation @selected="handleOriginSelect" @unselected="handleOriginUnSelect" />
        </div>
        <div class="tag">
          <span>秘密</span>
          <button-animation @selected="handleSecretSelect" @unselected="handleSecretUnSelect" />
        </div>
      </div>
      <div class="secretstatus">
        <span>{{isSecret?'仅自己可见':'所有人可见'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageClipper from '@components/imageclipper/imageClipper.vue'
import { reader } from '@js/utils.js'
import ButtonAnimation from '@components/button/button-has-animation/button-has-animation.vue'
import TheHeader from '@components/detail/the-header/the-header-have-close.vue'
export default {
  name: 'newword-first-step',
  data() {
    return {
      wordImageClipperVisible: false,
      selectCategoryIndex: 0,
      title: '11',
      content:
        '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      user: '11',
      category: ['文字', '语录', '歌词', '电影', '诗'],
      isOriginal: false,
      isSecret: false,
      wordImg: ''
    }
  },
  methods: {
    handleToSecondStep() {
      this.content.length > 0
        ? this.$emit('toSecondStep', {
          type: 'yyw_0_0_0_0',
          picpath: this.wordImg,
          title: this.title,
          content: this.content,
          from: this.user,
          category: this.selectCategoryIndex,
          original: this.isOriginal ? '1' : '0',
          secret: this.isSecret ? '1' : '0'
        })
        : this.$toastMessage('还未写下字句')
    },
    handleClickCategory(i) {
      this.selectCategoryIndex = i
    },
    handleClose() {
      this.$emit('closeNewWord')
    },
    handleSecretSelect() {
      this.isSecret = true
    },
    handleSecretUnSelect() {
      this.isSecret = false
    },
    handleOriginSelect() {
      this.isOriginal = true
    },
    handleOriginUnSelect() {
      this.isOriginal = false
    },
    handleAddWordCover() {
      this.$refs.wordImgInput.click()
    },
    handleCoverImgSelect(e) {
      reader(e.target.files[0]).then(({ result }) => {
        this.wordImg = result
        this.wordImageClipperVisible = true
        this.$refs.wordImgInput.value = ''
      })
    },
    handleCancelCoverImageClip() {
      this.wordImageClipperVisible = false
    },
    handleOkCoverImageClip(data) {
      this.wordImageClipperVisible = false
      this.wordImg = data
    }
  },
  components: { ButtonAnimation, TheHeader, ImageClipper }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.first-step
  position absolute
  filled()
  .addimg
    height 360px
    background-color #f2f2f2
    center()
    .imgcontent
      width 240px
      height 240px
      background-color #d5d7da
      position relative
      img
        width 100%
        height 100%
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        object-fit cover
      p
        margin-top 100px
        display flex
        align-items center
        flex-direction column
        font-size 40px
        color #fefefe
        span:last-child
          margin-top 20px
  .words
    background-color #fefefe
    padding 0 80px
    margin-bottom 60px
    input
      width 100%
      height 125px
      font-size 45px
      text-align center
      &::placeholder
        color #d5d5d9
    .textarea-autosize:nth-child(2)
      width 100%
      font-size 45px
      line-height 70px
      border-radius none
      min-height 500px
      border-top 1px solid #f2f2f2
      border-bottom 1px solid #f2f2f2
      &::placeholder
        color #d5d5d9
  .tag-container
    background-color #fefefe
    .tag
      height 135px
      border-bottom 1px solid #f2f2f2
      font-size 45px
      padding 0 50px
      color #4a4a4a
      display flex
      justify-content space-between
      align-items center
    .tag:first-child
      ul
        display flex
        .selectedcategory
          color white
          background-color #4a4a4a
        li
          center()
          width 130px
          height 70px
          border 1px solid #4a4a4a
          margin-left 30px
          border-radius 10px
  .secretstatus
    display flex
    justify-content flex-end
    margin-top 30px
    margin-right 55px
    span
      color #97adbf
      font-size 35px
</style>

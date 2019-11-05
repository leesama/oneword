<template>
  <div class="crapper-container">
    <vueCropper
      ref="cropper"
      :img="imgSrc"
      :fixedBox="true"
      :canMoveBox="false"
      mode="100%"
      :info="false"
      :outputSize="0.5"
      :autoCrop="true"
      :autoCropWidth="cropSideLength"
      :autoCropHeight="cropSideLength"
      @imgLoad="handleImgLoad"
    ></vueCropper>
    <div class="bottom-mask" />
    <div class="bottom-btn">
      <button @click="handleCancel">取消</button>
      <button @click="handleCrop">选取</button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { mapMutations } from 'vuex'
export default {
  name: 'imageCropper',
  data() {
    return {
      cropSideLength: 0
    }
  },
  props: {
    imgSrc: { type: String, default: '' }
  },
  created() {
    this.cropSideLength = window.innerWidth - 5
    this.setLoadingMaskVisible(true)
  },
  methods: {
    ...mapMutations({ setLoadingMaskVisible: 'SET_LOADING_MASK_VISIBLE' }),
    handleCrop() {
      this.$refs.cropper.getCropData(data => {
        this.$emit('ok', data)
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleImgLoad() {
      this.setLoadingMaskVisible(false)
    }
  },
  components: { VueCropper }
}
</script>
<style lang='stylus' scoped>
.crapper-container
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 999
  background black
  &>>>.vue-cropper
    background-image none
    .cropper-modal
      background rgba(0, 0, 0, 0.8)
    .cropper-view-box
      outline 3px solid #7f7f7f
  .bottom-mask
    position absolute
    bottom 0
    left 0
    width 100%
    height 217px
    background-color #171717
    opacity 0.5
  .bottom-btn
    position absolute
    bottom 0
    left 0
    width 100%
    height 217px
    display flex
    justify-content space-between
    button
      font-size 50px
      color #fefefe
      background-color transparent
      width 200px
</style>

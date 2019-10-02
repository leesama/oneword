<template>
  <div class="newword">
    <first-step @toSecondStep="handleToSecondStep" @closeNewWord="handleCloseNewWord" />
    <transition name="slide-left">
      <second-step
        :bookList="userInfo.booklist"
        v-if="secondStepVisible"
        @toThirdStep="handleToThirdStep"
        @closeSecondStep="handleCloseSecondStep"
      />
    </transition>
    <transition name="slide-left">
      <third-step
        v-if="thirdStepVisible"
        :cardInfo="wordInfo"
        toSecondStep="handleToSecondStep"
        @closeThirdStep="handleCloseThirdStep"
      />
    </transition>
  </div>
</template>

<script>
import { getUserinfoAndBooklist } from '@models'
import FirstStep from './newword-first-step.vue'
import SecondStep from './newword-second-step.vue'
import ThirdStep from './newword-third-step.vue'
export default {
  name: 'new-word',
  data() {
    return {
      selectCategoryIndex: 0,
      category: ['文字', '语录', '歌词', '电影', '诗'],
      secondStepVisible: false,
      thirdStepVisible: false,
      userInfo: {},
      wordInfo: {}
    }
  },
  async created() {
    const info = await getUserinfoAndBooklist()
    this.userInfo = info
  },
  methods: {
    handleToSecondStep(info) {
      this.wordInfo = info
      this.secondStepVisible = true
    },
    handleCloseSecondStep() {
      this.secondStepVisible = false
    },
    handleToThirdStep(bookinfo) {
      this.wordInfo.originbook = bookinfo
      this.thirdStepVisible = true
    },
    handleCloseThirdStep() {
      this.thirdStepVisible = false
    },
    handleBackToSecondStep() {
      this.thirdStepVisible = false
    },
    handleCloseNewWord() {
      this.$router.back(-1)
    }
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.slide-left-enter, .slide-left-leave-to
  transform translate3d(100%, 0, 0)
.slide-left-enter-active, .slide-left-leave-active
  transition all 0.3s
.newword
  background-color #f2f2f2
  filled()
  position relative
</style>

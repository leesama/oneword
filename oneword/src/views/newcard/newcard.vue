<template>
  <div class="newcard">
    <first-step @toSecondStep="handleToSecondStep" @closeNewCard="handleCloseNewCard" />
    <transition name="slide-left">
      <second-step
        v-if="secondStepVisible"
        @toThirdStep="handleToThirdStep"
        @closeSecondStep="handleCloseSecondStep"
      />
    </transition>
    <transition name="slide-left">
      <third-step
        v-if="thirdStepVisible"
        :cardInfo="wordInfo"
        toSecondStep="handleBackToSecondStep"
        @closeThirdStep="handleCloseThirdStep"
      />
    </transition>
  </div>
</template>

<script>
import FirstStep from './newcard-first-step.vue'
import SecondStep from './newcard-second-step.vue'
import ThirdStep from './newcard-third-step.vue'
export default {
  name: 'new-word',
  data() {
    return {
      secondStepVisible: false,
      thirdStepVisible: false,
      wordInfo: {}
    }
  },
  methods: {
    handleToSecondStep(info) {
      this.wordInfo = info
      this.secondStepVisible = true
    },
    handleCloseSecondStep() {
      this.secondStepVisible = false
    },
    handleToThirdStep(bookid) {
      this.wordInfo.bookid = bookid
      this.thirdStepVisible = true
    },
    handleCloseThirdStep() {
      this.thirdStepVisible = false
    },
    handleBackToSecondStep() {
      this.thirdStepVisible = false
    },
    handleCloseNewCard() {
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
.newcard
  background-color #f2f2f2
  filled()
  position relative
</style>

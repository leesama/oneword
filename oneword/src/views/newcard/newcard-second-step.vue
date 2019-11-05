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
        <div
          v-for="(item, index) in userInfo.booklist"
          :key="index"
          @click="handleClickBook(index)"
        >
          <img :src="item.picpath" alt />
          <span :class="{wordcolor:item.picpath}">{{item.bookname}}</span>
          <i class="iconfont" :class="{select:selectBookIndex===index}" ref="icon">&#xe629;</i>
        </div>
        <div @click="handleShowNewWork">
          <p>
            <span>新建文集</span>
          </p>
        </div>
      </main>
    </scroll-base>
    <new-book :visible="newBookVisible" @update="handleUpdatedNewBook" @close="handleCloseNewBook" />
  </div>
</template>

<script>
import { vuexMethondAndGetter } from '@mixins/userinfoVuex.js'
import NewBook from '../newbook/newbook.vue'
import TheHeader from '@components/detail/the-header/the-header-have-close.vue'
import ScrollBase from '@components/scroll/scroll-base/scroll-base.vue'
export default {
  name: 'newcard-second-step',
  mixins: [vuexMethondAndGetter],
  data() {
    return {
      selectBookIndex: 0,
      newWorkVisible: false,
      coverImageClipperVisible: false,
      coverImg: '',
      newBookVisible: false
    }
  },
  methods: {
    handleClickBook(i) {
      if (i === this.selectBookIndex) {
        return
      }
      this.selectBookIndex = i
      this.$anime({
        targets: this.$refs.icon[i],
        keyframes: [{ scale: 0.5 }, { scale: 1.2 }, { scale: 1 }],
        easing: 'linear',
        direction: 'normal',
        duration: 500
      })
    },
    handleToThirdStep() {
      this.$emit(
        'toThirdStep',
        this.userInfo.booklist[this.selectBookIndex].bookid
      )
    },
    handleClose() {
      this.$emit('closeSecondStep')
    },
    handleShowNewWork() {
      this.newBookVisible = true
    },
    handleUpdatedNewBook() {
      this.selectBookIndex = this.userInfo.booklist.length - 1
      this.newBookVisible = false
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    handleCloseNewBook() {
      this.newBookVisible = false
    }
  },
  components: { TheHeader, ScrollBase, NewBook }
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
      &>span
        position absolute
      .wordcolor
        color #fefefe
      img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
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
</style>

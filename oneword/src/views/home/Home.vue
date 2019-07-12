<template>
  <div class="home-content">
    <the-header>
      <template #mid>
        <span>订阅</span>
      </template>
      <template #right>
        <i class="iconfont icon-fanhui"></i>
      </template>
    </the-header>

    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <yiyan-loading :scrollDistance="scrollDistance" :scrolled="scrolled" :touchEnd="touchEnd" />
        <div class="scroll-item" v-for="(item, index) in emojis" :key="index">{{item}}</div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@components/the-header/the-header'
import TheFooter from '@components/the-footer/the-footer.vue'
import YiyanLoading from '@components/yiyan-loading/yiyan-loading.vue'
import BScroll from '@better-scroll/core'
import { random } from '@util/common.js'
export default {
  name: 'Home',
  data () {
    return {
      scrollDistance: 0,
      touchEnd: 0,
      scrolled: 0,
      flick: 0,
      emojis: [
        '👉🏼 😁 😂 🤣 👈🏼',
        '😄 😅 😆 😉 😊',
        '😫 😴 😌 😛 😜',
        '👆🏻 😒 😓 😔 👇🏻',
        '😑 😶 🙄 😏 😣',
        '😞 😟 😤 😢 😭',
        '🤑 😲 ☹️ 🙁 😖',
        '👍 👎 👊 ✊ 🤛',
        '☝️ ✋ 🤚 🖐 🖖',
        '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
        '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
        '🌖 🌗 🌘 🌑 🌒'
      ]
    }
  },
  mounted () {
    this.initScroll()
    window.addEventListener('tap', () => {
      // console.log(2)
    })
  },
  beforeDestroy () {
    this.bs.destroy()
  },
  methods: {
    initScroll () {
      this.bs = new BScroll(this.$refs.scroll, {
        tap: 'tap',
        flickLimitTime: '2000',
        flickLimitDistance: '500',
        scrollX: true,
        scrollY: false,
        probeType: 3,
        bounceTime: 2000,
        bounce: {
          right: true
        }
      })
      this.bs.on('scroll', e => {
        this.scrollDistance = e.x
      })
      this.bs.on('beforeScrollStart', () => {
        this.scrolled = random(16)
      })
      this.bs.on('touchEnd', e => {
        this.touchEnd = e.x
      })
    }
  },
  components: { TheHeader, YiyanLoading, TheFooter }
}
</script>
<style lang='stylus' scoped>
.home-content
  background-color #efefef
  position absolute
  height 100%
  width 100%
  display flex
  flex-direction column
  overflow hidden
  .scroll-wrapper
    flex 1
    white-space nowrap
    overflow hidden
    display flex
    align-items center
    .scroll-content
      display inline-flex
      align-items center
    .scroll-item
      // vertical-align center
      height 1100px
      line-height 1100px
      font-size 24px
      display inline-block
      vertical-align top
      text-align center
      padding 0 10px
</style>

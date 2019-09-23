<template>
  <div id="app" @touchmove.prevent>
    <transition :name="transitionName">
      <keep-alive :exclude="excludePageNames">
        <router-view />
      </keep-alive>
    </transition>
    <loading-error />
    <music-player />
    <loading-font v-if="LoadingShow" />
  </div>
</template>
<script>
import MusicPlayer from '@components/music/music-player/music-player'
import LoadingError from '@components/loading/loading-error/loading-error.vue'
import LoadingFont from '@components/loading/loading-font/loading-font'
import { getFont } from '@models'
export default {
  data() {
    return {
      contentShow: false,
      LoadingShow: false,
      transitionName: '',
      excludePageNames: []
    }
  },

  // 如果缓存中有值，设置字体之后展示内容界面，如果没值，展示loading界面，设置字体，展示内容
  async mounted() {
    // const cacheStatus = await this.Cached()
    // if (cacheStatus === true) {
    //   await this.setFont()
    //   this.showContent()
    // } else {
    //   this.showLoading()
    //   await this.setFont()
    //   this.hideLoading()
    //   this.showContent()
    // }
    await this.setFont()
    this.showContent()
  },
  methods: {
    // 直接读cache
    async Cached() {
      const cacheKey = await window.caches.keys()
      return cacheKey.some(key => key.includes('precache'))
    },
    showLoading() {
      this.LoadingShow = true
    },
    hideLoading() {
      this.LoadingShow = false
    },
    showContent() {
      this.contentShow = true
    },

    async setFont() {
      const font = await getFont()
      this._addFont(font)
    },
    _addFont(font) {
      let style = document.createElement('style')
      style.rel = 'stylesheet'
      document.head.appendChild(style)
      style.textContent = font
    }
  },
  watch: {
    $route(to, from) {
      // 动态绑定transition
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
      // 动态绑定keepalive exclude
      // 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。
      if (from.path === '/crosstime' && to.path === '/choose-crosstime') {
        if (!this.excludePageNames.includes('crosstime')) {
          this.excludePageNames.push('crosstime')
        }
      } else if (from.path === '/comment' && to.path === '/home') {
        if (!this.excludePageNames.includes('comment')) {
          this.excludePageNames.push('comment')
        }
      } else {
        // 一直不需要缓存的页面
        this.excludePageNames = ['hot-comment']
      }
    }
  },
  components: { LoadingFont, LoadingError, MusicPlayer }
}
</script>
<style lang="stylus">
@import '~@common/stylus/mixins.styl'
#app
  backface-visibility hidden
  perspective 1000
  transform translateZ(0)
  transform-style preserve-3d
  filled()
// 转场动画
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active
  transition transform 300ms
  // 这里设置fixed  让每一个页面的动画运行的时候脱离文档流，防止
  position fixed
.slide-right-enter
  transform translate3d(-100%, 0, 0)
  transition-timing-function ease-in
.slide-left-enter
  transform translate3d(100%, 0, 0)
  transition-timing-function ease-in
</style>

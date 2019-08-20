<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <the-footer />
    <loading-error></loading-error>
    <loading-font v-if="LoadingShow"></loading-font>
  </div>
</template>
<script>
import LoadingError from '@components/loading/loading-error/loading-error.vue'
import LoadingFont from '@components/loading/loading-font/loading-font'
import TheFooter from '@components/detail/the-footer/the-footer'
import { getfont } from '@models'
export default {
  data () {
    return {
      contentShow: false,
      LoadingShow: false,
      transitionName: ''
    }
  },
  // 如果缓存中有值，设置字体之后展示内容界面，如果没值，展示loading界面，设置字体，展示内容
  async mounted () {
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
    async Cached () {
      const cacheKey = await window.caches.keys()
      return cacheKey.some(key => key.includes('precache'))
    },
    showLoading () {
      this.LoadingShow = true
    },
    hideLoading () {
      this.LoadingShow = false
    },
    showContent () {
      this.contentShow = true
    },

    async setFont () {
      const font = await getfont()
      this._addFont(font)
    },
    _addFont (font) {
      let style = document.createElement('style')
      style.rel = 'stylesheet'
      document.head.appendChild(style)
      style.textContent = font
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/crosstime') {
        this.transitionName = 'hometocrosstime'
      } else if (to.path === '/home' && from.path === '/crosstime') {
        this.transitionName = 'crosstimetohome'
      } else {
        this.transitionName = ''
      }
    }
  },
  components: { LoadingFont, LoadingError, TheFooter }
}
</script>
<style lang="stylus">
.hometocrosstime-enter
  transform translate3d(100%, 0, 0)
.hometocrosstime-enter-active
  transition all 0.3s
.hometocrosstime-enter-to
  transform translate3d(0, 0, 0)
.hometocrosstime-leave
  transform translate3d(0, 0, 0)
.hometocrosstime-leave-active
  transition all 0.3s
.hometocrosstime-leave-to
  transform translate3d(-30%, 0, 0)
.crosstimetohome-enter
  transform translate3d(-30%, 0, 0)
.crosstimetohome-enter-active
  transition all 0.3s
.crosstimetohome-enter-to
  transform translate3d(0, 0, 0)
.crosstimetohome-leave
  transform translate3d(0, 0, 0)
.crosstimetohome-leave-active
  transition all 0.3s
.crosstimetohome-leave-to
  transform translate3d(100%, 0, 0)
</style>

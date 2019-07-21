<template>
  <div id="app">
    <!-- <router-view v-if="contentShow" /> -->
    <router-view />
    <loading-font v-if="LoadingShow"></loading-font>
  </div>
</template>
<script>
import LoadingFont from '@components/loading-font/loading-font'
import { getfont } from '@models'
export default {
  data () {
    return {
      contentShow: false,
      LoadingShow: false
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
  components: { LoadingFont }
}
</script>
<style lang="stylus"></style>

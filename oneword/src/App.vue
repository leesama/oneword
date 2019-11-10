<template>
  <div id="app" @touchmove.prevent>
    <transition :name="transitionName" v-if="contentVisible">
      <keep-alive :exclude="excludePageNames">
        <router-view />
      </keep-alive>
    </transition>
    <music-player />
    <loading-font v-if="loadingVisibile" />
    <loading-mask />
  </div>
</template>
<script>
import LoadingMask from '@components/loading/loading-mask/mask.vue'
import MusicPlayer from '@components/music/music-player/music-player'
import LoadingFont from '@components/loading/loading-font/loading-font'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      contentVisible: false,
      loadingVisibile: false,
      transitionName: '',
      excludePageNames: []
    }
  },
  async created() {
    // 用户登录后请求并缓存数据到vuex
  },

  async mounted() {
    // 开发环境无法调试pwa,无法访问cached,不获取cached
    if (process.env.NODE_ENV === 'development') {
      await this.setFont()
      this.showContent()
    } else {
      // 如果字体已经缓存了，设置字体之后展示内容界面，如果没缓存，展示loading界面，设置字体，展示内容
      const cacheStatus = await this.Cached()
      if (cacheStatus === true) {
        await this.setFont()
        this.showContent()
      } else {
        this.showLoading()
        await this.setFont()
        this.hideLoading()
        this.showContent()
      }
    }
  },
  methods: {
    ...mapMutations({ setUserInfoAndBookList: 'SET_USERINFO_AND_BOOKLIST' }),
    // 获取数据缓存状态
    async Cached() {
      const cacheKey = await window.caches.keys()
      return cacheKey.some(key => key.includes('precache'))
    },
    showLoading() {
      this.loadingVisibile = true
    },
    hideLoading() {
      this.loadingVisibile = false
    },
    showContent() {
      this.contentVisible = true
    },
    // 设置字体
    async setFont() {
      const FontArray = [
        'FZQingKeBenYueSongS-R-GB',
        'FZShuSong-Z01S',
        'FZSongYi-Z13S',
        'FZSuXinShiLiuKaiS-R-GB',
        'FZZhengHeiS-EL-GB'
      ]
      for (const f of FontArray) {
        const fontP = new FontFace(f, `url(/yiyan/fonts/${f}.ttf)`, {
          style: 'normal',
          weight: 'normal'
        })
        const font = await fontP.load()
        document.fonts.add(font)
      }
    }
  },
  watch: {
    $route(to, from) {
      // 动态绑定transition
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right'
      } else if (to.path === '/new-word') {
        this.transitionName = 'slide-top'
      } else if (from.path === '/new-word') {
        this.transitionName = 'slide-bottom'
      } else {
        this.transitionName = ''
      }
      // 动态绑定keepalive exclude
      // 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。
      if (from.path === '/crosstime' && to.path === '/choose-crosstime') {
        if (!this.excludePageNames.includes('crosstime')) {
          this.excludePageNames.push('crosstime')
        }
      } else if (from.path === '/mine' && to.path === '/login') {
        // 用户退出的时候,清除所有缓存的页面
        // 这里通过$router对象找出所有的页面对象数组，组成不需要缓存的页面数组
        this.excludePageNames = this.$router.options.routes.map(
          i => i.component.name
        )
      } else {
        // 一直不需要缓存的页面组件名
        this.excludePageNames = ['comment', 'new-word', 'register-login']
      }
    }
  },
  computed: {
    ...mapGetters(['userInfoAndBookList'])
  },
  components: { LoadingFont, MusicPlayer, LoadingMask }
}
</script>
<style lang="stylus">
@import '~@common/stylus/mixins.styl'
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  backface-visibility hidden
  perspective 1000
  transform translateZ(0)
  transform-style preserve-3d
  filled()
  overflow hidden
// 转场动画
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active
  transition transform 300ms
  // 这里设置fixed  让每一个页面的动画运行的时候脱离文档流
  position fixed
.slide-right-enter
  transform translate3d(-100%, 0, 0)
  transition-timing-function ease-in
.slide-left-enter
  transform translate3d(100%, 0, 0)
  transition-timing-function ease-in
.slide-top-enter-active, .slide-top-leave-active, .slide-bottom-leave-active
  transition transform 300ms
  position fixed
.slide-bottom-leave-active
  // 这里因为newcard页面设置了relative,fixed定位没有覆盖掉，设置其优先级，然后设置leave的层级比enter的高
  transition transform 300ms
  position fixed !important
  z-index 9999
.slide-top-enter, .slide-bottom-leave-to
  transform translate3d(0, 100%, 0)
</style>

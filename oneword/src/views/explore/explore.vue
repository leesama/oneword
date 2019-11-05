<template>
  <div class="container">
    <header class="border-bottom">
      <div>
        <span
          ref="hot"
          @click="handleHotClick"
          :class="{headerclick:headerIndex===0?true:false }"
        >热门</span>
        <span
          ref="explore"
          @click="handleExploreClick"
          :class="{headerclick:headerIndex===1?true:false }"
        >发现</span>
        <div class="slide-bar" ref="slideBar"></div>
      </div>
      <div>
        <i class="iconfont">&#xe67e;</i>
      </div>
    </header>
    <main>
      <base-scroll
        :momentum="false"
        :probeType="3"
        :listenScroll="true"
        tap="tap"
        :scrollX="true"
        @scroll="scroll"
        ref="baseScroll"
        :beforeScroll="true"
        @beforeScroll="beforeScroll"
        :scrollEnd="true"
        @scrollEnd="scrollEnd"
        :touchEnd="true"
        @touchEnd="touchEnd"
        :directionLockThreshold="0"
        :momentumLimitDistance="30"
        :nestedScroll="true"
      >
        <div class="tab-container" ref="tabs">
          <div class="hot-tab tab" ref="hotTab">
            <Hot
              ref="hotScoll"
              @cardContainerShow="handleCardContainerShow"
              @cardContainerClose="handleCardContainerClose"
            />
          </div>
          <div class="explore-tab tab" ref="exploreTab">
            <base-scroll
              :scrollX="true"
              tap="tap"
              :nestedScroll="true"
              :bounce="{left:false,right:false}"
              :stopPropagation="true"
            >
              <div class="explore-title">
                <div
                  v-for="(item, index) in exploreTitleName"
                  :key="index"
                  :class="{exploretitleclick:exploreTitleIndex===index?true:false }"
                  @tap="handleTitleClick(index)"
                >{{item}}</div>
              </div>
            </base-scroll>
            <keep-alive>
              <router-view
                class="explore"
                @cardContainerShow="handleCardContainerShow"
                @cardContainerClose="handleCardContainerClose"
              ></router-view>
            </keep-alive>
          </div>
        </div>
      </base-scroll>
    </main>
  </div>
</template>

<script>
import Hot from './hot.vue'
import BaseScroll from '@components/scroll/scroll-base/scroll-base.vue'
export default {
  name: 'explore',
  data() {
    return {
      headerIndex: 0,
      exploreTitleIndex: 0,
      exploreTitleName: ['所有', '原创', '文字', '诗', '电影', '语录', '歌词']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.scrollBeginX = 0
      this.cardIndex = 0
      this.Tabs = this.$refs.tabs.querySelectorAll('.tab')
      this.touchEndCritical = window.innerWidth / 4
      // 两个标题的间距，用于计算slide-bar需要translate的值
      this.titleSpacing =
        this.$refs.explore.getBoundingClientRect().x -
        this.$refs.hot.getBoundingClientRect().x
    },
    // 弹出cardcontainer时需要禁用scroll,移除tranform
    handleCardContainerShow() {
      const dom = this.$refs.tabs
      // 用户还没有左右滑动的时候没有transform元素，不需要移除
      if (dom.style && dom.style.transform) {
        this.transformStyle = dom.style.transform
        const tranformLeft = this.transformStyle.split('(')[1].split(')')[0]
        const tranformTop = this.transformStyle.split('(')[2].split(')')[0]
        this.$refs.tabs.setAttribute(
          'style',
          `position:relative;left:${tranformLeft};top:${tranformTop};`
        )
      }
    },
    // 关闭之后添加上tranfrom
    handleCardContainerClose() {
      // safari下如果用removeAttribute移除会失效，这里把之前的定位重置回去初始值
      if (this.transformStyle) {
        this.$refs.tabs.setAttribute('style', 'position:inherit;left:0;top:0;')
        this.$refs.tabs.style.transform = this.transformStyle
      }
    },
    scroll(e) {
      // 值必须在0，-414之间
      const x = Math.min(0, Math.max(-414, e.x))
      // 计算出slideBar需要位移的距离
      const slideBarTranslateValue =
        -(x / window.innerWidth) * this.titleSpacing
      this.$refs.slideBar.style.transform = `translate3d(${slideBarTranslateValue}px,0,0)`
    },

    beforeScroll() {
      this.scrollBeginTime = new Date().getTime()
    },
    touchEnd(e) {
      const offsetX = e.x - this.scrollBeginX
      // 左滑动
      if (
        (new Date().getTime() - this.scrollBeginTime < 300 && offsetX > 20) ||
        offsetX > this.touchEndCritical
      ) {
        this._scrollToLeft()
      } else if (
        // 右滑动
        (new Date().getTime() - this.scrollBeginTime < 300 && offsetX < -20) ||
        offsetX < -this.touchEndCritical
      ) {
        this._scrollToRight()
      } else {
        // 其他
        this.scrollByIndex(this.cardIndex, 300)
      }
    },
    scrollEnd(e) {
      this.scrollBeginX = e.x
    },
    scrollByIndex(index, time = 500) {
      this.$refs.baseScroll.scrollToElement(this.Tabs[index], time)
    },
    handleHotClick() {
      this._scrollToLeft()
    },
    handleExploreClick() {
      this._scrollToRight()
    },
    handleTitleClick(i) {
      this.exploreTitleIndex = i
      switch (i) {
        case 0:
          this.$router.push('/explore/all')
          break
        case 1:
          this.$router.push('/explore/origin')
          break
        case 2:
          this.$router.push('/explore/word')
          break
        case 3:
          this.$router.push('/explore/poem')
          break
        case 4:
          this.$router.push('/explore/movie')
          break
        case 5:
          this.$router.push('/explore/quotation')
          break
        case 6:
          this.$router.push('/explore/lyric')
          break
      }
    },
    _scrollToLeft() {
      this.cardIndex = this.cardIndex > 0 ? this.cardIndex - 1 : 0
      this.scrollByIndex(this.cardIndex)
      this.headerIndex = 0
    },
    _scrollToRight() {
      const maxIndex = this.Tabs.length - 1
      this.cardIndex = this.cardIndex < maxIndex ? this.cardIndex + 1 : maxIndex
      this.scrollByIndex(this.cardIndex)
      this.headerIndex = 1
    }
  },
  components: { BaseScroll, Hot }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.container
  background-color #f2f2f2
  filled()
  display flex
  flex-direction column
  header
    font-family FZQingKeBenYueSongS-R-GB
    font-size 45px
    color #a0a0a0
    display grid
    grid-template-columns 100px auto 100px
    height 130px
    background-color #f7f7f7
    align-items center
    .headerclick
      color #4a4a4a
    div:nth-child(1)
      position relative
      justify-self center
      grid-column-start 2
      grid-column-end 3
      span:nth-child(1)
        padding 34px
      span:nth-child(2)
        padding 34px
      .slide-bar
        position absolute
        width 36px
        height 6px
        background-color #7190a9
        bottom -40px
        left 58px
    div:nth-child(2)
      justify-self end
      padding-right 65px
      i
        font-size 55px
  .border-bottom
    &:before
      border-color #e8e8e8 !important
    &:after
      border-color #e8e8e8 !important
  main
    flex 1
    display flex
    .tab-container
      display inline-flex
      height 100%
      .tab
        width 100vw
        display flex
        flex-direction column
        .scroll-wrapper
          height 126px
        .explore-title
          background-color #f7f7f7
          height 126px
          normalFont()
          width 120vw
          justify-content space-around
          display inline-flex
          align-items center
          font-size 38px
          div
            flex 1
            height 100%
            center()
            color #a0a0a0
          .exploretitleclick
            color #4a4a4a
        .explore
          height 0
          flex 1
.scroll-wrapper >>> .bscroll-indicator
  background-color #a6a6a6 !important
  width 15px !important
.scroll-wrapper >>> .bscroll-vertical-scrollbar
  // top 132px !important
</style>

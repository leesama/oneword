<template>
  <div>
    <img :src="imgSrc" ref="img" class="rotating" v-if="musicImgVisible" @click="handleClick" />
    <audio :src="musicSrc" ref="audio" @timeupdate="updateTime" @canplay="handleCanPlay" />
    <transition name="panel" @enter="handlePanelEnter">
      <music-panel
        v-if="panelVisible"
        :cardInfo="musicInfo"
        class="music-panel"
        @back="handleClosePanel"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MusicPanel from '@components/card-detail/card-detail-music/card-detail-music.vue'
export default {
  name: 'music-player',
  data() {
    return {
      panelVisible: false,
      musicImgVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'musicSrc',
      'imgSrc',
      'playing',
      'currentTime',
      'musicInfo'
    ]),
    rotatingVisible() {
      return !!this.musicSrc
    }
  },
  watch: {
    musicSrc() {
      this.showRatingImg()
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    // 判断当前时间的值是否大于1小于-1，来确定是否拖动，正常的音乐时间不会突然增大或缩小1
    currentTime(newV, oldV) {
      if (newV - oldV > 1 || newV - oldV < -1) {
        this.$refs.audio.currentTime = newV
      }
    },
    playing(newPlaying) {
      if (newPlaying) {
        this.showRatingImg()
      }
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (newPlaying) {
          audio.play()
          this.rotate()
        } else {
          audio.pause()
          clearInterval(this.interval)
          this.interval = null
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setDuration: 'SET_DURATION',
      setCurrentTime: 'SET_CURRENTTIME'
    }),
    // 如果旋转图片没显示 让其显示
    showRatingImg() {
      if (!this.musicImgVisible) {
        this.musicImgVisible = true
      }
    },
    handleClick() {
      this.panelVisible = true
    },
    // 关闭panel的时候没播放音乐关闭旋转图片 清空旋转标识 显示隐藏的
    handleClosePanel() {
      if (!this.playing) {
        this.musicImgVisible = false
        clearInterval(this.interval)
        this.interval = null
        this.rotateVal = 0
      }
      this.$anime.set(this.$refs.img, {
        zIndex() {
          return 999
        },
        opacity() {
          return 1
        }
      })
      this.panelVisible = false
    },
    handleCanPlay() {
      this.rotateBack()
      this.rotateVal = 0
      this.rotate()
      this.setDuration(this.$refs.audio.duration)
    },
    updateTime(e) {
      this.setCurrentTime(e.target.currentTime)
    },
    rotate() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.rotateVal += 1
          this.$refs.img.style.transform = `rotate( ${this.rotateVal}deg)`
          this.$refs.img.style.transition = '0.1s linear'
        }, 20)
      }
    },
    rotateBack() {
      this.$refs.img.style.transform = 'rotate(0deg)'
    },
    handlePanelEnter() {
      this.$anime({
        targets: this.$refs.img,
        easing: 'linear',
        opacity: 0,
        duration: 200,
        complete: () => {
          this.$anime.set(this.$refs.img, {
            zIndex() {
              return 997
            }
          })
        }
      })
    }
  },
  components: { MusicPanel }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.rotating
  z-index 9999
  center()
  bottom 180px
  right 30px
  border 16px solid $Gray
  position fixed
  height 100px
  width 100px
  border-radius 50%
.music-panel
  z-index 9998
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color #fefefe
.panel-enter
  transform translate3d(0, 100%, 0)
.panel-enter-active
  transition all 300ms ease-out
.panel-enter-to
  transform translate3d(0, 0, 0)
.panel-leave
  transform translate3d(0, 0, 0)
.panel-leave-active
  transition all 300ms ease-out
.panel-leave-to
  transform translate3d(0, 100%, 0)
</style>

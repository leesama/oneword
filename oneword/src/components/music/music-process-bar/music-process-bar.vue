<template>
  <div class="process-bar">
    <span>{{runTime}}</span>
    <div class="bar" ref="bar">
      <div class="process" ref="process">
        <div
          class="process-btn"
          ref="processBtn"
          @touchstart.prevent="processTouchStart"
          @touchmove.prevent="processTouchMove"
          @touchend="processTouchEnd"
        ></div>
      </div>
    </div>
    <span>{{endTime}}</span>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'music-process-bar',
  data() {
    return {
      runTime: '0:00',
      endTime: '0:00'
    }
  },
  props: {
    musicSrc: { type: String, default: '' }
  },

  created() {
    this.touch = {}
  },
  mounted() {
    this.processBtnWidth = this.$refs.processBtn.clientWidth
    this.processTotalWidth = this.$refs.bar.clientWidth - this.processBtnWidth
    if (this.stateMusicSrc === this.musicSrc) {
      this.barRun()
    }
  },
  beforeDestroy() {
    if (this.cancelCurrentTimeWatch) {
      this.cancelCurrentTimeWatch()
      this.cancelPlayingWatch()
    }
  },
  computed: {
    ...mapGetters({
      stateMusicSrc: 'musicSrc',
      duration: 'duration',
      currentTime: 'currentTime',
      playing: 'playing'
    })
  },

  methods: {
    ...mapMutations({ setCurrentTime: 'SET_CURRENTTIME' }),
    // 当前播放的音乐是这个进度条对应的音乐时才可以拖动进度条
    processTouchStart(e) {
      if (this.canTouch) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.process.clientWidth - this.processBtnWidth
      }
    },
    processTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(
        this.processTotalWidth,
        Math.max(0, this.touch.left + deltaX)
      )
      this.offset(offsetWidth)
    },
    processTouchEnd() {
      if (this.canTouch) {
        this.touch.initiated = false
        this._setProcess()
      }
    },
    _setProcess() {
      const sec =
        ((this.$refs.process.clientWidth - this.processBtnWidth) /
          this.processTotalWidth) *
        this.duration
      this.setCurrentTime(sec)
    },
    offset(offsetWidth) {
      this.$refs.process.style.width = `${this.processBtnWidth + offsetWidth}px`
    },
    // current派发不会立马停止，延迟20秒再重置状态，否则重置无效
    resetUi() {
      setTimeout(() => {
        this.offset(0)
        this.runTime = '0:00'
        this.endTime = '0:00'
      }, 20)
    },
    format(sec) {
      sec = sec | 0
      const minute = (sec / 60) | 0
      const second = sec % 60
      return `${minute}:${
        second.toString().length === 1 ? `0${second}` : second
      }`
    },
    barRun() {
      // 标识当前bar可以拖动
      this.canTouch = true
      // 监听播放时间
      this.cancelCurrentTimeWatch = this.$store.watch(
        state => state.music.currentTime,
        newV => {
          if (!this.touch.initiated) {
            this.offset((newV / this.duration) * this.processTotalWidth)
            this.runTime = this.format(newV)
            this.endTime = this.format(this.duration - newV)
          }
        }
      )
      // 监听播放状态
      this.cancelPlayingWatch = this.$store.watch(
        state => state.music.playing,
        newV => {
          if (newV === false) {
            setTimeout(() => {
              this.lastRunTime = this.runTime
              this.lastEndTime = this.endTime
              this.lastProcessWidth = this.$refs.process.style.width
              this.resetUi()
            }, 20)
          } else {
            this.runTime = this.lastRunTime
            this.endTime = this.lastEndTime
            this.$refs.process.style.width = this.lastProcessWidth
          }
        }
      )
    }
  },
  watch: {
    stateMusicSrc(newV, oldV) {
      // 如果store的音乐src和bar对应的音乐src一致,监听播放时间
      if (newV === this.musicSrc) {
        this.barRun()
      } else if (oldV === this.musicSrc) {
        // 如果store的上一次的音乐src和bar对应的音乐src一致,表示之前播放的这个进度条对应的音乐，取消之前的监听器,禁止拖动,清除之前保存的变量
        this.cancelCurrentTimeWatch()
        this.cancelPlayingWatch()
        this.resetUi()
        this.canTouch = false
        this.runTime = null
        this.endTime = null
        this.lastProcessWidth = null
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.process-bar
  display flex
  align-items center
  margin-left 80px
  margin-right 80px
  height 80px
  margin-bottom 170px
  span
    display flex
    align-items center
    justify-content center
    width 150px
    height 80px
    color #b3b3b3
  .bar
    width 100%
    border-radius 200px
    margin-left 40px
    margin-right 40px
    height 15px
    background-color #ebebeb
    display flex
    .process
      background-color #9b9b9b
      height 15px
      width 15px
      border-radius 200px
      display flex
      justify-content flex-end
    .process-btn
      position relative
      background-color #9b9b9b
      height 15px
      width 15px
      border-radius 50%
      // border-radius 50%
      &:before
        content ''
        position absolute
        top -100px
        right -100px
        bottom -100px
        left -100px
</style>

<template>
  <div class="icon" @tap.stop="handleTap">
    <i class="iconfont play" :class="{pause:isPlaying}" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'music-player-control',
  data() {
    return {
      isPlaying: false
    }
  },
  props: {
    musicSrc: { type: String, default: '' },
    imgSrc: { type: String, default: '' },
    cardInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  beforeDestroy() {
    if (this.cancelPlayingWatch) {
      this.cancelPlayingWatch()
    }
  },
  mounted() {
    // 如果当前是播放状态,并且当前control对应的是当前state的MusicSrc，设置为播放状态 control开始监听
    if (this.isCurrentCard && this.playing === true) {
      this.controlRun()
    }
  },
  computed: {
    ...mapGetters({ stateMusicSrc: 'musicSrc', playing: 'playing' }),
    isCurrentCard() {
      return this.stateMusicSrc === this.musicSrc
    }
  },
  methods: {
    ...mapActions(['setMusicState']),
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    controlRun() {
      this.isPlaying = true
      this.cancelPlayingWatch = this.$store.watch(
        state => state.music.playing,
        newV => {
          this.isPlaying = newV
        }
      )
    },
    handleTap() {
      // 需要切换到的状态
      this.isPlaying = !this.isPlaying
      // 如果要切换到播放状态
      if (this.isPlaying) {
        if (this.isCurrentCard) {
          this.setPlayingState(true)
        } else {
          //
          this.setMusicState({
            musicSrc: this.musicSrc,
            imgSrc: this.imgSrc,
            musicInfo: this.cardInfo
          })
        }
      } else {
        this.setPlayingState(false)
      }
    }
  },
  watch: {
    // 如果state src新值和当前一致，说明现在播放的是这个control对应的音乐，把他设置播放状态,并监听播放状态
    // 如果state src旧值和当前一致，说明之前播放的是这个control对应的音乐，把他设为暂停状态
    stateMusicSrc(newV, oldV) {
      if (newV === this.musicSrc) {
        this.controlRun()
      } else if (oldV === this.musicSrc) {
        this.cancelPlayingWatch()
        this.isPlaying = false
      }
    },
    playing(newV) {}
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.icon
  margin-left auto
  margin-right auto
  height 200px
  width 200px
  margin-top -62.5px
  center()
  i
    font-size 75px
    color #4a4a4a
</style>

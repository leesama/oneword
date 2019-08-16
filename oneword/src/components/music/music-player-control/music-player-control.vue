<template>
  <i class="iconfont play" :class="{pause:isPlaying} " @tap="handleTap" />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'music-player',
  data () {
    return {
      isPlaying: false
    }
  },
  props: {
    musicSrc: { type: String, default: '' },
    imgSrc: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({ stateMusicSrc: 'musicSrc' })
  },
  methods: {
    ...mapActions(['setMusicState']),
    ...mapMutations({ setPlayingState: 'SET_PLAYING_STATE' }),
    handleTap () {
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.stateMusicSrc === this.musicSrc
          ? this.setPlayingState(true)
          : this.setMusicState({ musicSrc: this.musicSrc, imgSrc: this.imgSrc })
      } else {
        this.setPlayingState(false)
      }
    }
  },
  watch: {
    stateMusicSrc (newMusicSrc) {
      if (newMusicSrc !== this.musicSrc) {
        this.isPlaying = false
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
i
  font-size 75px
  color #4a4a4a
</style>

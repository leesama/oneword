<template>
  <div>
    <img :src="imgSrc" ref="img" class="rotating" v-if="rotatingVisible" />
    <audio :src="musicSrc" ref="audio" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'music-player',
  computed: {
    ...mapGetters(['musicSrc', 'imgSrc', 'playing']),
    rotatingVisible () {
      return !!this.musicSrc
    }
  },
  watch: {
    musicSrc () {
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.rotateBack()
        this.rotateVal = 0
        if (!this.interval) {
          this.rotate()
        }
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (newPlaying) {
          audio.play()
          this.rotate()
        } else {
          audio.pause()
          clearInterval(this.interval)
        }
      })
    }
  },
  methods: {
    rotate () {
      this.interval = setInterval(() => {
        const img = this.$refs.img
        this.rotateVal += 1
        img.style.transform = 'rotate(' + this.rotateVal + 'deg)'
        img.style.transition = '0.1s linear'
      }, 100)
    },
    rotateBack () {
      this.$refs.img.style.transform = 'rotate(0deg)'
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.rotating
  center()
  bottom 180px
  right 30px
  border 16px solid #f2f2f2
  position fixed
  height 100px
  width 100px
  border-radius 50%
</style>

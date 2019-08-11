<template>
  <div class="imgwrapper">
    <img v-lazy="src" :class="{radius:isRadius}" alt />
  </div>
</template>

<script>
export default {
  name: 'card-base-img',
  props: {
    imgType: {
      type: Number,
      default () {
        return 1
      }
    },
    src: {
      type: String
    },
    radius: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  computed: {
    isRadius () {
      return this.radius
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.imgwrapper
  center()
  height 100%
  overflow hidden
.radius
  border-radius 50%
  height 433px
  width 433px
img
  width 100%
</style>

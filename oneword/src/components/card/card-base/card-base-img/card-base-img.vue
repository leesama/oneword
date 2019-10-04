<template>
  <div class="imgwrapper">
    <img v-lazy="src" :key="src" :class="{radius:isRadius}" alt />
  </div>
</template>

<script>
export default {
  name: 'card-base-img',
  props: {
    src: {
      type: String
    },
    radius: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isRadius() {
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
  img
    object-fit cover
    width 100%
    height 100%
    transition all 0.3s
  .radius
    border-radius 50%
    height 433px
    width 433px
    transition all 0.3s
</style>

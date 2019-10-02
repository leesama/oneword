<template>
  <button-base iconFontCode="&#xe618;" :numberVisible="false" @click="handleclick"></button-base>
</template>

<script>
import ButtonBase from '../button-base/button-base.vue'
export default {
  name: 'button-close',
  methods: {
    handleclick() {
      this.$emit('click')
    }
  },
  components: { ButtonBase }
}
</script>
<style lang='stylus' scoped>
.button
  height 100px
  width 100px
  padding-top 20px
  padding-bottom 20px
  & >>> i
    font-size 60px
</style>

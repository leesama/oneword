<template>
  <Button class="button" :numberVisible="false" iconFontCode="&#xe667;" @click="handleClick"></Button>
</template>

<script>
import Button from '../button-base/button-base.vue'
export default {
  name: 'button-share',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  components: { Button }
}
</script>
<style lang='stylus' scoped>
.button >>>i
  font-size 50px
</style>

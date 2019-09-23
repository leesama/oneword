<template>
  <Button :number="number" iconFontCode="&#xe64f;" @click="handleClick"></Button>
</template>

<script>
import Button from '../button-base/button-base.vue'
export default {
  name: 'button-reply',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  props: { number: { type: Number, default: 0 } },
  components: { Button }
}
</script>
<style lang='stylus' scoped></style>

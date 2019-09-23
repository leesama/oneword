<template>
  <Button :number="number" iconFontCode="&#xe616;" @click="handleClick"></Button>
</template>

<script>
import Button from '../button-base/button-base.vue'

export default {
  name: 'button-collect',
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

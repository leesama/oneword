<template>
  <Button :number="number" iconFontCode="&#xe617;" @click="handleClick" />
</template>

<script>
import Button from '../button-base/button-base.vue'
export default {
  name: 'button-like',
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

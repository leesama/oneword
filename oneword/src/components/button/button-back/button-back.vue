<template>
  <Button :numberVisible="false" iconFontCode="&#xe612;" @click="handleClick"></Button>
</template>

<script>
import Button from '../button-base/button-base.vue'
export default {
  name: 'button-back',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  components: { Button }
}
</script>
<style lang='stylus' scoped></style>

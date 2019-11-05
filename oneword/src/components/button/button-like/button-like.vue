<template>
  <Button
    :number="number"
    :iconFontCode="liked?'&#xe61b;':'&#xe617;'"
    ref="button"
    @click="handleClick"
  />
</template>

<script>
import Button from '../button-base/button-base.vue'
export default {
  name: 'button-like',
  methods: {
    handleClick() {
      this.$anime({
        targets: this.$refs.button.$el,
        scale: 1.2,
        easing: 'easeInCubic',
        direction: 'alternate',
        duration: 200
      })
      this.$emit('click')
    }
  },
  // 根据color来切换喜欢按钮图标
  props: {
    number: { type: Number, default: 0 },
    liked: { type: Boolean, default: false }
  },
  components: { Button }
}
</script>
<style lang='stylus' scoped></style>

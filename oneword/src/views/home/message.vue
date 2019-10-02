<template>
  <div class="container">
    <the-header>
      <template #mid>
        <span>信息</span>
      </template>
      <template #right>
        <!-- <router-link tag="i" class="iconfont" to="/">&#xe612;</router-link> -->
      </template>
    </the-header>
  </div>
</template>

<script>
import TheHeader from '@components/detail/the-header/the-header.vue'
export default {
  name: 'message',
  components: { TheHeader }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.container
  filled()
</style>

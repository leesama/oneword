<template>
  <div>
    <span>你来到了无人之地</span>
    <span>404</span>
  </div>
</template>

<script>
export default {
  name: 'notfound'
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
div
  filled()
  background linear-gradient(to bottom, #f7f7f7, #aeaeae)
  display flex
  flex-direction column
  align-items center
  span:first-child
    margin-top 500px
    margin-bottom 400px
    font-size 60px
    color #4a4a4a
  span:last-child
    font-size 200px
    color #4a4a4a
</style>

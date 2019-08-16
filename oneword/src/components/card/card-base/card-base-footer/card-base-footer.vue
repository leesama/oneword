<template>
  <div class="card-footer border-top">
    <div>
      <i class="iconfont">&#xe616;</i>
      {{collectcnt}}
    </div>
    <div>
      <i class="iconfont">&#xe64f;</i>
      {{replycnt}}
    </div>
    <div>
      <i class="iconfont">&#xe617;</i>
      {{likecnt}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-base-footer',
  props: {
    replycnt: {
      type: Number,
      default: 0
    },
    collectcnt: {
      type: Number,
      default: 0
    },
    likecnt: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang='stylus' scoped>
.card-footer
  font-size 30px
  font-family FZZhengHeiS-EL-GB
  width 100%
  display grid
  grid-template-columns repeat(3, 1fr)
  align-items center
  justify-items center
  // 这里直接设置高度而不使用grid-template-rows 是因为经测试stylus-px-to-relative-unit插件不会转换grid-template-rows的px高度
  height 100%
  div
    color #9b9b9b
    i
      font-size 40px
      color #9b9b9b
      margin-right 10px
</style>

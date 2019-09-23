<template>
  <div class="header-container">
    <div class="img">
      <img :src="smallavatar" alt />
    </div>
    <div class="text">
      <p class="info">
        <span>{{username}}创建于</span>
        <span>「{{type}}」</span>
      </p>
      <p class="date">{{dateTime}}</p>
    </div>
    <div>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-detail-header',
  props: {
    dateTime: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    smallavatar: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.header-container
  height 135px
  display flex
  margin-left 30px
  margin-right 30px
  border-bottom 3px solid #efeff3
  .img
    center()
    width 90px
    height 100%
    padding-right 25px
    img
      width 90px
      height 90px
      border-radius 50%
  .info
    padding-top 35px
    font-size 36px
    margin-bottom 16px
    span:nth-child(1)
      color #555555
    span:nth-child(2)
      color #7190a9
  .date
    font-size 23px
    color #b3b3b3
</style>

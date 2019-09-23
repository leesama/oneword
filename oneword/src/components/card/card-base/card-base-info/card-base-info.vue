<template>
  <div class="cardinfo">
    <!-- type 有值才会显示 -->
    <p class="type" v-if="type">
      <span v-if="showOrigin">#原创</span>
      <span>#{{type}}</span>
    </p>
    <p class="createinfo" v-if="username">
      <span class="user">{{username}}</span>创建于
      <span class="bookname">「{{bookname}}」</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'card-base-info',
  props: {
    type: { type: String },
    original: { type: String },
    username: { type: String },
    bookname: { type: String }
  },
  computed: {
    showOrigin() {
      return this.original === '1'
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.cardinfo
  normalFont()
  color #555555
  font-size 29px
  display flex
  flex-direction column
  margin-left 17px
  margin-bottom 16px
  .type
    span:first-child
      margin-right 10px
  .createinfo
    padding-top 21px
    ellipsis()
    .user
      margin-right 10px
    .bookname
      margin-left 10px
</style>

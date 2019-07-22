<template>
  <div class="container">
    <div class="time">
      <span>{{year}}</span>
      <span>/</span>
      <span>{{month}}</span>
      <span>/</span>
      <span>{{day}}</span>
    </div>
    <div class="card border">
      <div class="card-header">
        <img
          :src="src"
          alt
        />
      </div>
      <div class="card-middle">
        <div class="cardcontent">
          <div class="cardtext">{{content}}</div>
          <p class="from">- {{from}} -</p>
        </div>
        <div class="cardinfo">
          <p class="type">#诗</p>
          <p class="createinfo">
            <span class="user">一言</span>创建于<span class="bookname">「默认文1111111111111111112333333333333332」</span>
          </p>
        </div>
      </div>
      <card-footer></card-footer>
    </div>
  </div>
</template>

<script>
import CardFooter from '@components/card-base-footer/card-base-footer.vue'
export default {
  name: 'card-home',
  data () {
    return {
      from: '威廉.格拉齐诺',
      content:
        '我想跟这片灌木丛一样，每天在这里抵抗着，既不消失，也不抱怨，更不说话。它什么都不需要，也不被征服。 ',
      src:
        'http://jhyiyan.oss-cn-beijing.aliyuncs.com/2019/07/14/9d9e3b8d6bd55a5bcfa3b27dcae212d8.jpg'
    }
  },
  props: {
    cardInfo: {
      type: Object,
      default () {
        return []
      }
    }
  },
  mounted () {},
  computed: {
    year () {
      return this.cardInfo.time.substr(0, 4)
    },
    month () {
      return this.cardInfo.time.substr(5, 2)
    },
    day () {
      return this.cardInfo.time.substr(8, 2)
    }
  },
  components: { CardFooter }
}
</script>
<style lang='stylus' scoped>
@import '~@assets/mixins.styl'
.border
  &:before
    border-color #d3d3d3
  &:after
    border-color #d3d3d3
img
  width 100%
.container
  display inline-flex
  align-items center
.time
  width 140px
  font-family FZZhengHeiS-EL-GB
  display flex
  flex-direction column
  align-items center
  color #b4b4b4
  font-size 30px
  span:nth-child(2n)
    margin 20px 0
.card
  box-shadow 0 0 60px #d3d3d3
  width 860px
  height 1535px
  background #fefefe
  display flex
  flex-direction column
  .card-header
    display flex
    justify-content center
    align-items center
    height 485px
    overflow hidden
  .card-middle
    display flex
    flex-direction column
    flex 1
    .cardcontent
      line-height 71px
      font-weight 600
      font-family FZQingKeBenYueSongS-R-GB
      font-size 42px
      white-space normal
      flex 1
      padding 121px 70px 0 61px
      display flex
      flex-direction column
      .cardtext
        flex 1
      .from
        text-align center
        margin-bottom 61px
        ellipsis()
    .cardinfo
      font-size 29px
      font-family FZZhengHeiS-EL-GB
      display flex
      flex-direction column
      margin-left 17px
      margin-bottom 16px
      .createinfo
        color #555555
        padding-top 21px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        .user
          margin-right 10px
        .bookname
          margin-left 10px
  .border-top
    &:before
      width 828px
      margin-left 16px
</style>

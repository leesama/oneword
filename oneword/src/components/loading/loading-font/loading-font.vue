<template>
  <div id="loader-wrapper">
    <div class="cssload-container">
      <div class="cssload-shaft1"></div>
      <div class="cssload-shaft2"></div>
      <div class="cssload-shaft3"></div>
      <div class="cssload-shaft4"></div>
      <div class="cssload-shaft5"></div>
      <div class="cssload-shaft6"></div>
      <div class="cssload-shaft7"></div>
      <div class="cssload-shaft8"></div>
      <div class="cssload-shaft9"></div>
      <div class="cssload-shaft10"></div>
    </div>
    <span>初次加载会缓存字体到本地,请稍等</span>
    <!-- <span id="loading-text">初次加载会缓存字体到本地,请稍等</span> -->
  </div>
</template>

<script>
export default {
  name: 'loading-font'
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'

#loader-wrapper
  background #fff
  flex-direction column
  z-index 99
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  center()
#cssload-loader
  position absolute
.cssload-container *, .cssload-container *:before, .cssload-container *:after
  box-sizing border-box
  -o-box-sizing border-box
  -ms-box-sizing border-box
  -webkit-box-sizing border-box
  -moz-box-sizing border-box
.cssload-container
  margin 49px auto
  width 58px
  height 29px
.cssload-container > div
  float left
  background rgb(0, 0, 0)
  height 100%
  width 5px
  margin-right 1px
  display inline-block
.cssload-container .cssload-shaft1
  animation-delay 0.06s
  -o-animation-delay 0.06s
  -ms-animation-delay 0.06s
  -webkit-animation-delay 0.06s
  -moz-animation-delay 0.06s
.cssload-container .cssload-shaft2
  animation-delay 0.12s
  -o-animation-delay 0.12s
  -ms-animation-delay 0.12s
  -webkit-animation-delay 0.12s
  -moz-animation-delay 0.12s
.cssload-container .cssload-shaft3
  animation-delay 0.17s
  -o-animation-delay 0.17s
  -ms-animation-delay 0.17s
  -webkit-animation-delay 0.17s
  -moz-animation-delay 0.17s
.cssload-container .cssload-shaft4
  animation-delay 0.23s
  -o-animation-delay 0.23s
  -ms-animation-delay 0.23s
  -webkit-animation-delay 0.23s
  -moz-animation-delay 0.23s
.cssload-container .cssload-shaft5
  animation-delay 0.29s
  -o-animation-delay 0.29s
  -ms-animation-delay 0.29s
  -webkit-animation-delay 0.29s
  -moz-animation-delay 0.29s
.cssload-container .cssload-shaft6
  animation-delay 0.35s
  -o-animation-delay 0.35s
  -ms-animation-delay 0.35s
  -webkit-animation-delay 0.35s
  -moz-animation-delay 0.35s
.cssload-container .cssload-shaft7
  animation-delay 0.4s
  -o-animation-delay 0.4s
  -ms-animation-delay 0.4s
  -webkit-animation-delay 0.4s
  -moz-animation-delay 0.4s
.cssload-container .cssload-shaft8
  animation-delay 0.46s
  -o-animation-delay 0.46s
  -ms-animation-delay 0.46s
  -webkit-animation-delay 0.46s
  -moz-animation-delay 0.46s
.cssload-container .cssload-shaft9
  animation-delay 0.52s
  -o-animation-delay 0.52s
  -ms-animation-delay 0.52s
  -webkit-animation-delay 0.52s
  -moz-animation-delay 0.52s
.cssload-container .cssload-shaft10
  animation-delay 0.58s
  -o-animation-delay 0.58s
  -ms-animation-delay 0.58s
  -webkit-animation-delay 0.58s
  -moz-animation-delay 0.58s
.cssload-container
  height 39px
  width 88px
  overflow hidden
.cssload-container > div
  width 8px
  position relative
  bottom -2px
  margin-top 36px
  height 3px
  transform skewY(0deg)
  animation cssload-wave 1.73s infinite ease-in-out
  -o-animation cssload-wave 1.73s infinite ease-in-out
  -ms-animation cssload-wave 1.73s infinite ease-in-out
  -webkit-animation cssload-wave 1.73s infinite ease-in-out
  -moz-animation cssload-wave 1.73s infinite ease-in-out
@keyframes cssload-wave
  25%
    transform skewY(25deg)
  50%
    height 100%
    margin-top 0
    background rgb(255, 255, 255)
    transform skewY(0)
  75%
    transform skewY(-25deg)
@keyframes cssload-wave
  25%
    -o-transform skewY(25deg)
  50%
    height 100%
    margin-top 0
    background rgb(255, 255, 255)
    -o-transform skewY(0)
  75%
    -o-transform skewY(-25deg)
@keyframes cssload-wave
  25%
    -ms-transform skewY(25deg)
  50%
    height 100%
    margin-top 0
    background rgb(255, 255, 255)
    -ms-transform skewY(0)
  75%
    -ms-transform skewY(-25deg)
@keyframes cssload-wave
  25%
    -webkit-transform skewY(25deg)
  50%
    height 100%
    margin-top 0
    background rgb(255, 255, 255)
    -webkit-transform skewY(0)
  75%
    -webkit-transform skewY(-25deg)
@keyframes cssload-wave
  25%
    -moz-transform skewY(25deg)
  50%
    height 100%
    margin-top 0
    background rgb(255, 255, 255)
    -moz-transform skewY(0)
  75%
    -moz-transform skewY(-25deg)
</style>

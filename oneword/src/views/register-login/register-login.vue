<template>
  <div class="register-login">
    <div class="circle">
      <span>一言</span>
    </div>
    <div class="center-word">
      <span>「 记录字句, 发现共鸣 」</span>
    </div>
    <button class="login-button" @click="handleClickLogin">登录</button>
    <button class="register-button" @click="handleClickRegister">注册</button>
    <transition :name="transitionName" @after-enter="handleAfterLoginEnter">
      <login
        ref="login"
        v-if="loginVisible"
        @close="handleLoginClose"
        @toRegister="handleToRegister"
      />
    </transition>
    <transition :name="transitionName" @after-enter="handleAfterRegisterEnter">
      <register
        ref="register"
        v-if="registerVisible"
        @close="handleRegisterClose"
        @toLogin="handleToLogin"
      />
    </transition>
  </div>
</template>

<script>
import Register from './register.vue'
import Login from './login.vue'
export default {
  name: 'register-login',
  data() {
    return {
      transitionName: 'toTop',
      loginVisible: false,
      registerVisible: false
    }
  },
  methods: {
    handleClickRegister() {
      this.registerVisible = true
    },
    handleLoginClose() {
      this.loginVisible = false
      this.transitionName = 'toTop'
    },
    handleAfterLoginEnter() {
      this.registerVisible = false
      setTimeout(() => {
        this.$refs.login.$el.removeAttribute('style')
      }, 20)
    },
    handleClickLogin() {
      this.loginVisible = true
    },
    handleToRegister() {
      this.transitionName = 'fade'
      this.registerVisible = true
      this.$nextTick(() => {
        this.$refs.register.$el.removeAttribute('style')
      })
      // this.loginVisible = false
    },
    handleRegisterClose() {
      this.registerVisible = false
      this.transitionName = 'toTop'
    },
    handleAfterRegisterEnter() {
      this.loginVisible = false
      setTimeout(() => {
        this.$refs.register.$el.style.zIndex = 0
      }, 20)
    },
    // login transition执行之前，设置login的层级高于register，否则transition不会正常执行
    handleToLogin() {
      this.transitionName = 'fade'
      this.loginVisible = true
      this.$nextTick(() => {
        this.$refs.login.$el.style.zIndex = 1
      })
      // this.loginVisible = false
    }
  },
  components: { Register, Login }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.toTop-enter, .toTop-leave-to
  transform translate3d(0, 100%, 0)
.toTop-enter-active, .toTop-leave-active
  transition all 0.3s
.fade-enter
  opacity 0
.fade-enter-active
  transition all 0.3s
.register-login
  filled()
  background linear-gradient(to bottom, #f7f7f7, #aeaeae)
  color #4a4a4a
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  .circle
    margin-top 210px
    margin-bottom 60px
    width 450px
    height 450px
    border-radius 50%
    background-color transparent
    border 10px solid #4a4a4a
    center()
    font2()
    span
      color #4a4a4a
      font-size 145px
      font-weight bold
  .center-word
    font-size 50px
    font-weight bold
    margin-bottom 300px
    font2()
  button
    height 120px
    width 780px
    background-color #e1e1e1
    font3()
    margin-bottom 60px
</style>

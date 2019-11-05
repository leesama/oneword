<template>
  <div class="login">
    <the-header :right="false" :transparent="false" @close="handleClose" />
    <main>
      <input type="text" placeholder="邮箱" v-model="email" />
      <input type="text" placeholder="密码" v-model="password" />

      <button class="login-button" @click="handleLogin">登录</button>

      <button class="register-button" @click="handleRegister">没有账号？注册</button>
    </main>
  </div>
</template>

<script>
import CryptoJs from 'crypto-js'
import { signIn } from '@models'
import theHeader from '@components/detail/the-header/the-header-have-close.vue'
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleRegister() {
      this.$emit('toRegister')
    },
    async handleLogin() {
      if (this.email.length === 0) {
        this.$toastMessage('请输入邮箱')
        return
      }
      if (this.password.length === 0) {
        this.$toastMessage('请输入密码')
        return
      }
      const { code, msg } = await signIn({
        email: encodeURIComponent(this.email),
        password: CryptoJs.MD5(this.password).toString()
      })
      if (code === 0) {
        this.$toastMessage('登陆成功')

        this.$router.push('/home')
      } else {
        this.$toastMessage(msg)
      }
    }
  },
  components: { theHeader }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
.login
  font3()
  background-color #f2f2f2
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  main
    display flex
    flex-direction column
    align-items center
    input
      height 145px
      background-color transparent
      width 1130px
      margin 0 60px
      font-size 50px
      &::placeholder
        color #c7c7cc
      &:first-child
        margin-top 60px
        border-bottom 1px solid #aaaaaa
    .login-button
      color #4a4a4a
      font-size 50px
      margin-top 200px
      margin-bottom 110px
      background-color transparent
      font3()
    .register-button
      font-size 42px
      color #b4b4b4
      font3()
      background-color transparent
</style>

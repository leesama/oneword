<template>
  <div class="register">
    <the-header :right="false" :transparent="false" @close="handleClose"></the-header>
    <main>
      <input type="text" placeholder="昵称（少于12个字符）" v-model="username" />
      <input type="text" placeholder="邮箱" v-model="email" />
      <input type="text" placeholder="密码" v-model="password" />

      <button class="register-button" @click="handleRegister">注册</button>
      <button class="login-button" @click="handleLoginClick">已有账号？登录</button>
      <span>现版本随意填写邮箱即可注册,不会执行验证步骤</span>
    </main>
  </div>
</template>

<script>
import CryptoJs from 'crypto-js'
import { signUp, signIn } from '@models'
import isEmail from 'validator/lib/isEmail'
import theHeader from '@components/detail/the-header/the-header-have-close.vue'
export default {
  name: 'register',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleLoginClick() {
      this.$emit('toLogin')
    },
    async handleRegister() {
      // 验证数据
      if (!isEmail(this.email)) {
        this.$toastMessage('请输入正确邮箱')
        return
      }
      if (this.email.length === 0) {
        this.$toastMessage('请输入邮箱')
        return
      }
      if (this.username.length === 0) {
        this.$toastMessage('请输入昵称')
        return
      }
      if (this.password.length === 0) {
        this.$toastMessage('请输入密码')
        return
      }
      if (this.username.length > 12) {
        this.$toastMessage('昵称长度过长')
        return
      }
      // 注册
      const { code, msg } = await signUp({
        email: encodeURIComponent(this.email),
        username: encodeURIComponent(this.username),
        password: CryptoJs.MD5(this.password).toString()
      })
      // 注册成功后登陆
      if (code === 0) {
        const { code } = await signIn({
          email: encodeURIComponent(this.email),
          password: CryptoJs.MD5(this.password).toString()
        })
        if (code === 0) {
          this.$toastMessage('注册成功,自动登录')
          this.$router.push('/home')
        } else {
          this.$toastMessage('注册成功,自动登录失败')
        }
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
.register
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
      &:nth-child(1)
        margin-top 60px
      &:nth-child(2)
        border-top 1px solid #aaaaaa
        border-bottom 1px solid #aaaaaa
    &>span
      margin-top 100px
      color #4a4a4a
      font-size 45px
    .register-button
      font3()
      font-size 50px
      margin-top 200px
      margin-bottom 110px
      color #4a4a4a
      background-color transparent
    .login-button
      font-size 42px
      color #b4b4b4
      font3()
      background-color transparent
</style>

<template>
  <div class="main">
    <template class="main">
      <van-nav-bar title="登录" @click-left="$router.back()">
        <!-- <van-icon name="cross" slot="left"/> -->
        <template #left>
          <van-icon name="cross" slot="left" />
        </template>
      </van-nav-bar>
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model.trim="mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
              message: '请输入手机号的正确格式',
            },
          ]"
        >
          <i class="toutiao toutiao-shouji" slot="left-icon"></i>
        </van-field>
        <van-field
          v-model.trim="code"
          type="number"
          name="code"
          placeholder="请输入验证码"
          :rules="[
            { required: true, message: '请输入验证码' },
            { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
          ]"
        >
          <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
          <template #button>
            <van-count-down
              v-if="isCountDown"
              :time="time"
              format="ss s"
              @finish="isCountDown = false"
            />
            <van-button
              v-else
              size="small"
              class="yzm"
              native-type="button"
              @click="OnsendSms"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" class="login"
            >登录</van-button
          >
        </div>
      </van-form>
    </template>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created() { },
  data() {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 5 * 1000,
      isCountDown: false
    }
  },
  methods: {
    async onSubmit(values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async OnsendSms() {
      try {
        await this.$refs.form.validate('mobile')
        console.log('校验通过')
        this.isCountDown = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f7f9 !important;
}
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 155px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  font-size: 22px;
  border-color: #ededed;
}
.van-button__text {
  zoom: 0.96;
}
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.yzm {
  position: fixed;
  right: 18px;
}
</style>

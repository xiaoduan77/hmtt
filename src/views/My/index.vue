<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-notlogin" v-if="$store.state.user &&$store.state.user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>喜欢</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>点赞</p>
        </li>
      </ul>
    </div>
    <!-- 登陆前 -->
    <div class="header header-login" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      class="loginout"
      v-if="$store.state.user && $store.state.user.token"
      @click="loginout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  async created() {
    if (this.$store.state.user && this.$store.state.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loginout() {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log(error)
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
.header {
  width: 750px;
  height: 401px;
  background: rgb(58, 151, 244, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-login {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}
.header-notlogin {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        padding-left: 32px;
        font-size: 30px;
        font-weight: 400;
        color: #fff;
      }
    }
    .button {
      width: 116px;
      height: 32px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: 400;
      color: #666;
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        font-weight: 400;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.loginout {
  color: #eb5253;
}
</style>

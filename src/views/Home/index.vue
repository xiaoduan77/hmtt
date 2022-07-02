<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="secrch-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"> </i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '95%', paddingTop: '1rem' }"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import ChannelPanel from '@/components/ChannelPanel.vue'
import { getItem } from '@/untils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created() {
    this.getMyChannels()
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },

  methods: {
    async getMyChannels() {
      const channels = getItem(CHANNELS)
      if (
        !(this.$store.state.user && this.$store.state.user.token) &&
        channels
      ) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style lang="less" scoped>
.secrch-btn {
  width: 555px;
  height: 64px;
  background: rgba(238, 237, 237, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid rgb(233, 233, 233);
}
//没效果就加/deep/,还没效果就加!
/deep/.van-tabs__line {
  background-color: rgb(53, 142, 243);
  width: 31px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao-gengduo {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  width: 750px;
}
.van-tabs {
  margin-top: 180px;
}
/deep/ .van-list {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>

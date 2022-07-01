<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="small"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <!-- {{active}} -->
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="tuijian-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannles } from '@/api/home'
import { setItem } from '@/untils/storage'
const CHANNELS = 'CHANNELS'
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      reuqired: true
    }
  },
  async created() {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter((item) =>
        this.channels.every((item1) => item1.id !== item.id)
      )
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add(id) {
      const index = this.recommendChannels.findIndex((item) => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick(index) {
      if (this.isCloseShow) {
        if (index === 0) return // 推荐是不能被删除的
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler(newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登陆过
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
            console.log(arr)
          })
          try {
            const res = await saveChannles(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
}
.van-row {
  padding: 0px 20px;
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  text-align: center;
  line-height: 86px;
  position: relative;
  .van-icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  padding-top: 29px;
}
.tuijian-container {
  padding: 20px 20px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
}
</style>

<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
        <van-cell-group>
          <!-- <van-cell
            :title="item.title"
            value="内容"
            label="描述信息"
            v-for="item in articleList"
            :key="item.id"
          /> -->
          <ArticleItem
            v-for="(item, index) in articleList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  mounted() {
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated() {
    ele.scrollTop = scrollTop
  },
  data() {
    return {
      timestamp: Date.now(),
      articleList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList() {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({
          channel_id: this.id,
          timestamp: this.timestamp
        })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad() {
      this.getArticleList()
    },
    onRefresh() {
      console.log('下拉刷新成功')
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped></style>

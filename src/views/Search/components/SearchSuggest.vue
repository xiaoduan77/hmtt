<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created() { },
  data() {
    return {
      list: []
    }
  },
  // v-html也是属性,不能用在过滤器中
  methods: {
    highlight(str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler(newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          console.log(newVal)
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
            console.log(this.list)
          } catch (error) {
            console.log(error)
          }
        }, 700)
      },
      immediate: true // 立即监听 组件在创建的时候就会监听一次
    }
  },
  filters: {},
  components: {},
  beforeDestroy() {
    clearTimeout(timer)
  }
}
</script>

<style scoped></style>

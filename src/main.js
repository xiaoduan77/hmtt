import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
import '@/components/index'
import * as obj from '@/filter'

import FollowUser from '@/components/FollowUser.vue'

Vue.use(Vant)
Vue.component(FollowUser.name, FollowUser)

Vue.config.productionTip = false
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

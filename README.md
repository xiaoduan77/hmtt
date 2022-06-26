1.创建路由
2.创建文件
。。。。
3.定制主题
在style中创建theme.less
在vue.config.js中配置文件const path = require('path')
hack: `true; @import "${path.join(__dirname, 'src/styles/theme.less')}";`
在theme中添加想要的

永久储存
yarn add vuex-persist
https://github.com/championswimmer/vuex-persist#readme
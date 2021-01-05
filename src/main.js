import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
//字体图标
import './assets/styles/icon.css'
import './assets/styles/global.scss'
//导入切换语言的模块
import i18n from '../src/lang/index'
// import './mock/index'
//数组拓展方法
import './utils/boost'
import './utils/create-api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

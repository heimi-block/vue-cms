// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入分离架构的Vuex store
import store from './store'

// 引入全局样式
import './assets/css/spectre.min.css'
import './assets/css/spectre-exp.min.css'
import './assets/css/spectre-icons.min.css'
import './assets/css/fileicon.css'
import './assets/css/style.css'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 挂载store
  template: '<App/>',
  components: { App }
})

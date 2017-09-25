import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'

// 引入Vuex状态管理
import Vuex from 'vuex'

// 使用Vuex状态管理
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)
// 每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中大部分的状态(state)。
// Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
// 创建一个store
const store = new Vuex.Store({
  state: {
    isLoading: false,
    // nickName: '',
    // role: '',
    // privileges: '',
    user: {},
    meta: {  // 无需设定键值对，会根据后端json填充
      // description: '',
      // keywords: '',
      // headerscript: '',
      // footerscript: '',
      // themecss: '',
    },
    info: {}, // 网站联络信息
    categorys: [], // 当前页文章分类
    categorysOptions: [], // 文章分类全部SelectOptions
    category: {},
    articles: [], // 当前页文章列表
    article: {},
    attachments: [], // 当前页附件及媒体文件
    contacts: [], // 当前页联系表单
    banners: [], // 当前页Banner列表
    banner: {},
    postsOptions: [], // 文章分类全部SelectOptions,
    groups: [], // 当前页Group列表
    group: {},
    accounts: [], // 当前页账户列表
    account: {},
    groupsOptions: [], // 权限组全部SelectOptions,
    count: 0,
    googleAnalytics: {}
  },
  // 你不能直接改变 store 中的状态。
  // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
  // 这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
  mutations,
  actions
})

export default store

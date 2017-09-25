export default {
    // 需传入state参数，和状态变量载体payload{'':'','':''}
    // 可以通过 store.state 来获取状态对象， console.log(store.state.count)
    // 以及通过 store.commit 方法触发状态变更 store.commit('increment')
    // function * 更新用户信息
  updateUserInfo (state, user) {
    state.user = user
  },
  LOADING_TOGGLE: (state, isLoading) => {
    state.isLoading = isLoading
  },
  SET_CATEGORYS_OPTIONS: (state, categorysOptions) => {
    state.categorysOptions = categorysOptions
  },
  SET_POSTS_OPTIONS: (state, postsOptions) => {
    state.postsOptions = postsOptions
  },
  ADD_NEW_CATEGORY: (state, { name }) => {
    state.category.name = name
  },
  SET_CATEGORYS: (state, categorys) => {
    state.categorys = categorys
  },
  UPDATE_CATEGORY: (state, { name }) => {
    state.category.name = name
  },
  SET_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_ARTICLES: (state, articles) => {
    state.articles = articles
  },
  UPDATE_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_CONTACT_FORMS: (state, contacts) => {
    state.contacts = contacts
  },
  SET_ATTACHMENTS: (state, attachments) => {
    state.attachments = attachments
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  SET_META: (state, meta) => {
    state.meta = meta
  },
  UPDATE_META_DESCRIPTION: (state, description) => {
    state.meta.description = description
  },
  UPDATE_META_KEYWORDS: (state, keywords) => {
    state.meta.keywords = keywords
  },
  UPDATE_META_HEADERSCRIPT: (state, headerscript) => {
    state.meta.headerscript = headerscript
  },
  UPDATE_META_FOOTERSCRIPT: (state, footerscript) => {
    state.meta.footerscript = footerscript
  },
  UPDATE_META_THEMECSS: (state, themecss) => {
    state.meta.themecss = themecss
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  UPDATE_INFO_GOOGLE_MAP: (state, googleMap) => {
    state.info.googleMap = googleMap
  },
  UPDATE_INFO_CONTACT_TEL: (state, contactTel) => {
    state.info.contactTel = contactTel
  },
  UPDATE_INFO_FAX_NUMBER: (state, faxNumber) => {
    state.info.faxNumber = faxNumber
  },
  UPDATE_INFO_CONTACT_EMAIL: (state, contactEmail) => {
    state.info.contactEmail = contactEmail
  },
  UPDATE_INFO_CONTACT_ADDRESS: (state, contactAddress) => {
    state.info.contactAddress = contactAddress
  },
  UPDATE_INFO_WORK_TIME: (state, workTime) => {
    state.info.workTime = workTime
  },
  UPDATE_INFO_COPYRIGHT: (state, copyright) => {
    state.info.copyright = copyright
  },
  UPDATE_INFO_ABOUT_US: (state, aboutUs) => {
    state.info.aboutUs = aboutUs
  },
  SET_BANNERS: (state, banners) => {
    state.banners = banners
  },
  SET_GROUPS: (state, groups) => {
    state.groups = groups
  },
  SET_GROUPS_OPTIONS: (state, groupsOptions) => {
    state.groupsOptions = groupsOptions
  },
  SET_ACCOUNTS: (state, accounts) => {
    state.accounts = accounts
  },
  SET_GOOGLE_ANALYTICS: (state, googleAnalytics) => {
    state.googleAnalytics = googleAnalytics
  }
}

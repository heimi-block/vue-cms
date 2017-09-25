// 引入网络请求插件axios
import axios from 'axios'
import bannerMan from './banner.ac'
import metaMan from './meta.ac'
import infoMan from './info.ac'
const beginLoading = commit => {
  commit('LOADING_TOGGLE', true)
  return Date.now()
}

const stopLoading = (commit, start, timeAllowed = 400) => {
  const spareTime = timeAllowed - (Date.now() - start)
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false)
}

export default {
  // Banner ======================================================
  saveBanner ({ state, commit, dispatch }) {
    bannerMan.saveBanner({ state, commit, dispatch })
  },
  deleteBanner ({ state, commit, dispatch }, id) {
    bannerMan.deleteBanner({ state, commit, dispatch }, id)
  },
  deleteBanners ({ state, commit, dispatch }, idArray) {
    bannerMan.deleteBanners({ state, commit, dispatch }, idArray)
  },
  updateBanner ({ state, commit, dispatch }) {
    bannerMan.updateBanner({ state, commit, dispatch })
  },
  getBanners ({ commit }, page) {
    bannerMan.getBanners({ commit }, page)
  },
  getPostsOptions ({ commit }) {
    bannerMan.getPostsOptions({ commit })
  },
  // MetaJs =======================================================
  getMeta ({ commit }) {
    metaMan.getMeta({ commit })
  },
  saveMeta ({ state, commit }) {
    metaMan.saveMeta({ state, commit })
  },
  // InfoJs =======================================================
  getInfo ({ commit }) {
    infoMan.getInfo({ commit })
  },
  saveInfo ({ state, commit }) {
    infoMan.saveInfo({ state, commit })
  },
  getCategorys ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/categorys/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_CATEGORYS', res.data.data)
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  getCategorysOptions ({ commit }) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/categorys', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_CATEGORYS_OPTIONS', res.data.data)
        stopLoading(commit, start)
      }
    })
  },
  saveCategory ({ state, commit, dispatch }, modalSaveActive) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.post('/api/category',
            state.category, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('添加成功')
          dispatch('getCategorys')
        }
      })
  },
  updateCategory ({ state, commit, dispatch }, id) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.put('/api/category',
      {
        id: id,
        name: state.category.name
      }, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('更新成功')
          dispatch('getCategorys')
        }
      })
  },
  deleteCategory ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/category', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getCategorys')
      }
    })
  },
    // 批量删除操作
  deleteCategorys ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/category', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getCategorys')
          }
        }
      })
      dispatch('getCategorys')
    })
  },
  getArticle ({ commit }, id) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/post', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_ARTICLE', res.data.data)
        stopLoading(commit, start)
      }
    })
  },
  saveArticle ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.post('/api/post',
            state.article, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('添加成功')
                    // dispatch('getCategorys')
                    // TODO  ####
        }
      })
  },
  updateArticle ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.put('/api/post',
            state.article, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('更新成功')
          dispatch('getArticles')
        }
      })
  },
  getArticles ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/posts/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_ARTICLES', res.data.data)
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  deleteArticle ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/post', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getArticles')
      }
    })
  },
    // 批量删除操作
  deleteArticles ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/post', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getArticles')
          }
        }
      })
      dispatch('getArticles')
    })
  },
  getAttachments ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/attachments/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_ATTACHMENTS', res.data.data.reverse())
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  deleteAttachment ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/attachment', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getAttachments')
      }
    })
  },
    // 批量删除操作
  deleteAttachments ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/attachment', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getAttachments')
          }
        }
      })
      dispatch('getAttachments')
    })
  },
  getContactForms ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/forms/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_CONTACT_FORMS', res.data.data)
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  deleteContactForm ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/form', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getContactForms')
      }
    })
  },
    // 批量删除操作
  deleteContactForms ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/form', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getContactForms')
          }
        }
      })
      dispatch('getContactForms')
    })
  },
  getGroups ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/groups/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_GROUPS', res.data.data)
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  saveGroup ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.post('/api/group',
            state.group, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('添加成功')
          dispatch('getGroups')
                    // TODO  ####
        }
      })
  },
  deleteGroup ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/group', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getGroups')
      }
    })
  },
    // 批量删除操作
  deleteGroups ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/group', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getGroups')
          }
        }
      })
      dispatch('getGroups')
    })
  },
  updateGroup ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.put('/api/group',
            state.group, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('更新成功')
          dispatch('getGroups')
        }
      })
  },
  getGroupsOptions ({ commit }) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/groups', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_GROUPS_OPTIONS', res.data.data)
        stopLoading(commit, start)
      }
    })
  },
  getAccounts ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/users/paging', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_ACCOUNTS', res.data.data)
        commit('SET_COUNT', res.data.count)
        stopLoading(commit, start)
      }
    })
  },
  saveAccount ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.post('/api/user',
            state.account, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('添加成功')
          dispatch('getAccounts')
                    // TODO  ####
        }
      })
  },
  deleteAccount ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？' + id)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.delete('/api/user', {
      params: {
        id: id
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getAccounts')
      }
    })
  },
    // 批量删除操作
  deleteAccounts ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    console.log(deleteArray)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
        // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
        // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/user', {
        params: {
          id: item
        },
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getAccounts')
          }
        }
      })
      dispatch('getAccounts')
    })
  },
  updateAccount ({ state, commit, dispatch }) {
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.put('/api/user',
            state.account, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('更新成功')
          dispatch('getAccounts')
        }
      })
  },
  getGoogleAnalytics ({ commit }, page) {
    const start = beginLoading(commit)
    let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
    axios.get('/api/googleAnalytics', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_GOOGLE_ANALYTICS', res.data.data)
        window.localStorage.setItem('tags', JSON.stringify(res.data.data.tags))
        window.localStorage.setItem('users', JSON.stringify(res.data.data.users))
        window.localStorage.setItem('sessions', JSON.stringify(res.data.data.sessions))
        window.localStorage.setItem('pageviews', JSON.stringify(res.data.data.pageviews))
        stopLoading(commit, start)
      }
    })
  }
}


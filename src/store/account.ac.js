// 引入网络请求插件axios
import axios from 'axios'

const beginLoading = commit => {
  commit('LOADING_TOGGLE', true)
  return Date.now()
}

const stopLoading = (commit, start, timeAllowed = 400) => {
  const spareTime = timeAllowed - (Date.now() - start)
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false)
}
const token = 'Bearer ' + window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
export default {
  getAccounts ({ commit }, page) {
    const start = beginLoading(commit)
    axios.get('/api/user', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_ACCOUNTS', res.data.result.data)
        commit('SET_COUNT', res.data.result.count)
        stopLoading(commit, start)
      }
    })
  },
  saveAccount ({ state, commit, dispatch }) {
    axios.post('/api/user',
            state.account, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('添加成功')
          dispatch('getAccounts')
        }
      })
  },
  deleteAccount ({ state, commit, dispatch }, id) {
    axios.delete('/api/user/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        alert('删除成功')
        dispatch('getAccounts')
      }
    })
  },
  deleteAccounts ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    deleteArray.forEach((item, i) => {
      axios.delete('/api/user/' + item, {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
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
    axios.put('/api/user/' + state.account.id,
            state.account, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('更新成功')
          dispatch('getAccounts')
        }
      })
  },
  getGroupsOptions ({ commit }) {
    const start = beginLoading(commit)
    axios.get('/api/group?isPaging=false', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_GROUPS_OPTIONS', res.data.result.data)
        stopLoading(commit, start)
      }
    })
  }
}

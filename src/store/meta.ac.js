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
  getMeta ({ commit }) {
    const start = beginLoading(commit)
    axios.get('/api/meta', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_META', res.data.result.data)
        stopLoading(commit, start)
      }
    })
  },
  saveMeta ({ state, commit }) {
    const start = beginLoading(commit)
    axios.put('/api/meta',
      state.meta, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('更新成功')
          stopLoading(commit, start)
        }
      })
  }
}

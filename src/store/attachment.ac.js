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
  getAttachments ({ commit }, page) {
    const start = beginLoading(commit)
    axios.get('/api/attachment', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_ATTACHMENTS', res.data.result.data.reverse())
        commit('SET_COUNT', res.data.result.count)
        stopLoading(commit, start)
      }
    })
  },
  deleteAttachment ({ state, commit, dispatch }, id) {
    axios.delete('/api/attachment/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        alert('删除成功')
        dispatch('getAttachments')
      }
    })
  },
  deleteAttachments ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    deleteArray.forEach((item, i) => {
      axios.delete('/api/attachment/' + item, {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getAttachments')
          }
        }
      })
      dispatch('getAttachments')
    })
  }
}

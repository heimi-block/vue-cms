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
  getGoogleAnalytics ({ commit }) {
    const start = beginLoading(commit)
    axios.get('/api/googleAnalytics', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_GOOGLE_ANALYTICS', res.data.result.data)
        window.localStorage.setItem('tags', JSON.stringify(res.data.result.data.tags))
        window.localStorage.setItem('users', JSON.stringify(res.data.result.data.users))
        window.localStorage.setItem('sessions', JSON.stringify(res.data.result.data.sessions))
        window.localStorage.setItem('pageviews', JSON.stringify(res.data.result.data.pageviews))
        stopLoading(commit, start)
      }
    })
  }
}

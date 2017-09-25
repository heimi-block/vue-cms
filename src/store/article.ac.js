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
  getArticle ({ commit }, id) {
    const start = beginLoading(commit)
    axios.get('/api/post/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_ARTICLE', res.data.result)
        stopLoading(commit, start)
      }
    })
  },
  saveArticle ({ state, commit, dispatch }) {
    axios.post('/api/post',
            state.article,
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('添加成功')
        }
      })
  },
  updateArticle ({ state, commit, dispatch }) {
    axios.put('/api/post/' + state.article.id,
            state.article,
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('更新成功')
          dispatch('getArticles')
        }
      })
  },
  getArticles ({ commit }, page) {
    const start = beginLoading(commit)
    axios.get('/api/post', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_ARTICLES', res.data.result.data)
        commit('SET_COUNT', res.data.result.count)
        stopLoading(commit, start)
      }
    })
  },
  deleteArticle ({ state, commit, dispatch }, id) {
    axios.delete('/api/post/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        alert('删除成功')
        dispatch('getArticles')
      }
    })
  },
  deleteArticles ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    deleteArray.forEach((item, i) => {
      axios.delete('/api/post/' + item, {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getArticles')
          }
        }
      })
      dispatch('getArticles')
    })
  },
  getCategorysOptions ({ commit }) {
    const start = beginLoading(commit)
    axios.get('/api/category?isPaging=false', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_CATEGORYS_OPTIONS', res.data.result.data)
        stopLoading(commit, start)
      }
    })
  }
}

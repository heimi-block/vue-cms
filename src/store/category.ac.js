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
  getCategorys ({ commit }, page) {
    const start = beginLoading(commit)
    axios.get('/api/category', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        commit('SET_CATEGORYS', res.data.result.data)
        commit('SET_COUNT', res.data.result.count)
        stopLoading(commit, start)
      }
    })
  },
  saveCategory ({ state, commit, dispatch }, modalSaveActive) {
    axios.post('/api/category',
            state.category, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('添加成功')
          dispatch('getCategorys')
        }
      })
  },
  updateCategory ({ state, commit, dispatch }, id) {
    axios.put('/api/category/' + id,
    state.category,
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          alert('更新成功')
          dispatch('getCategorys')
        }
      })
  },
  deleteCategory ({ state, commit, dispatch }, id) {
    axios.delete('/api/category/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (res.data.code === 1) {
        alert('删除成功')
        dispatch('getCategorys')
      }
    })
  },
  deleteCategorys ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    deleteArray.forEach((item, i) => {
      axios.delete('/api/category/' + item, {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getCategorys')
          }
        }
      })
      dispatch('getCategorys')
    })
  }
}

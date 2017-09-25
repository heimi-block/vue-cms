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

  saveBanner ({ state, commit, dispatch }) {
    axios.post('/api/banner',
              state.banner, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('添加成功')
          dispatch('getBanners')
                      // TODO  ####
        }
      })
  },
  getBanners ({ commit }, page) {
    const start = beginLoading(commit)
    axios.get('/api/banner', {
      params: {
        page: page
      },
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_BANNERS', res.data.result.data)
        commit('SET_COUNT', res.data.result.count)
        stopLoading(commit, start)
      }
    })
  },
  getPostsOptions ({ commit }) {
    const start = beginLoading(commit)
    axios.get('/api/post', {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        commit('SET_POSTS_OPTIONS', res.data.result.data)
        stopLoading(commit, start)
      }
    })
  },
  deleteBanner ({ state, commit, dispatch }, id) {
    alert('你确定要删除吗？')
    axios.delete('/api/banner/' + id, {
      headers: {
        'X-MC-TOKEN': token
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('删除成功')
        dispatch('getBanners')
      }
    })
  },
      // 批量删除操作
  deleteBanners ({ state, commit, dispatch }, idArray) {
    let deleteArray = idArray.split(',')
    alert('你确定要删除选中的' + deleteArray.length + '项吗？')
    // for(let del of deleteArray){ //for map的话可以获取到index const [del,index] of deleteArray
    // 数组可以使用forEach （item，i）
    deleteArray.forEach((item, i) => {
      axios.delete('/api/banner/' + item, {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          if (i === deleteArray.length - 1) {
            alert('全部删除成功')
            dispatch('getBanners')
          }
        }
      })
      dispatch('getBanners')
    })
  },
  updateBanner ({ state, commit, dispatch }) {
    axios.put('/api/banner/' + state.banner.id,
              state.banner, // 注解: axios -> post和get请求，data的放置位置稍微有区别
      {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
          alert('更新成功')
          dispatch('getBanners')
        }
      })
  }
}

<template>
    <section class="section section-header bg-header">
        <section class="grid-header container">
            <nav class="navbar">
                <section class="navbar-section">
                    <a href="#sidebar" class="btn btn-lg btn-link btn-action show-sm">
                        <i class="icon icon-menu"></i>
                    </a>
                    <a href="index.html" class="navbar-brand mr-10">4MCloudServer</a>
                    <!-- Loading -->
                    <span class="loading" v-show="isLoading"></span>
                </section>
                <section class="navbar-section">
                    <div class="tile tile-centered">
                        <div class="tile-icon">
                            <img src="./../assets/img/avatar.png" class="avatar">
                        </div>
                        <div class="tile-content">
                            <!-- NickName -->
                            <span v-text="nickName" v-if="nickName"></span>
                        </div>
                    </div>
                    <a @click="loginOut" class="btn btn-primary">登出</a>
                </section>
            </nav>
        </section>
    </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['nickName', 'role', 'token', 'privileges', 'isLoading'])
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
        // 检测是否登录
    checkLogin () {
            // 从登录页面->成功->获取本地LocalStorage
      let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
      axios.get('/user/checkLogin', {
        headers: {
          'X-MC-TOKEN': token
        }
      }).then((res) => {
        if (!res.data.err) {
                    // 你不能直接改变 store 中的状态。
                    // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
          this.$store.commit('updateUserInfo', {
            nickName: res.data.data.info.email,
            role: res.data.data.info.role,
            token: res.data.data.token,
            privileges: res.data.data.info.privileges
          })
        } else {
          this.$router.push({ path: '/login' })
        }
      })
    },
        // 退出登录
    loginOut () {
            // 从Header组件->注销->清除本地LocalStorage及重置服务端用户token字段数据
      axios.get('/user/loginOut', {
        headers: {
          'X-MC-TOKEN': this.$store.state.token
        }
      }).then((res) => {
        if (!res.data.err) {
                    // 你不能直接改变 store 中的状态。
                    // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
          this.$store.commit('updateUserInfo', {
            nickName: '',
            role: '',
            token: '',
            privileges: ''
          })
          window.localStorage.setItem('X-4MDEVSTUDIO-TOKEN', '')
          this.$router.push({ path: '/login' })
        }
      })
    }
  }
}
</script>
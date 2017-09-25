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
                            <span v-text="user.email" v-if="user.email"></span>
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
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'isLoading'])
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
        // 检测是否登录
    checkLogin () {
            // 从登录页面->成功->获取本地LocalStorage
      let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
      axios.get('/auth', {
        headers: {
          'X-MC-TOKEN': 'Bearer ' + token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          // 你不能直接改变 store 中的状态。
          // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
          this.$store.commit('updateUserInfo', res.data.result)
        } else {
          this.$router.push({ path: '/login' })
        }
      })
    },
        // 退出登录
    loginOut () {
            // 从Header组件->注销->清除本地LocalStorage及重置服务端用户token字段数据 --> 使用JSON WEB TOKEN只需清理本地即可
      window.localStorage.setItem('X-4MDEVSTUDIO-TOKEN', '')
      this.$router.push({ path: '/login' })
    },
    ...mapMutations(['updateUserInfo'])
  }
}
</script>
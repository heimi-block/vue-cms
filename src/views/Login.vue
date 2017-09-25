<template>
    <div>
        <section class="section section-header bg-header">
            <section class="grid-header container grid-960">
                <nav class="navbar">
                    <section class="navbar-section">
                        <a href="index.html" class="navbar-brand mr-10">4MCloudServer</a>
                    </section>
                    <section class="navbar-section">
                        <a href="/" class="btn btn-primary">访问控制台</a>
                    </section>
                </nav>
            </section>
        </section>

        <section class="section-login">
            <div class="container">
                <div class="columns">
                    <div class="column col-3 col-xs-10 centered">
                        <header class="text-center">
                            <h3>登 入</h3>
                        </header>
                        <div class="form-group">
                            <input class="form-input" v-model="email" autocomplete="off" type="text" placeholder="请输入你的邮箱账号">
                        </div>
                        <div class="form-group">
                            <input class="form-input" v-model="password" autocomplete="off" type="password" placeholder="请输入你的密码">
                            <p class="form-input-hint">{{errInfo}}</p>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-block" @click="login">登 入</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <footer class="section-footer bg-gray">
            <section id="copyright" class="grid-footer container grid-960">
                <p>
                    <a href="http://order.4-m.cn" target="_blank">4MWorkOrder</a> |
                    Version
                    <span class="version"></span>
                </p>
                <p>Designed and built with ♥ by
                    <a href="https://www.4-m.cn/" target="_blank">4mdevstudio</a> & <a href="http://www.timesmarketing.tw/" target="_blank">TimesMarketing</a>.</p>
            </section>
        </footer>
    </div>
</template>

<script>
import './../assets/css/spectre.min.css'
import './../assets/css/spectre-exp.min.css'
import './../assets/css/spectre-icons.min.css'

// 在 Vue 组件中获得 Vuex 状态
import axios from 'axios'
// 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
import { mapState } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      errInfo: ''
    }
  },
    // mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。
  computed: {
        // ...mapState()
        // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        // mapState(['count']) 映射 this.count 为 store.state.count
    ...mapState(['nickName', 'role', 'token', 'privileges'])
  },
  mounted () {
        // Vue的生命周期mounted
        // 调用checkLogin()
    this.checkLogin()
  },
  methods: {
    checkLogin () {
            // 从Vuex的Store中获取状态token，如果存在发起验证请求，验证成功，则登录成功,否则token失效，登录失败
            // 如果没有获取到token,等同登录失败
      let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
      axios.get('/api/auth', {
        headers: {
          'X-MC-TOKEN': 'Bearer ' + token
        }
      }).then((res) => {
        if (res.data.code === 1) {
          // 如果已经登录，那么不执行登录操作，直接跳转
          window.location.href = '/'
        }
      })
    },
    login () {
      if (!this.email.length) {
        this.errInfo = '请输入正确格式邮箱账号'
        return
      }
      if (!this.password.length) {
        this.errInfo = '请输入正确格式的密码'
        return
      }
      axios.post('/api/auth', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.data.code === 1) {
          // 本地存储token,防止单页面刷新丢失state
          window.localStorage.setItem('X-4MDEVSTUDIO-TOKEN', res.data.result.token)
          window.location.href = '/'
        } else {
          this.errInfo = '用户不存在或密码错误'
        }
      })
    },
    clearErrInfo () {
      this.errInfo = ''
    }
  },
  watch: {
    email: 'clearErrInfo',
    password: 'clearErrInfo'
  }
}
</script>

<style scoped>
.bg-gray {
    padding: 1rem;
    background: #f8f9fa;
    color: #667189;
}

.bg-header {
    background: #ffffff;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, .1);
}

.section-header {
    position: fixed;
    top: 0;
    z-index: 200;
    padding: 1rem .5rem;
    width: 100%;
}

.grid-header .navbar {
    height: 4rem;
}

.grid-header .navbar-section {
    padding: 0;
}

.grid-header .navbar-brand {
    color: #50596c;
}

.grid-header .btn-link {
    padding-right: .6rem;
    padding-left: .6rem;
    color: #667189;
}

.grid-header .btn-link:focus,
.grid-header .btn-link:hover,
.grid-header .btn-link:active {
    color: #50596c;
    opacity: .75;
}

.grid-footer {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #acb3c2;
}

.grid-footer a {
    color: #727e96;
}


/*fix for header*/

.grid-header .btn-link {
    padding-right: 2rem;
    padding-left: 2rem;
}

.section-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
}

.section-login {
    margin-top: 180px;
}
</style>

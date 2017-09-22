<template>
  <div>
    <top-bar></top-bar>
    <section class="container">
      <section class="columns">
        <!--Sidebar 左侧导航栏-->
        <side-bar></side-bar>
        <a href="#sidebar-close" id="sidebar-close" class="docs-nav-clear"></a>

        <!--Sidebar 右侧内容区-->
        <div class="docs-content column col-10 col-sm-12 centered">
          <section id="compiling" class="container" style="margin-top: 80px">
            <header class="text-center">
              <h3>META管理
              </h3>
            </header>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>属性名称</th>
                  <th>说明</th>
                  <th>设定值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>name="
                    <strong>description</strong>"</td>
                  <td>网站描述，可输入关键字，网站名称等，以英文,(逗号隔开)</td>
                  <td>
                    <textarea class="form-input" v-model="description" placeholder="The HTTP client for Vue.js" rows="3"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>name="
                    <strong>keywords</strong>"</td>
                  <td>网站关键字，可输入关键字，网站名称等，以英文,(逗号隔开)</td>
                  <td>
                    <textarea class="form-input" v-model="keywords" placeholder="vue,xhr,http,ajax" rows="3"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>HeaderScript</td>
                  <td>可在此区头部域粘贴外部的script脚本</td>
                  <td>
                    <textarea class="form-input" v-model="headerscript" placeholder="header scripts" rows="3"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>FooterScript</td>
                  <td>可在此区尾部域粘贴外部的script脚本</td>
                  <td>
                    <textarea class="form-input" v-model="footerscript" placeholder="footer scripts" rows="3"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>ThemeCSS</td>
                  <td>可在此区域粘贴自定义的CSS脚本</td>
                  <td>
                    <textarea class="form-input" v-model="themecss" placeholder="theme css" rows="3"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="column">
              <span class="float-right">
                <button class="btn" @click="saveMeta">更新信息</button>
              </span>
            </div>
          </section>

        </div>

      </section>
    </section>
  </div>
</template>

<script>
import TopBar from './../components/TopBar'
import SideBar from './../components/SideBar'
import { mapMutations, mapActions } from 'vuex'
export default {
  created () {
    // Vue的生命周期created
    // Todo: 获取已存在数据库中的Meta信息
    this.getMeta()
  },
  methods: {
    saveMeta () {
      this.saveMeta()
    },
    ...mapActions(['saveMeta', 'getMeta']),
    ...mapMutations(['SET_META'])
  },
  components: {
    TopBar,
    SideBar
  },
  // mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。
  computed: {
    description: {
      get () {
        return this.$store.state.meta.description
      },
      set (value) {
        this.$store.commit('UPDATE_META_DESCRIPTION', value)
      }
    },
    keywords: {
      get () {
        return this.$store.state.meta.keywords
      },
      set (value) {
        this.$store.commit('UPDATE_META_KEYWORDS', value)
      }
    },
    headerscript: {
      get () {
        return this.$store.state.meta.headerscript
      },
      set (value) {
        this.$store.commit('UPDATE_META_HEADERSCRIPT', value)
      }
    },
    footerscript: {
      get () {
        return this.$store.state.meta.footerscript
      },
      set (value) {
        this.$store.commit('UPDATE_META_FOOTERSCRIPT', value)
      }
    },
    themecss: {
      get () {
        return this.$store.state.meta.themecss
      },
      set (value) {
        this.$store.commit('UPDATE_META_THEMECSS', value)
      }
    }
  }
}
</script>

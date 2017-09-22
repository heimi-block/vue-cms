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
                <h3>整站联络信息</h3>
              </header>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>属性名称</th>
                    <th>设定值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>谷歌地图</td>
                    <td><input type="text" class="form-input" v-model="googleMap" placeholder="25.057302,121.559528"></td>
                  </tr>
                  <tr>
                    <td>客服专线</td>
                    <td><input type="text" class="form-input" v-model="contactTel" placeholder="+886 2 2767 9969"></td>
                  </tr>
                  <tr>
                    <td>传真资讯</td>
                    <td><input type="text" class="form-input" v-model="faxNumber" placeholder="+886 2 2768 5949"></td>
                  </tr>
                  <tr>
                    <td>客服信箱</td>
                    <td><input type="text" class="form-input" v-model="contactEmail" placeholder="bally585@yahoo.com.tw"></td>
                  </tr>
                  <tr>
                    <td>联络地址</td>
                    <td>
                      <textarea class="form-input" v-model="contactAddress" placeholder="台北市民生東路五段36巷8弄9號   1F., No.9, Aly. 8, Ln. 36, Sec. 5, Minsheng E. Rd., Songshan Dist., Taipei City 105, Taiwan (R.O.C.)" rows="3"></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>营业时间</td>
                    <td>
                      <textarea class="form-input" v-model="workTime" placeholder="週一至週五 Mon-Fri  09：30- 18：00 " rows="3"></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>版权设定</td>
                    <td><input type="text" class="form-input" v-model="copyright" placeholder="Copyright© 2017 BallyJewelry Inc. All Rights Reserved."></td>
                  </tr>
                  <tr>
                    <td>关于我们</td>
                    <td>
                      <textarea class="form-input" v-model="aboutUs" placeholder="vue,xhr,http,ajax" rows="3"></textarea>
                    </td>
                  </tr>

                </tbody>
              </table>

              <div class="column">
                <span class="float-right">
                  <button class="btn" @click="saveInfo">更新信息</button>
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
    // Todo: 获取已存在数据库中的Info信息
    this.getInfo()
  },
  methods: {
    saveMeta () {
      this.saveMeta()
    },
    ...mapActions(['saveInfo', 'getInfo']),
    ...mapMutations(['SET_INFO'])
  },
  components: {
    TopBar,
    SideBar
  },
  // mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。
  computed: {
    googleMap: {
      get () {
        return this.$store.state.info.googleMap
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_GOOGLE_MAP', value)
      }
    },
    contactTel: {
      get () {
        return this.$store.state.info.contactTel
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_CONTACT_TEL', value)
      }
    },
    faxNumber: {
      get () {
        return this.$store.state.info.faxNumber
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_FAX_NUMBER', value)
      }
    },
    contactEmail: {
      get () {
        return this.$store.state.info.contactEmail
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_CONTACT_EMAIL', value)
      }
    },
    contactAddress: {
      get () {
        return this.$store.state.info.contactAddress
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_CONTACT_ADDRESS', value)
      }
    },
    workTime: {
      get () {
        return this.$store.state.info.workTime
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_WORK_TIME', value)
      }
    },
    copyright: {
      get () {
        return this.$store.state.info.copyright
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_COPYRIGHT', value)
      }
    },
    aboutUs: {
      get () {
        return this.$store.state.info.aboutUs
      },
      set (value) {
        this.$store.commit('UPDATE_INFO_ABOUT_US', value)
      }
    }
  }
}
</script>

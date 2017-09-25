<template>
  <div>
    <top-bar></top-bar>
    <section class="container">
      <section class="columns">
        <!--Sidebar 左侧导航栏-->
        <side-bar></side-bar>
        <a href="#sidebar-close" id="sidebar-close" class="docs-nav-clear"></a>

        <!--Sidebar 右侧内容区 開始-->
        <div class="docs-content column col-10 col-sm-12 centered">
          <section id="compiling" class="container" style="margin-top: 80px">
            <header class="text-center">
              <h3>账户管理</h3>
            </header>
            <!--Modal:增加账户按钮-->
            <a @click="saveAccountOpenModal" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
              <i class="icon icon-plus"></i>
            </a>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="account.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>用户名</th>
                  <th>权限组</th>
                  <th>状态</th>
                  <th>日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in accounts">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="account._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{account.email}}</td>
                  <td>{{account.group.name}}</td>
                  <td>
                    <label class="form-switch">
                      <input type="checkbox" :checked="account.isShow" disabled/>
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{account.createdAt}}</td>
                  <td>
                    <button @click="updateAccountOpenModal(account._id,account.email,account.group._id,account.isShow)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button @click="deleteAccount(account._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button :disabled="account.length==0?true:false" class="btn" @click="deleteAccounts(`${checkedOptions}`)">批量删除</button>
              </span>
              <span class="float-right">
                        <!--Paging 分页组件-->
  <paginate :pageCount="Math.floor(Number(`${count/10+1}`))" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate>    
              </span>
            </div>
          </section>

          <!--Modal:增加账户-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalSaveActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalSaveActive?modalSaveActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">增加CMS账户</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">用户名</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="email" placeholder="请输入用户名即邮箱账号" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">密码</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="password" placeholder="请输入6-12位字符密码" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">权限组</label>
                            </div>
                            <div class="col-10">
                              <select v-model="group" class="form-select select-lg">
                                <option disabled value="">请选择</option>
                                <option v-for="group in groupsOptions" v-bind:value="group._id">
                                  {{ group.name }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">状态</label>
                            </div>
                            <div class="col-10">
                              <label class="form-radio">
                                <input type="radio" value="true" v-model="isShow">
                                <i class="form-icon"></i> 正常
                              </label>
                              <label class="form-radio">
                                <input type="radio" value="false" v-model="isShow">
                                <i class="form-icon"></i> 冻结
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="saveAccountPre">添加</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!--Modal:修改账户-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalUpdateActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalUpdateActive?modalUpdateActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">修改CMS账户</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">用户名</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="email" placeholder="请输入用户名即邮箱账号" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">密码</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="password" placeholder="请输入6-12位字符密码" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">权限组</label>
                            </div>
                            <div class="col-10">
                              <select v-model="group" class="form-select select-lg">
                                <option disabled value="">请选择</option>
                                <option v-for="group in groupsOptions" v-bind:value="group._id">
                                  {{ group.name }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">状态</label>
                            </div>
                            <div class="col-10">
                              <label class="form-radio">
                                <input type="radio" value="true" v-model="isShow">
                                <i class="form-icon"></i> 正常
                              </label>
                              <label class="form-radio">
                                <input type="radio" value="false" v-model="isShow">
                                <i class="form-icon"></i> 冻结
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="updateAccountPre">更新</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        <!--Sidebar 右侧内容区 結束-->
      </section>
    </section>
  </div>
</template>

<script>
import TopBar from './../components/TopBar'
import SideBar from './../components/SideBar'

import Vue from 'vue'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
// Vue.js 知识
// html标签固有属性比如value,disabled 可以使用:value="{{}}" :disabled="true"赋值
// class属性可以使用 v-bind:class=""  style内联属性 使用 v-bind:style="{color:red}"
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      modalUpdateActive: false,
      modalSaveActive: false,
      checkedOptions: [],
      updateCurrentId: '',
      email: '',
      password: '',
      group: '',
      isShow: 'true'
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    // 获取权限组别选项组
    this.getGroupsOptions()
    this.getAccounts(1)
  },
  computed: {
    ...mapState(['accounts', 'account', 'count', 'groupsOptions']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果accounts还没有的话，即大小=0,则也返回false
        if (this.accounts.length === 0) {
          return false
        } else return this.checkedOptions.length === this.accounts.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页accounts，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.accounts.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getAccounts', 'deleteAccount', 'saveAccount', 'updateAccount', 'deleteAccounts', 'getGroupsOptions']),
    ...mapMutations(['SET_ACCOUNTS', 'SET_COUNT']),
    // 修改分类名称
    updateAccountOpenModal (id, email, group, isShow) {
      this.modalUpdateActive = true
      // // 获取到更新的id..
      this.email = email
      this.isShow = isShow
      this.group = group
      this.updateCurrentId = id
    },
    saveAccountOpenModal () {
      this.modalSaveActive = true
      this.updateCurrentId = ''
      this.email = ''
      this.group = ''
      this.password = ''
      this.isShow = 'true'
    },
    saveAccountPre () {
      let email = this.email
      let password = this.password
      let group = this.group
      let isShow = this.isShow
      this.$store.state.account.email = email
      this.$store.state.account.password = password
      this.$store.state.account.group = group
      this.$store.state.account.isShow = isShow
      this.saveAccount()
    },
    updateAccountPre () {
      let email = this.email
      let password = this.password
      let group = this.group
      let isShow = this.isShow
      let id = this.updateCurrentId
      this.$store.state.account.email = email
      this.$store.state.account.password = password
      this.$store.state.account.group = group
      this.$store.state.account.id = id
      this.$store.state.account.isShow = isShow
      this.updateAccount()
    },
    clickCallback (page) {
      // 分页请求数据
      this.getAccounts(page)
    }
  }
}
</script>

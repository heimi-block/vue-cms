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
              <h3>权限群组设定</h3>
            </header>
            <!--Modal:增加权限组按钮-->
            <a @click="saveGroupOpenModal" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
              <i class="icon icon-plus"></i>
            </a>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="groups.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>名称</th>
                  <th>权限功能</th>
                  <th>日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="group in groups">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="group._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{group.name}}</td>
                  <td>{{group.privileges}}</td>
                  <td>{{group.createdAt}}</td>
                  <td>
                    <button @click="updateGroupOpenModal(group._id,group.name,group.privileges)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button @click="deleteGroup(group._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button :disabled="group.length==0?true:false" class="btn" @click="deleteGroups(`${checkedOptions}`)">批量删除</button>
              </span>
              <span class="float-right">
                <!--Paging 分页组件-->
    <paginate :pageCount="Math.floor(Number(`${count/10+1}`))" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate>   
              </span>
            </div>
          </section>

          <!--Modal:增加权限群组-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalSaveActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalSaveActive?modalSaveActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">增加权限群组</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="name" placeholder="请输入权限群组名称" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">功能</label>
                            </div>
                            <div class="col-10">
                              <label class="form-checkbox">
                                <input type="checkbox" value="4" v-model="privileges" />
                                <i class="form-icon"></i> 控制面板&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="B" v-model="privileges" />
                                <i class="form-icon"></i> Banner&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="I" v-model="privileges" />
                                <i class="form-icon"></i> 联络信息&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="M" v-model="privileges" />
                                <i class="form-icon"></i> Meta&nbsp;&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="Z" v-model="privileges" />
                                <i class="form-icon"></i> 账户管理&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="G" v-model="privileges" />
                                <i class="form-icon"></i> 权限组设定&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="C" v-model="privileges" />
                                <i class="form-icon"></i> 文章分类&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="P" v-model="privileges" />
                                <i class="form-icon"></i> 文章列表&nbsp;
                              </label>

                              <label class="form-checkbox">
                                <input type="checkbox" value="F" v-model="privileges" />
                                <i class="form-icon"></i> 联系表单&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="E" v-model="privileges" />
                                <i class="form-icon"></i> 附件管理&nbsp;
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="saveGroupPre">添加</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!--Modal:修改权限群组-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalUpdateActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalUpdateActive?modalUpdateActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">修改权限群组</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" v-model="name" type="text" placeholder="请输入新的权限组名称" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">功能</label>
                            </div>
                            <div class="col-10">
                              <label class="form-checkbox">
                                <input type="checkbox" value="4" v-model="privileges" />
                                <i class="form-icon"></i> 控制面板&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="B" v-model="privileges" />
                                <i class="form-icon"></i> Banner&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="I" v-model="privileges" />
                                <i class="form-icon"></i> 联络信息&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="M" v-model="privileges" />
                                <i class="form-icon"></i> Meta&nbsp;&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="Z" v-model="privileges" />
                                <i class="form-icon"></i> 账户管理&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="G" v-model="privileges" />
                                <i class="form-icon"></i> 权限组设定&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="C" v-model="privileges" />
                                <i class="form-icon"></i> 文章分类&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="P" v-model="privileges" />
                                <i class="form-icon"></i> 文章列表&nbsp;
                              </label>

                              <label class="form-checkbox">
                                <input type="checkbox" value="F" v-model="privileges" />
                                <i class="form-icon"></i> 联系表单&nbsp;
                              </label>
                              <label class="form-checkbox">
                                <input type="checkbox" value="E" v-model="privileges" />
                                <i class="form-icon"></i> 附件管理&nbsp;
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="updateGroupPre">更新</button>
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
      name: '',
      privileges: []
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    this.getGroups(1)
  },
  computed: {
    ...mapState(['groups', 'group', 'count']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果groups还没有的话，即大小=0,则也返回false
        if (this.groups.length === 0) {
          return false
        } else return this.checkedOptions.length === this.groups.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页groups，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.groups.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getGroups', 'deleteGroup', 'saveGroup', 'updateGroup', 'deleteGroups']),
    ...mapMutations(['SET_GROUPS', 'SET_COUNT']),
    // 修改分类名称
    updateGroupOpenModal (id, name, privileges) {
      this.modalUpdateActive = true
      // 获取到更新的id,和privileges
      this.name = name
      // 拿到将privileges，转成数组并赋值
      this.privileges = privileges.split('')
      this.updateCurrentId = id
    },
    saveGroupOpenModal () {
      this.modalSaveActive = true
      this.updateCurrentId = ''
      this.name = ''
      this.privileges = []
    },
    saveGroupPre () {
      let name = this.name
      let privilegesArray = this.privileges
      privilegesArray.push('A')
      // 处理privileges[],转化为字符串存在数组中
      let privileges = privilegesArray.toString().replace(/,/g, '')
      this.$store.state.group.name = name
      this.$store.state.group.privileges = privileges
      this.saveGroup()
    },
    updateGroupPre () {
      let name = this.name
      let privilegesArray = this.privileges
      let id = this.updateCurrentId
      // 处理privileges[],转化为字符串存在数组中
      let privileges = privilegesArray.toString().replace(/,/g, '')
      this.$store.state.group.id = id
      this.$store.state.group.name = name
      this.$store.state.group.privileges = privileges
      this.updateGroup()
    },
    clickCallback (page) {
      // 分页请求数据
      this.getGroups(page)
    }
  }
}
</script>

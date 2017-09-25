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
              <h3>文章分类</h3>
            </header>
            <!--Modal:增加文章分类按钮-->
            <a @click="saveCategoryOpenModal" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
              <i class="icon icon-plus"></i>
            </a>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="categorys.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>名称</th>
                  <th>创建日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categorys">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="category._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{category.name}}</td>
                  <td>{{category.createdAt}}</td>
                  <td>
                    <button @click="updateCategoryOpenModal(category._id,category.name)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button @click="deleteCategory(category._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button :disabled="categorys.length==0?true:false" class="btn" @click="deleteCategorys(`${checkedOptions}`)">批量删除</button>
              </span>
              <span class="float-right">
                               <!--Paging 分页组件-->
    <paginate :pageCount="Number(`${count/10}`)" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate>     
              </span>
            </div>
          </section>

          <!--Modal:增加文章分类-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalSaveActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalSaveActive?modalSaveActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">增加文章分类</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="name" @input="ADD_NEW_CATEGORY({name: $event.target.value})" placeholder="请输入文章分类名称" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="saveCategory">添加</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!--Modal:修改文章分类-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalUpdateActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalUpdateActive?modalUpdateActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">修改文章分类</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" :value="updateCurrentName" type="text" @input="ADD_NEW_CATEGORY({name: $event.target.value})" placeholder="请输入新的文章分类名称" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" :value="updateCurrentId" @click="updateCategory($event.target.value)">更新</button>
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
      updateCurrentName: '',
      name: ''
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    this.getCategorys(1)
  },
  computed: {
    ...mapState(['categorys', 'category', 'count']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果categorys还没有的话，即大小=0,则也返回false
        if (this.categorys.length === 0) {
          return false
        } else return this.checkedOptions.length === this.categorys.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页categorys，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.categorys.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getCategorys', 'deleteCategory', 'saveCategory', 'updateCategory', 'deleteCategorys']),
    ...mapMutations(['ADD_NEW_CATEGORY', 'SET_CATEGORYS', 'SET_COUNT']),
    // 修改分类名称
    updateCategoryOpenModal (id, name) {
      this.modalUpdateActive = true
      // 获取到更新的id,和name
      this.updateCurrentId = id
      this.updateCurrentName = name
    },
    saveCategoryOpenModal () {
      this.modalSaveActive = true
      this.name = ''
    },
    clickCallback (page) {
      // 分页请求数据
      this.getCategorys(page)
    }
  }
}
</script>

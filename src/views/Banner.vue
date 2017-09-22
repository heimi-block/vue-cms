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
              <h3>大轮播管理</h3>
            </header>
            <!--Modal:上传轮播Banner按钮-->
            <a @click="modalSaveActive?modalSaveActive=false:modalSaveActive=true" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
              <i class="icon icon-plus"></i>
            </a>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="banners.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>排序</th>
                  <th>预览</th>
                  <th>名称</th>
                  <th>链接</th>
                  <th>状态</th>
                  <th>日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="banner in banners">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="banner._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{banner.order}}</td>
                  <td><img :src="banner.imgUrl" class="img-responsive" style="width: 100px;height:50px" /></td>
                  <td>{{banner.title}}</td>
                  <td>{{banner.postHref}}</td>
                  <td>
                    <label class="form-switch">
                      <input type="checkbox" :checked="banner.isShow" disabled/>
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{banner.createdAt}}</td>
                  <td>
                    <button class="btn btn-primary btn-action btn-lg" @click="updateBannerOpenModal(banner._id,banner.order,banner.imgUrl,banner.title,banner.postHref,banner.isShow)">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button class="btn btn-primary btn-action btn-lg" @click="deleteBanner(banner._id)">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button @click="deleteBanners(`${checkedOptions}`)" :disabled="banners.length==0?true:false" class="btn">批量删除</button>
              </span>
              <span class="float-right">
    <paginate :pageCount="Number(`${count/10}`)" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate> 
              </span>
            </div>
          </section>

          <!--Modal:增加Banner輪播-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalSaveActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalSaveActive?modalSaveActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">增加Banner轮播</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">排序</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="order" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">图像</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="file" @change="uploadImageOrFile" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="title" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">链接</label>
                            </div>
                            <div class="col-10">
                              <select v-model="postHref" class="form-select select-lg">
                                <option disabled value="">请选择</option>
                                <option v-for="post in postsOptions" v-bind:value="post._id">
                                  {{ post.title }}
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
                                <i class="form-icon"></i> 显示
                              </label>
                              <label class="form-radio">
                                <input type="radio" value="false" v-model="isShow">
                                <i class="form-icon"></i> 隐藏
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="saveBannerPre">保存</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!--Modal:修改Banner輪播-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalUpdateActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalUpdateActive?modalUpdateActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">修改Banner轮播</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">排序</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="order" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">图像</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="file" @change="uploadImageOrFile" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">名称</label>
                            </div>
                            <div class="col-10">
                              <input class="form-input" type="text" v-model="title" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-2">
                              <label class="form-label">链接</label>
                            </div>
                            <div class="col-10">
                              <select v-model="postHref" class="form-select select-lg">
                                <option disabled value="">请选择</option>
                                <option v-for="post in postsOptions" v-bind:value="post._id">
                                  {{ post.title }}
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
                                <i class="form-icon"></i> 显示
                              </label>
                              <label class="form-radio">
                                <input type="radio" value="false" v-model="isShow">
                                <i class="form-icon"></i> 隐藏
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="updateBannerPre">更新</button>
                    </div>
                  </div>
                </div>
              </div>
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

import Vue from 'vue'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
// Vue.js 知识
// html标签固有属性比如value,disabled 可以使用:value="{{}}" :disabled="true"赋值
// class属性可以使用 v-bind:class=""  style内联属性 使用 v-bind:style="{color:red}"
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      modalSaveActive: false,
      modalUpdateActive: false,
      checkedOptions: [],
      addImageUrl: '',
      isShow: 'true',
      order: '',
      title: '',
      postHref: '',
      updateBannerId: ''
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    // 获取文章分类选项组
    this.getPostsOptions()
    this.getBanners(1)
  },
  computed: {
    ...mapState(['banners', 'count', 'banner', 'postsOptions']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果banners还没有的话，即大小=0,则也返回false
        if (this.banners.length === 0) {
          return false
        } else return this.checkedOptions.length === this.banners.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页banners，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.banners.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getBanners', 'saveBanner', 'getPostsOptions', 'deleteBanners', 'deleteBanner', 'updateBanner']),
    ...mapMutations(['SET_BANNERS', 'SET_COUNT']),
    saveBannerPre () {
      let formBody = {}
      formBody.order = this.order
      formBody.imgUrl = this.addImageUrl
      formBody.title = this.title
      formBody.postHref = this.postHref
      formBody.isShow = this.isShow
      this.$store.state.banner = formBody
      // 保存banenr
      this.saveBanner()
    },
    // 上传图片测试
    uploadImageOrFile (e) {
      let file = e.target.files[0]
      let form = new FormData() // 创建form对象
      form.append('upfile', file, file.name)
      // axios configs
      let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
      // 添加请求头
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-MC-TOKEN': token
        }
      }
      axios.post('/api/attachment', form, config)
        .then(response => {
          console.log(response.data.url)
          let that = this
          that.addImageUrl = response.data.url
        })
    },
    updateBannerOpenModal (id, order, imgUrl, title, postHref, isShow) {
      // 更新Banner, 传入当前选择banner的更改属性
      // 开启更新banner, 并为v-model 属性自动赋值
      this.modalUpdateActive = true
      this.order = order
      this.addImageUrl = imgUrl // 是否改动了图片，如果改动了那么imgUrl = addImageUrl
      this.title = title
      this.postHref = postHref
      this.isShow = isShow
      this.updateBannerId = id
    },
    updateBannerPre () {
      let formBody = {}
      formBody.id = this.updateBannerId
      formBody.order = this.order
      formBody.imgUrl = this.addImageUrl
      formBody.title = this.title
      formBody.postHref = this.postHref
      formBody.isShow = this.isShow
      this.$store.state.banner = formBody
      // 更新banenr
      this.updateBanner()
    },
    clickCallback (page) {
      // 分页请求数据
      this.getBanners(page)
    }
  }
}
</script>

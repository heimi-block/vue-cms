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
              <h3>附件及媒体库管理</h3>
            </header>
            <!--Modal:上传图片媒体或附件文件按钮-->
            <a @click="modalSaveActive?modalSaveActive=false:modalSaveActive=true" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
              <i class="icon icon-plus"></i>
            </a>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="attachments.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>预览</th>
                  <th>类型</th>
                  <th>地址</th>
                  <th>日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="attachment in attachments">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="attachment._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>
                    <div class="file-icon file-icon-lg" data-type="csv" v-if="attachment.extname=='.csv'"></div>
                    <div class="file-icon file-icon-lg" data-type="doc" v-if="attachment.extname=='.doc'"></div>
                    <div class="file-icon file-icon-lg" data-type="docx" v-if="attachment.extname=='.docx'"></div>
                    <div class="file-icon file-icon-lg" data-type="ppt" v-if="attachment.extname=='.ppt'"></div>
                    <div class="file-icon file-icon-lg" data-type="pptx" v-if="attachment.extname=='.pptx'"></div>
                    <div class="file-icon file-icon-lg" data-type="xls" v-if="attachment.extname=='.xls'"></div>
                    <div class="file-icon file-icon-lg" data-type="xlsx" v-if="attachment.extname=='.xlsx'"></div>
                    <div class="file-icon file-icon-lg" data-type="mp3" v-if="attachment.extname=='.mp3'"></div>
                    <div class="file-icon file-icon-lg" data-type="pdf" v-if="attachment.extname=='.pdf'"></div>
                    <div class="file-icon file-icon-lg" data-type="Page" v-if="attachment.extname=='.pages'"></div>
                    <div class="file-icon file-icon-lg" data-type="Number" v-if="attachment.extname=='.numbers'"></div>
                    <div class="file-icon file-icon-lg" data-type="Key" v-if="attachment.extname=='.key'"></div>
                    <div class="file-icon file-icon-lg" data-type="zip" v-if="attachment.extname=='.zip'"></div>
                    <div class="file-icon file-icon-lg" data-type="rar" v-if="attachment.extname=='.rar'"></div>
                    <img :src="attachment.url" class="img-responsive" style="width: 100px;height:50px" v-if="attachment.extname=='.png'||attachment.extname=='.jpg'||attachment.extname=='.jpeg'||attachment.extname=='.gif'" />
                  </td>
                  <td>{{attachment.extname}}</td>
                  <td>
                    <a href="#" target="_blank">https://4-m.cn{{attachment.url}}</a>
                  </td>
                  <td>{{attachment.createdAt}}</td>
                  <td>
                    <button @click="updateAttachmentOpenModal(attachment._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-edit"></i>
                    </button>
                    <button @click="deleteAttachment(attachment._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button :disabled="attachments.length==0?true:false" class="btn" @click="deleteAttachments(`${checkedOptions}`)">批量删除</button>
              </span>
              <span class="float-right">
                        <!--Paging 分页组件-->
    <paginate :pageCount="Number(`${count/10}`)" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate>
              </span>
            </div>
          </section>

          <!--Modal:增加媒体或附件-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalSaveActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalSaveActive?modalSaveActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">上传媒体或附件</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-12">
                              <input class="form-input" type="file" @change="uploadImageOrFile" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!--Modal:修改媒体或附件-->
          <section class="container">
            <div class="columns">
              <div class="column">
                <div class="modal" v-bind:class="{active:modalUpdateActive}">
                  <a class="modal-overlay" aria-label="Close"></a>
                  <div class="modal-container col-3 col-xs-12" role="document">
                    <div class="modal-header">
                      <a @click="modalUpdateActive?modalUpdateActive=false:modalUpdateActive=true" class="btn btn-clear float-right" aria-label="Close"></a>
                      <div class="modal-title">修改媒体或附件</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                        <div class="form-horizontal">
                          <div class="form-group">
                            <div class="col-12">
                              <input class="form-input" type="file" @change="updateImageOrFile" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="changeImageOrFile">更新</button>
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
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      modalUpdateActive: false,
      modalSaveActive: false,
      checkedOptions: [],
      updateCurrentId: '',
      updateCurrentExtname: '',
      updateCurrentUrl: '',
      // 目的是，防止更新上传也添加一条新的附件上传记录，要根据id删掉
      updateCurrentLastId: ''
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    this.getAttachments(1)
  },
  computed: {
    ...mapState(['attachments', 'count']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果attachments还没有的话，即大小=0,则也返回false
        if (this.attachments.length === 0) {
          return false
        } else return this.checkedOptions.length === this.attachments.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页attachments，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.attachments.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getAttachments', 'deleteAttachment', 'deleteAttachments']),
    ...mapMutations(['SET_ATTACHMENTS', 'SET_COUNT']),
    clickCallback (page) {
      // 分页请求数据
      this.getAttachments(page)
    },
    // 上传图片测试
    uploadImageOrFile (e) {
      let file = e.target.files[0]
      let form = new FormData() // 创建form对象
      form.append('upfile', file, file.name)
      // form.append('chunk','0')添加form表单中其他数据
      console.log(form.get('upfile')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
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
          alert('上传成功')
          this.getAttachments()
        })
    },
    // 上传图片测试
    updateImageOrFile (e) {
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
          that.updateCurrentUrl = response.data.url
          console.log(response.data.extname)
          that.updateCurrentExtname = response.data.extname
          that.updateCurrentLastId = response.data._id
        })
    },
    changeImageOrFile () {
      let token = window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
      // 添加请求头
      let config = {
        headers: {
          'X-MC-TOKEN': token
        }
      }
      let formBody = {}
      formBody.id = this.updateCurrentId
      formBody.extname = this.updateCurrentExtname
      formBody.url = this.updateCurrentUrl
      formBody.lastId = this.updateCurrentLastId
      axios.put('/api/attachment', formBody, config)
        .then(response => {
          alert('更新成功')
          this.getAttachments()
        })
    },
    // 修改附件或媒体文件
    updateAttachmentOpenModal (id) {
      this.modalUpdateActive = true
      this.updateCurrentId = id
    }

  }
}
</script>
<style scoped>
.file-icon-lg{
width: 100px;
height: 50px
}
</style>
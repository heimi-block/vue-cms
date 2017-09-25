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
                            <h3>编写文章</h3>
                        </header>
                        <!--#router: 回到文章列表-->
                        <router-link :to="{name: 'edit'}" class="nav-item">
                            <a class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
                                <i class="icon icon-back"></i>
                            </a>
                        </router-link>

                        <div class="column col-9 col-sm-12">
                            <form class="form-horizontal" action="#forms">
                                <div class="form-group">
                                    <div class="col-3">
                                        <label class="form-label">标题</label>
                                    </div>
                                    <div class="col-9">
                                        <input class="form-input" v-model="title" type="text" placeholder="请输入文章标题">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-3">
                                        <label class="form-label">封面</label>
                                    </div>
                                    <div class="col-9">
                                        <!--<form enctype="multipart/form-data" method="post" name="fileinfo">-->
                                        <input class="form-input" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadCoverImage" />
                                        <!--</form>-->
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-3">
                                        <label class="form-label">分类</label>
                                    </div>
                                    <div class="col-9">
                                        <select v-model="category" class="form-select select-lg">
                                            <option disabled value="">请选择</option>
                                            <option v-for="category in categorysOptions" v-bind:value="category._id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-3">
                                        <label class="form-label">状态</label>
                                    </div>
                                    <div class="col-9">
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

                                <div class="form-group">
                                    <div class="col-3">
                                        <label class="form-label">内容</label>
                                    </div>
                                    <div class="col-9">
                                        <!-- bidirectional data binding（双向数据绑定） -->
                                        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                                        </quill-editor>
                                        <input type="file" id="getFile" @change="uploadFunction($event)" style='display: none !important;' />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-3"></div>
                                    <div class="col-9">
                                        <button class="btn btn-primary" type="button" @click="postNewOrUpdate">发表文章</button>
                                        <!-- <button class="btn btn-link" type="reset">取消</button> -->
                                    </div>
                                </div>
                            </form>
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
import VueQuillEditor from 'vue-quill-editor'
// mount with global
Vue.use(VueQuillEditor)
import Quill from 'quill'
import { ImageImport } from '../modules/ImageImport.js'
import { ImageResize } from '../modules/ImageResize.js'
Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      title: '',
      isShow: 'true',
      category: '',
      coverUrl: '',
      content: '心情辣么好，写点什么呢...',
      name: 'base-example',
      editorOption: {
        modules: {
          toolbar: {
            container: [
                            [{ 'size': ['small', false, 'large'] }],
                            ['bold', 'italic'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image']
            ],
            handlers: {
              'image': function () {
                document.getElementById('getFile').click()
              }
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageImport: true,
          imageResize: {
            displaySize: true
          }
        }
      }
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
        // 获取文章分类选项组
    this.getCategorysOptions()
    this.SET_ARTICLE({})
  },
  methods: {
        // 编辑器光标离开 将编辑器内容发射给父组件
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
        // 编辑器获得光标
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
        // 编辑器文本发生变化
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
    },
    uploadFunction (e) {
            // you can get images data in e.target.files
            // an single example for using formData to post to server
      var form = new FormData()
      form.append('upfile', e.target.files[0])
            // axios configs
      const token = 'Bearer ' + window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
            // 添加请求头
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-MC-TOKEN': token
        }
      }
      axios.post('/api/attachment', form, config)
                .then(res => {
                  let self = this
                  var range = self.editor.getSelection(true)
                  var length = range.index
                  self.editor.insertEmbed(length, 'image', res.data.result.data.url)
                })
    },
        // 发表文章，搜集参数，提交action
    postNewOrUpdate () {
            // 更新操作的图片处理，如果是更新，自然会先在store中获取，否则编写文章操作从变量中获取
      let formBody = {}
      formBody.category = this.category
      formBody.title = this.title
      formBody.coverUrl = this.coverUrl
      formBody.isShow = this.isShow
      formBody.content = document.querySelector('.ql-editor').innerHTML
      this.$store.state.article = formBody
            // 将此html，提交给后端
      this.saveArticle()
                    .then(() => this.$router.push({ name: 'edit' }))
                    .catch(err => console.log('this is a error:' + err))
    },
    ...mapActions(['getCategorysOptions', 'saveArticle', 'getArticle']),
    ...mapMutations(['SET_CATEGORYS_OPTIONS', 'SET_ARTICLE']),
        // 上传图片测试
    uploadCoverImage (e) {
      let file = e.target.files[0]
      let form = new FormData() // 创建form对象
      form.append('upfile', file, file.name)
            // form.append('chunk','0');//添加form表单中其他数据
      console.log(form.get('upfile')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // axios configs
      const token = 'Bearer ' + window.localStorage.getItem('X-4MDEVSTUDIO-TOKEN')
            // 添加请求头
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-MC-TOKEN': token
        }
      }
      axios.post('/api/attachment', form, config)
                .then(res => {
                  this.coverUrl = res.data.result.data.url
                })
    }
  },
  computed: {
    ...mapState(['categorysOptions']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log('this is my editor', this.editor)
        // setTimeout(() => {
        //     this.content = '<h1>Example 1 changed!</h1>'
        // }, 1800)
  }
}
</script>

<style>
.ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
}

.ql-toolbar.ql-snow {
    border: .1rem solid #c4c9d3;
}

.ql-container.ql-snow {
    border: .1rem solid #c4c9d3;
}

.html {
    height: 9em;
    overflow-y: auto;
    border: .1rem solid #c4c9d3;
    border-top: none;
    resize: vertical;
}
</style>
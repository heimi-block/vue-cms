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
              <h3>文章列表</h3>
            </header>
            <!--#router: 去写文章-->
            <router-link :to="{name: 'editornew'}" class="nav-item">
              <a class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
                <i class="icon icon-plus"></i>
              </a>
            </router-link>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="articles.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>封面</th>
                  <th>标题</th>
                  <th>分类</th>
                  <th>链接</th>
                  <th>时间</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in articles">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="article._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td><img :src="article.coverUrl" class="img-responsive" style="width: 100px;height:50px" /></td>
                  <td>{{article.title}}</td>
                  <td>{{article.category.name}}</td>
                  <td>
                    <a href="#">https://4-m.cn/news/{{article._id}}</a>
                  </td>
                  <td>{{article.createdAt}}</td>
                  <td>
                    <!--Vue.js Note: 跳转，并且传递id, 显示-->
                    <router-link class="btn btn-primary btn-action btn-lg" :to="{name: 'editor', query: {id: article._id}}" tag="button">
                      <!-- <button class="btn btn-primary btn-action btn-lg"> -->
                      <i class="icon icon-edit"></i>
                      <!-- </button> -->
                    </router-link>
                    <button @click="deleteArticle(article._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="column">
              <span class="float-left">
                <button :disabled="articles.length==0?true:false" class="btn" @click="deleteArticles(`${checkedOptions}`)">批量删除</button>
              </span>
              <span class="float-right">
                         <!--Paging 分页组件-->
    <paginate :pageCount="Number(`${count/10}`)" :prevText="'上一页'" :nextText="'下一页'" :containerClass="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'" :clickHandler="clickCallback">
    </paginate>   
              </span>
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

// Vue.js 知识
// html标签固有属性比如value,disabled 可以使用:value="{{}}" :disabled="true"赋值
// class属性可以使用 v-bind:class=""  style内联属性 使用 v-bind:style="{color:red}"

import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      checkedOptions: []
    }
  },
  components: {
    TopBar,
    SideBar
  },
  created () {
    this.getArticles(1)
  },
  computed: {
    ...mapState(['articles', 'count']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果articles还没有的话，即大小=0,则也返回false
        if (this.articles.length === 0) {
          return false
        } else return this.checkedOptions.length === this.articles.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页articles，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.articles.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getArticles', 'deleteArticle', 'deleteArticles']),
    ...mapMutations(['SET_ARTICLES', 'SET_COUNT']),
    clickCallback (page) {
      // 分页请求数据
      this.getArticles(page)
    }
  }
}
</script>

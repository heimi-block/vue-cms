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
              <h3>联系表单管理</h3>
            </header>
            <!-- v1.0.1 Modal:导出CSV按钮-->
            <!-- <a @click="modalSaveActive?modalSaveActive=false:modalSaveActive=true" class="float-right btn btn-primary btn-action btn-lg" style="border-radius: 2em">
                  <i class="icon icon-download"></i>
              </a> -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <label class="form-checkbox">
                      <input type="checkbox" :disabled="contacts.length==0?true:false" v-model="selectAll" />
                      <i class="form-icon"></i> 全选
                    </label>
                  </th>
                  <th>姓名</th>
                  <th>E-mail</th>
                  <th>电话</th>
                  <th>地址</th>
                  <th>详细讯息</th>
                  <th>日期</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in contacts">
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" :value="contact._id" v-model="checkedOptions" />
                      <i class="form-icon"></i> &nbsp;
                    </label>
                  </td>
                  <td>{{contact.realName}}</td>
                  <td>{{contact.email}}</td>
                  <td>{{contact.mobile}}</td>
                  <td>{{contact.address}}</td>
                  <td>
                    <textarea class="form-input" :value="contact.detail" rows="1"></textarea>
                  </td>
                  <td>{{contact.createdAt}}</td>
                  <td>
                    <button @click="deleteContactForm(contact._id)" class="btn btn-primary btn-action btn-lg">
                      <i class="icon icon-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="column">
              <span class="float-left">
                <button :disabled="contacts.length==0?true:false" class="btn" @click="deleteContactForms(`${checkedOptions}`)">批量删除</button>
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
    this.getContactForms(1)
  },
  computed: {
    ...mapState(['contacts', 'count']),
    // 计算属性默认只有getter,不过在需要的时候你也可以提供一个setter
    selectAll: {
      get () {
        // 如果contacts还没有的话，即大小=0,则也返回false
        if (this.contacts.length === 0) {
          return false
        } else return this.checkedOptions.length === this.contacts.length
      },
      set (value) {
        let checkedOptions = []
        // 如果计算者点击到了，得到value:true
        if (value) {
          // 当前页contacts，从Vuex store中获取到
          // 遍历此数组，将需要的值，[这里的值 要对应input v-model // :value='相同的字段']放入到
          this.contacts.forEach((i) => {
            checkedOptions.push(i._id)
          })
        }
        // 将值放入到选中的数组中，实现全选
        this.checkedOptions = checkedOptions
      }
    }
  },
  methods: {
    ...mapActions(['getContactForms', 'deleteContactForm', 'deleteContactForms']),
    ...mapMutations(['SET_CONTACT_FORMS', 'SET_COUNT']),
    clickCallback (page) {
      // 分页请求数据
      this.getContactForms(page)
    }
  }
}
</script>

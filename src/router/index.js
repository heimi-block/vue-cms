import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import ConMain from '@/views/ConMain'

import Banner from '@/views/Banner'
import MetaJs from '@/views/MetaJs'
import InfoJs from '@/views/InfoJs'
import Group from '@/views/Group'
import Account from '@/views/Account'
import EditTags from '@/views/EditTags'
import Edit from '@/views/Edit'
import Editor from '@/views/Editor'
import EditorNew from '@/views/EditorNew'
import Attachment from '@/views/Attachment'
import ContactForms from '@/views/ContactForms'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/banner',
      name: 'banner',
      component: Banner
    },
    {
      path: '/meta',
      name: 'meta',
      component: MetaJs
    },
    {
      path: '/info',
      name: 'info',
      component: InfoJs
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/group',
      name: 'group',
      component: Group
    },
    {
      path: '/edit-tags',
      name: 'edit-tags',
      component: EditTags
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/editornew',
      name: 'editornew',
      component: EditorNew
    },
    {
      path: '/attachment',
      name: 'attachment',
      component: Attachment
    },
    {
      path: '/contact-forms',
      name: 'contact-forms',
      component: ContactForms
    },
    {
      path: '/',
      name: 'main',
      component: ConMain
    }
  ]
})

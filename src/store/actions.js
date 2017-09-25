import bannerMan from './banner.ac'
import metaMan from './meta.ac'
import infoMan from './info.ac'
import accountMan from './account.ac'
import groupMan from './group.ac'
import categoryMan from './category.ac'
import articleMan from './article.ac'
import attachmentMan from './attachment.ac'
import formMan from './form.ac'
import googleMan from './google.ac'

export default {
  // Banner ======================================================
  saveBanner ({ state, commit, dispatch }) {
    bannerMan.saveBanner({ state, commit, dispatch })
  },
  deleteBanner ({ state, commit, dispatch }, id) {
    bannerMan.deleteBanner({ state, commit, dispatch }, id)
  },
  deleteBanners ({ state, commit, dispatch }, idArray) {
    bannerMan.deleteBanners({ state, commit, dispatch }, idArray)
  },
  updateBanner ({ state, commit, dispatch }) {
    bannerMan.updateBanner({ state, commit, dispatch })
  },
  getBanners ({ commit }, page) {
    bannerMan.getBanners({ commit }, page)
  },
  getPostsOptions ({ commit }) {
    bannerMan.getPostsOptions({ commit })
  },
  // MetaJs =======================================================
  getMeta ({ commit }) {
    metaMan.getMeta({ commit })
  },
  saveMeta ({ state, commit }) {
    metaMan.saveMeta({ state, commit })
  },
  // InfoJs =======================================================
  getInfo ({ commit }) {
    infoMan.getInfo({ commit })
  },
  saveInfo ({ state, commit }) {
    infoMan.saveInfo({ state, commit })
  },
  // Account =======================================================
  getAccounts ({ commit }, page) {
    accountMan.getAccounts({ commit }, page)
  },
  saveAccount ({ state, commit, dispatch }) {
    accountMan.saveAccount({ state, commit, dispatch })
  },
  deleteAccount ({ state, commit, dispatch }, id) {
    accountMan.deleteAccount({ state, commit, dispatch }, id)
  },
  deleteAccounts ({ state, commit, dispatch }, idArray) {
    accountMan.deleteAccounts({ state, commit, dispatch }, idArray)
  },
  updateAccount ({ state, commit, dispatch }) {
    accountMan.updateAccount({ state, commit, dispatch })
  },
  getGroupsOptions ({ commit }) {
    accountMan.getGroupsOptions({ commit })
  },
  // Group =======================================================
  getGroups ({ commit }, page) {
    groupMan.getGroups({ commit }, page)
  },
  saveGroup ({ state, commit, dispatch }) {
    groupMan.saveGroup({ state, commit, dispatch })
  },
  deleteGroup ({ state, commit, dispatch }, id) {
    groupMan.deleteGroup({ state, commit, dispatch }, id)
  },
  deleteGroups ({ state, commit, dispatch }, idArray) {
    groupMan.deleteGroups({ state, commit, dispatch }, idArray)
  },
  updateGroup ({ state, commit, dispatch }) {
    groupMan.updateGroup({ state, commit, dispatch })
  },
  // Category =======================================================
  getCategorys ({ commit }, page) {
    categoryMan.getCategorys({ commit }, page)
  },
  saveCategory ({ state, commit, dispatch }) {
    categoryMan.saveCategory({ state, commit, dispatch })
  },
  updateCategory ({ state, commit, dispatch }, id) {
    categoryMan.updateCategory({ state, commit, dispatch }, id)
  },
  deleteCategory ({ state, commit, dispatch }, id) {
    categoryMan.deleteCategory({ state, commit, dispatch }, id)
  },
  deleteCategorys ({ state, commit, dispatch }, idArray) {
    categoryMan.deleteCategorys({ state, commit, dispatch }, idArray)
  },
  // Article =======================================================
  getArticle ({ commit }, id) {
    articleMan.getArticle({ commit }, id)
  },
  saveArticle ({ state, commit, dispatch }) {
    articleMan.saveArticle({ state, commit, dispatch })
  },
  updateArticle ({ state, commit, dispatch }) {
    articleMan.updateArticle({ state, commit, dispatch })
  },
  getArticles ({ commit }, page) {
    articleMan.getArticles({ commit }, page)
  },
  deleteArticle ({ state, commit, dispatch }, id) {
    articleMan.deleteArticle({ state, commit, dispatch }, id)
  },
  deleteArticles ({ state, commit, dispatch }, idArray) {
    articleMan.deleteArticles({ state, commit, dispatch }, idArray)
  },
  getCategorysOptions ({ commit }) {
    articleMan.getCategorysOptions({ commit })
  },
  // Attachments =======================================================
  getAttachments ({ commit }, page) {
    attachmentMan.getAttachments({ commit }, page)
  },
  deleteAttachment ({ state, commit, dispatch }, id) {
    attachmentMan.deleteAttachment({ state, commit, dispatch }, id)
  },
  deleteAttachments ({ state, commit, dispatch }, idArray) {
    attachmentMan.deleteAttachments({ state, commit, dispatch }, idArray)
  },
  // ContactForms =======================================================
  getContactForms ({ commit }, page) {
    formMan.getContactForms({ commit }, page)
  },
  deleteContactForm ({ state, commit, dispatch }, id) {
    formMan.deleteContactForm({ state, commit, dispatch }, id)
  },
  deleteContactForms ({ state, commit, dispatch }, idArray) {
    formMan.deleteContactForms({ state, commit, dispatch }, idArray)
  },
  // GoogleAnalytics =======================================================
  getGoogleAnalytics ({ commit }) {
    googleMan.getGoogleAnalytics({ commit })
  }
}


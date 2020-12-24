import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName:'',  //当前电子书在服务器的文件位置
    isShowMenu:false, //title和底部menu是否显示
    showSetting:-1  , //-1表示不显示设置面板,0 :字体, 1 :主题, 2 :进度, 3 :目录
    defaultFontSize:16, //文章默认字体大小
    currentBook:null,  //当前电子书实例
    defaultFontFamily:'Default', //字体设置中的默认字体
    isShowFontFamily:false,  //字体类型设置的弹窗是否显示
  },
  mutations: {
    'SET_FILENAME':(state,newFileName) => {
      state.fileName = newFileName 
    },
    'SET_ISSHOWMENU':(state) => {
      state.isShowMenu = !state.isShowMenu 
    },
    'SET_SHOWSETTING':(state,showSetting) => {
      state.showSetting = showSetting
    },
    'SET_DEFAULTFONT':(state,defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_CURRENTBOOK':(state,currentBook) => {
      state.currentBook = currentBook
    },
    'SET_DEFAULTFONTFAMILY':(state,defaultFontFamily) => {
      state.defaultFontFamily = defaultFontFamily
    },
    'SET_ISSHOWFONTFAMILY':(state,isShowFontFamily) => {
      state.isShowFontFamily = isShowFontFamily
    }
  },
  actions: {
    setFileName:({ commit },newFileName) => {
      return commit('SET_FILENAME',newFileName)
    },
    setShowMenu:({ commit }) => {
      return commit('SET_ISSHOWMENU')
    },
    setShowSetting:({ commit },showSetting) => {
      return commit('SET_SHOWSETTING',showSetting)
    },
    setDefaultFont:({ commit },defaultFontSize) => {
      return commit('SET_DEFAULTFONT',defaultFontSize)
    },
    setCurrentBook:({ commit },currentBook) => {
      return commit('SET_CURRENTBOOK',currentBook)
    },
    setDefaultFontFamily:({ commit },defaultFontFamily) => {
      return commit('SET_DEFAULTFONTFAMILY',defaultFontFamily)
    },
    setShowFontFamily:({ commit },isShowFontFamily) => {
      return commit('SET_ISSHOWFONTFAMILY',isShowFontFamily)
    }
  },
  modules: {
  }
})

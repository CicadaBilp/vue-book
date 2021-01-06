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
    defaultTheme:'Default',  //当前主题
    progress:0,  //进度条值
    bookAvailable:false,  //电子书是否分页解析完成
    section:0,  //当前章节
    cover:null, //电子书封面图片路径
    metadata:null, //电子书作者和书名信息
    navigation:null,  //电子书解析完成的目录信息
    offsetY:0,  //电子书组件下拉偏移量或home组件中的滚动距离
    isMark:false, //当前页是否为书签

    hotSearchOffsetY:0,  //热门搜索组件内的scroll滚动距离
    flapCardVisible:false,  //是否显示随机推荐页面
    isEditMode:false,  //是否处于编辑书架状态
    shelfList:[],  //书架列表
    shelfSelected:[],  //书架已选择书籍列表
    shelfTitleVisible:true,  //是否显示书架页面标题
    shelfCategory:[],  //书架分组图书的列表
    currentType:1,  //在书架列表为1,在书架分组列表为2
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
    },
    'SET_DEFAULTTHEME':(state,defaultTheme) => {
      state.defaultTheme = defaultTheme
    },
    'SET_PROGRESS':(state,progress) => {
      state.progress = progress
    },
    'SET_BOOKAVAILABLE':(state,bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_SECTION':(state,newSection) => {
      state.section = newSection
    },
    'SET_COVER':(state,cover) => {
      state.cover = cover
    },
    'SET_METADATA':(state,metadata) => {
      state.metadata = metadata
    },
    'SET_NAVIGATION':(state,navigation) => {
      state.navigation = navigation
    },
    'SET_OFFSETY':(state,offsetY) => {
      state.offsetY = offsetY
    },
    'SET_ISMARK':(state,ismark) => {
      state.isMark = ismark
    },
    'SET_HOTSEARCHOFFSETY':(state,offsetY) => {
      state.hotSearchOffsetY = offsetY
    },
    'SET_FLAPCAED':(state,flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    },
    'SET_ISEDITMODE':(state,isEditMode) => {
      state.isEditMode = isEditMode
    },
    'SET_SHELFLIST':(state,shelfList) => {
      state.shelfList = shelfList
    },
    'SET_SHELFSELECTED':(state,shelfSelected) => {
      state.shelfSelected = shelfSelected
    },
    'SET_SHELFTITLEVISIBLE':(state,shelfTitleVisible) => {
      state.shelfTitleVisible = shelfTitleVisible
    },
    'SET_SHELFCATEGORY':(state,shelfCategory) => {
      state.shelfCategory = shelfCategory
    },
    'SET_CURRENTTYPE':(state,currentType) => {
      state.currentType = currentType
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
    },
    setDefaultTheme:({commit},defaultTheme) => {
      return commit('SET_DEFAULTTHEME',defaultTheme)
    },
    setProgress:({commit},progress) => {
      return commit('SET_PROGRESS',progress)
    },
    setBookAvailable:({commit},bookAvailable) => {
      return commit('SET_BOOKAVAILABLE',bookAvailable)
    },
    setSection:({commit},newSection) => {
      return commit('SET_SECTION',newSection)
    },
    setCover:({commit},cover) => {
      return commit('SET_COVER',cover)
    },
    setMetadata:({commit},metadata) => {
      return commit('SET_METADATA',metadata)
    },
    setNavigation:({commit},navigation) => {
      return commit('SET_NAVIGATION',navigation)
    },
    setOffsetY:({commit},offsetY) => {
      return commit('SET_OFFSETY',offsetY)
    },
    setIsMark:({commit},ismark) => {
      return commit('SET_ISMARK',ismark)
    },
    setHotSearchOffsetY:({commit},offsetY) => {
      return commit('SET_HOTSEARCHOFFSETY',offsetY)
    },
    setFlapCard:({commit},flapCardVisible) => {
      return commit('SET_FLAPCAED',flapCardVisible)
    },
    setEditMode:({commit},isEditMode) => {
      return commit('SET_ISEDITMODE',isEditMode)
    },
    setShelfList:({commit},shelfList) => {
      return commit('SET_SHELFLIST',shelfList)
    },
    setShelfSelected:({commit},shelfSelected) => {
      return commit('SET_SHELFSELECTED',shelfSelected)
    },
    setShelfTitleVisible:({commit},shelfTitleVisible) => {
      return commit('SET_SHELFTITLEVISIBLE',shelfTitleVisible)
    },
    setShelfCategory:({commit},shelfCategory) => {
      return commit('SET_SHELFCATEGORY',shelfCategory)
    },
    setCurrentType:({commit},currentType) => {
      return commit('SET_CURRENTTYPE',currentType)
    }

  },
  modules: {
  }
})

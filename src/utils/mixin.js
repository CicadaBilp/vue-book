//将映射vuex中的action和state的操作抽离到mixin中,在需要使用的地方导入进行融合即可

import { mapState, mapActions } from 'vuex'
import {addCss, removeAllCss} from './book'
import {setLocation} from './localStorage'

export const bookMixin = {
  computed: {
    ...mapState(
      [
        'isShowMenu',
        'fileName',
        'showSetting',
        'defaultFontSize',
        'currentBook',
        'defaultFontFamily',
        'isShowFontFamily',
        'defaultTheme',
        'progress',
        'bookAvailable',
        'section'
      ]
    )
  },
  methods: {
    ...mapActions(
      [
        'setShowMenu',
        'setFileName',
        'setShowSetting',
        'setDefaultFont',
        'setCurrentBook',
        'setDefaultFontFamily',
        'setShowFontFamily',
        'setDefaultTheme',
        'setProgress',
        'setBookAvailable',
        'setSection'
      ]
    ),
    //添加准备的全局样式
    initGlobalStyle(){
      removeAllCss()
      switch(this.defaultTheme){
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
      }
    },
    //根据当前页首的cfi更新进度条值,章节值并将当前页首cfi信息存入缓存
    reloadedProgress(){
      //拿到当前页的定位信息
      const currLocation = this.currentBook.rendition.currentLocation()
      //拿到当前页首的cfi位置信息
      const startCfi = currLocation.start.cfi
      //根据页首的cfi信息获取到这页所在的进度值
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      //将进度值更新到vuex中
      this.setProgress(Math.floor(progress * 100))
      //再从当前页定位信息中拿到所在章节值更新到vuex中
      this.setSection(currLocation.start.index)
      //将当前页首的cfi信息存入缓存,以便刷新页面时拿到上次阅读的位置
      setLocation(this.fileName,startCfi)
    }
  }
}
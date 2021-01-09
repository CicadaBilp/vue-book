//将映射vuex中的action和state的操作抽离到mixin中,在需要使用的地方导入进行融合即可

import { mapState, mapActions } from 'vuex'
import { addCss, removeAllCss } from './book'
import { setLocation, getReadTime, getBookMark } from './localStorage'
import { appendShelf ,removeAddFromShelf,computId} from "./store";
import { shelf } from "../api/store";
import { getBookshelf, setBookShelf } from "./localStorage";

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
        'section',
        'cover',
        'metadata',
        'navigation',
        'offsetY',
        'isMark'
      ]
    ),
    getSectionName() {
      return this.section ? this.navigation[this.section].label : ''
    }
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
        'setSection',
        'setCover',
        'setMetadata',
        'setNavigation',
        'setOffsetY',
        'setIsMark'
      ]
    ),
    //添加准备的全局样式
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
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
    reloadedProgress() {
      //拿到当前页的定位信息
      const currLocation = this.currentBook.rendition.currentLocation()
      if (currLocation && currLocation.start) {
        //拿到当前页首的cfi位置信息
        const startCfi = currLocation.start.cfi
        //根据页首的cfi信息获取到这页所在的进度值
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        //将进度值更新到vuex中
        this.setProgress(Math.floor(progress * 100))
        //再从当前页定位信息中拿到所在章节值更新到vuex中
        this.setSection(currLocation.start.index)
        //将当前页首的cfi信息存入缓存,以便刷新页面时拿到上次阅读的位置
        setLocation(this.fileName, startCfi)
        const bookmark = getBookMark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsMark(true)
          } else {
            this.setIsMark(false)
          }
        } else {
          this.setIsMark(false)
        }
      }
    },
    //点击切换标题和底部菜单的显示,并总是将showSetting设为-1,showFontFamily设为false
    toggleTitleMenu() {
      this.setShowMenu();
      //派发不显示设置面板
      this.setShowSetting(-1);
      //派发关闭字体设置弹窗的显示
      this.setShowFontFamily(false);
    },
    getReadTimeText() {
      const readTime = getReadTime(this.fileName)
      if (!readTime) {
        return 0
      } else {
        return '已阅读' + Math.ceil(readTime / 60) + '分钟'
      }
    }
  }
}

export const homeMixin = {
  computed: {
    ...mapState([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCard'
    ]),
    showBookDetail(book) {
      this.setFlapCard(false)
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}

export const storeShelfMixin = {
  computed: {
    ...mapState([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods:{
    ...mapActions([
      'setEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    },
    //获取书架全部图书
    getShelfList() {
      let shelfList = getBookshelf();
      console.log('getshelfList被调用');
      if (!shelfList) {
        shelf().then((res) => {
          console.log(res);
          if (res.status === 200 && res.data && res.data.bookList) {
            shelfList = appendShelf(res.data.bookList);
            setBookShelf(shelfList);
            return this.setShelfList(shelfList);
          }
        });
      } else {
        return this.setShelfList(shelfList);
      }
    },
    getCategoryList(title){
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    },
    moveOutGroup(f) {
      console.log('aaa');
      this.setShelfList(this.shelfList.map(book => {
        if(book.type === 2 && book.itemList){
          book.itemList = book.itemList.filter(book2 => !book2.selected)
        }
        return book
      })).then(() => {
        let  list = removeAddFromShelf(this.shelfList)
        list = [].concat(list, ...this.shelfSelected) 
        list = computId(appendShelf(list))
        this.setShelfList(list).then(()=>{ 
          this.simpleToast('移动成功') 
          // this.onComplete() 
          if(f) f()
        })
      })
    },
  }
}
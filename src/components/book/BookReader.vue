<template>
  <div class="book-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { bookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins:[bookMixin],
  methods:{
    //该函数,在派发action完成后调用,用来初始化路径下的电子书
    initEpub(){
      const url = 'http://localhost:9001/epub/' + this.fileName + '.epub'
      //根据地址在nginx中访问到epub文件,生成实例
      this.book = new Epub(url)
      //派发action设置vuex中的currentBook
      this.setCurrentBook(this.book)
      //在#read元素渲染该实例,返回创建的电子书结构
      this.render = this.book.renderTo('read',{
        width:innerWidth,
        height:innerHeight,
        method:'default'
      })
      console.log(this.book);
      //显示
      this.render.display()
      //给render注册触屏开始和结束事件
      this.render.on('touchstart',event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.render.on('touchend',event => {
        const X = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if(time < 500 && X < -50){
          this.prevPage()
        }else if(time < 500 && X > 50) {
          this.nextPage()
        }else{
          this.toggleTitleMenu()
        }
        //取消触屏事件默认行为和传播  
        // event.preventDefault()
        event.stopPropagation()
      })
      const URL = process.env.VUE_APP_RES_URL
      //因为创建的电子书展示是在iframe中的,所以在使用web字体时需要先将字体文件导入iframe中
      this.render.hooks.content.register(contents => {
        //该方法导入字体css文件时需要使用url
        contents.addStylesheet(`${URL}/fonts/daysOne.css`),
        contents.addStylesheet(`${URL}/fonts/cabin.css`),
        contents.addStylesheet(`${URL}/fonts/montserrat.css`),
        contents.addStylesheet(`${URL}/fonts/tangerine.css`)
      })
    },
    //上一页
    prevPage(){
      if(this.render){
        this.render.prev()
        this.hideTitleMenu()
      }
    },
    //下一页
    nextPage(){
      if(this.render){
        this.render.next()
        this.hideTitleMenu()
      }
    },
    //触屏非翻页,切换显示隐藏
    toggleTitleMenu(){
      this.setShowMenu()
      //派发不显示设置面板
      this.setShowSetting(-1)
      //派发关闭字体设置弹窗的显示
      this.setShowFontFamily(false)
    },
    //当翻页时隐藏标题和菜单
    hideTitleMenu(){
      if(this.isShowMenu){
        this.setShowMenu()
      }
      this.setShowFontFamily(false)
    }
  },
  mounted() {
    //派发一个action,参数为动态路由中传入的参数(电子书在服务器存放的文件位置),以此更改fileName的值,
    this.setFileName(this.$route.params.fileName.split('|').join('/'))
      .then(this.initEpub())
  }
}
</script>

<style>

</style>
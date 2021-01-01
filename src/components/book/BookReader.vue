<template>
  <div class="book-reader">
    <div id="read"></div>
    <div
      class="book-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseup="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import { themeList, flatten } from "../../utils/book";
import {
  getFontFamily,
  setFontFamily,
  getFontSize,
  setFontSize,
  getlocalTheme,
  setlocalTheme,
  getLocation,
} from "../../utils/localStorage";
import Epub from "epubjs";
global.ePub = Epub;

export default {
  mixins: [bookMixin],
  computed: {
    //导入方法返回主题数组
    themeList() {
      return themeList(this);
    },
  },
  methods: {
    //该函数,在派发action完成后调用,用来初始化路径下的电子书
    initEpub() {
      const url =
        process.env.VUE_APP_RES_URL + "/epub/" + this.fileName + ".epub";
      //根据地址在nginx中访问到epub文件,生成实例
      this.book = new Epub(url);
      //派发action设置vuex中的currentBook
      this.setCurrentBook(this.book);
      //调用渲染函数,渲染电子书到页面,并根据缓存做一系列初始化操作
      this.initRender();
      //翻页触屏事件
      this.initGesture();
      //解析电子书信息
      this.parseBook();
      //book对象的ready钩子函数会在初始化完成后调用,此时再进行分页设置
      this.book.ready.then(() => {
        //进行简单分页,每页默认750字,再乘以窗口与375的比和字体大小与16的比
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then(() => {
            this.setBookAvailable(true);
            this.reloadedProgress();
          });
      });
    },

    //渲染电子书函数
    initRender() {
      //在#read元素渲染该实例,返回创建的电子书结构
      this.render = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default",
      });
      //先去缓存中取存储的阅读进度信息,如果有就渲染,
      const location = getLocation(this.fileName);
      console.log(location);
      //显示,//初始化页面完成后去localStorage中获取字体类型,主题,字体大小并设置显示
      if (!location) {
        this.render.display().then(() => {
          // this.reloadedProgress()
          this.initFontFamily();
          this.initFontSize();
          this.initTheme();
          this.initGlobalStyle();
        });
      } else {
        this.render.display(location).then(() => {
          // this.reloadedProgress()
          this.initFontFamily();
          this.initFontSize();
          this.initTheme();
          this.initGlobalStyle();
        });
      }
      //因为创建的电子书展示是在iframe中的,所以在使用web字体时需要先将字体文件导入iframe中
      this.render.hooks.content.register((contents) => {
        //该方法导入字体css文件时需要使用url
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
        ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          );
      });
    },
    //翻页触屏事件函数
    initGesture() {
      //给render注册触屏开始和结束事件
      this.render.on("touchstart", (event) => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.render.on("touchend", (event) => {
        const X = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && X < -50) {
          this.prevPage();
        } else if (time < 500 && X > 50) {
          this.nextPage();
        } else {
          this.toggleTitleMenu();
        }
        //取消触屏事件默认行为和传播
        // event.preventDefault()
        event.stopPropagation();
      });
    },
    //解析电子书图片,作者,目录等信息
    parseBook() {
      //获取电子书封面图片
      this.book.loaded.cover.then((cover) => {
        this.book.archive.createUrl(cover).then((url) => {
          this.setCover(url);
        });
      });
      //获取电子书作者,书名的信息
      this.book.loaded.metadata.then((metadata) => {
        this.setMetadata(metadata);
      });
      //获取电子书目录信息
      this.book.loaded.navigation.then((nav) => {
        const navItem = flatten(nav.toc);
        function find(item, level = 0) {
          if (!item.parent) {
            return level;
          } else {
            return find(
              navItem.filter((parentItem) => parentItem.id === item.parent)[0],
              ++level
            );
          }
        }
        navItem.forEach((item) => {
          item.level = find(item);
        });
        this.setNavigation(navItem);
      });
    },
    //上一页
    prevPage() {
      if (this.render) {
        this.render.prev().then(() => this.reloadedProgress());
        this.hideTitleMenu();
      }
    },
    //下一页
    nextPage() {
      if (this.render) {
        this.render.next().then(() => this.reloadedProgress());
        this.hideTitleMenu();
      }
    },
    //当翻页时隐藏标题和菜单
    hideTitleMenu() {
      if (this.isShowMenu) {
        this.setShowMenu();
      }
      this.setShowFontFamily(false);
    },
    //初始化字体大小,获取缓存font-size设置
    initFontSize() {
      let fontSize = getFontSize(this.fileName);

      if (!fontSize) {
        //如果未获取到fontSize,就存入此时vuex默认字体
        setFontSize(this.fileName, this.defaultFontSize);
      } else {
        //如果可以获取到已经存入的字体大小,就将电子书字体设置为获取的大小,并且更改vuex中的defaultFont值
        this.book.rendition.themes.fontSize(fontSize);
        this.setDefaultFont(fontSize);
      }
    },
    //初始化字体类型,获取缓存font-family设置
    initFontFamily() {
      let fontFamily = getFontFamily(this.fileName);
      if (!fontFamily) {
        //如果未获取到fontFamily,就存入Default字体
        setFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        //如果可以获取到已经存入的字体,就将电子书字体设置为获取的类型,并且更改vuex中的defaultFamily值
        this.book.rendition.themes.font(fontFamily);
        this.setDefaultFontFamily(fontFamily);
      }
    },
    //初始化主题
    initTheme() {
      //缓存中取主题
      let theme = getlocalTheme(this.fileName);
      //如果没有则将其设为Default
      if (!theme) {
        theme = "Default";
        setlocalTheme(this.fileName, theme);
      }
      //根据缓存中的值更改vuex中的主题
      this.setDefaultTheme(theme);
      //遍历主题列表,将主题注册入电子书中
      this.themeList.forEach((theme) => {
        this.book.rendition.themes.register(theme.name, theme.style);
      });
      //调用方法设置主题为vuex中的默认主题
      this.book.rendition.themes.select(theme);
    },
    onMaskClick(e) {
      //兼容pc端鼠标下拉操作,当状态值为2或3时不触发点击翻页事件,表示
      if(this.mouseState && (this.mouseState===2 || this.mouseState===3)){
        return
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage();
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage();
      } else {
        this.toggleTitleMenu();
      }
    },
    //给朦版注册move事件,当移动时实时获得相距初始位置的移动距离更新到vuex中的offsetY
    move(e) {
      // console.log(e.changedTouches[0].clientY);
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    //注册moveEnd事件,当松手不再移动时,重置vuex中offsetY为0和初始位置为null
    moveEnd(e) {
      this.setOffsetY(0);
      this.firstOffsetY = null;
    },
    //pc端鼠标下拉操作的第一步,鼠标按下
    onMouseEnter(e) {
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp
      e.preventDefault();
      e.stopPropagation();
    },
    //pc端鼠标下拉操作的第二步,鼠标按下再移动
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    //第三步,鼠标按下移动后松开
    onMouseEnd(e) {
      if(this.mouseState === 2){
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      }else{ //离开时当状态不是2,则设为4,表示普通点击
        this.mouseState = 4
      }
      //判断按下到离开的时间,<200,设为普通点击,可进行翻页
      const time = e.timeStamp - this.mouseStartTime
      if(time < 200){
        this.mouseState = 4
      }
      e.preventDefault();
      e.stopPropagation();
    },
  },
  mounted() {
    //派发一个action,参数为动态路由中传入的参数(电子书在服务器存放的文件位置),以此更改fileName的值,
    this.setFileName(
      this.$route.params.fileName.split("|").join("/")
    ).then(() => this.initEpub());
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.book-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .book-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 150;
    background: transparent;
  }
}
</style>
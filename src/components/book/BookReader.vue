<template>
  <div class="book-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import { themeList } from "../../utils/book";
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
      }else{
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
    //触屏非翻页,切换显示隐藏
    toggleTitleMenu() {
      this.setShowMenu();
      //派发不显示设置面板
      this.setShowSetting(-1);
      //派发关闭字体设置弹窗的显示
      this.setShowFontFamily(false);
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
  },
  mounted() {
    //派发一个action,参数为动态路由中传入的参数(电子书在服务器存放的文件位置),以此更改fileName的值,
    this.setFileName(
      this.$route.params.fileName.split("|").join("/")
    ).then(() => this.initEpub());
  },
};
</script>

<style>
</style>
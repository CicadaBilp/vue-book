<template>
  <div class="book-mark" ref="bookMark">
    <div class="book-mark-text-wrapper">
      <div class="book-mark-down-wrapper">
        <span class="icon-down" ref="icon"></span>
      </div>
      <div class="book-mark-text">{{ text }}</div>
    </div>
    <div class="book-mark-icon-wrapper" :style="isFixed ? fixedStyle : ''">
      <mark :color="color"></mark>
    </div>
  </div>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import { realPx, px2rem } from "../../utils/util";
import { getBookMark, setBookMark } from "../../utils/localStorage";
import Mark from "../common/Mark.vue";
const COLOR = "chocolate";
export default {
  mixins: [bookMixin],
  data() {
    return {
      text: "",  //下拉时书签组件需要展示的文字
      color: "",  //传递给书签图形要展示的颜色
      isFixed: false,  //是否固定定位
    };
  },
  components: { Mark },
  watch: {
    offsetY(v) {
      //状态2:下拉距离在组件高度与临界值之前,组件top应随offsetY改变
      if (v >= this.height && v <= this.threshold) {
        this.$refs.bookMark.style.top = `${-v}px`;
        this.isFixed = false;
      }
      //状态3:下拉距离大于临界值,组件top依旧随offsetY改变
      else if (v >= this.threshold) {
        this.$refs.bookMark.style.top = `${-v}px`;
        //判断本页是否添加了书签,改变现实文字和颜色,取消或设置固定
        if (this.isMark) {
          this.text = "松手删除书签";
          this.color = "";
          this.isFixed = false;
        } else {
          this.text = "松手添加书签";
          this.color = COLOR;
          this.isFixed = true;
        }
      }
      //状态1:下拉距离在0和组件高度之间
      else if (v > 0 && v < this.height) {
        if (this.isMark) {
          this.text = "下拉删除书签";
          this.color = COLOR;
          this.isFixed = true;
        } else {
          this.text = "下拉添加书签";
          this.color = "";
          this.isFixed = false;
        }
      }
      //状态4:下拉距离回归0,判断是否isFixed,为true表示添加了书签就更新vuex中的isMark为true
      //并且调用addMark方法将本页添加书签,反之
      else if (v === 0) {
        this.$refs.bookMark.style.top = `${px2rem(-35)}rem`;
        if (this.isFixed) {
          this.setIsMark(true);
          this.addMark();
        } else {
          this.setIsMark(false);
          this.removeMark();
        }
      }
    },
    isMark(mark){
      if(mark){
        this.color = COLOR
        this.isFixed = true
      }else{
        this.isFixed = false
      }
    }
  },
  methods: {
    //添加本页为书签
    addMark() {
      //先从缓存中获取书签数组
      this.boomark = getBookMark(this.fileName);
      if (!this.bookmark) {
        this.bookmark = [];
      }
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfibase = currentLocation.start.cfi.replace(/!.*/, "");
      const cfistart = currentLocation.start.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfiend = currentLocation.end.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfi = `${cfibase}!,${cfistart},${cfiend})`;
      this.currentBook.getRange(cfi).then((range) => {
        const text = range.toString().replace(/\s\s/g, "");
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text: text,
        })
        //将计算好的本页书签信息push到书签数组,并存入缓存中
        setBookMark(this.fileName, this.bookmark);
      })  
    },
    //删除本页书签
    removeMark() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfi = currentLocation.start.cfi;
      //拿到缓存的书签数组
      this.bookmark = getBookMark(this.fileName);
      if (this.bookmark) {
        //从书签数组中过滤出含有本页cfi信息的元素,设为新书签数组
        this.bookmark = this.bookmark.filter((item) => item.cfi !== cfi);
        setBookMark(this.fileName, this.bookmark);
        this.setIsMark(false);
      }
    },
  },
  computed: {
    height() {
      return realPx(35);
    },
    threshold() {
      return realPx(55);
    },
    //书签组件固定定位的样式
    fixedStyle() {
      return {
        position: "fixed",
        top: 0,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.book-mark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  // background-color: blueviolet;
  width: 100%;
  height: px2rem(35);
  .book-mark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .book-mark-down-wrapper {
      font-size: px2rem(14);
      color: white;
      transition: all 0.2s linear;
      @include center;
    }
    .book-mark-text {
      font-size: px2rem(14);
      color: white;
    }
  }
  .book-mark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>

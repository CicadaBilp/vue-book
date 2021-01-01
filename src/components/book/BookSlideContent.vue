<template>
  <div class="slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisable"
        @click="hideSearchPage"
      >
        {{ $t("book.cancel") }}
      </div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{ metadata.title }}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{ metadata.creator }}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{ progress + "%" }}</span>
          <span class="progress-text">已阅读</span>
        </div>
        <div class="slide-contents-book-progress-time">
          {{ getReadTimeText() }}
        </div>
      </div>
    </div>
    <scroll class="slide-contents-scroll" :top="156" :bottom="48" ref="scroll">
      <div
        class="slide-contents-item"
        v-for="(item, index) in navigation"
        :key="index"
      >
        <span
          class="slide-contents-item-label"
          :class="{ selected: index === section }"
          @click="displaySection(item.href)"
        >
          {{ item.label }}
        </span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <!-- <scroll class="slide-contents-search-list"
      :top="66" :bottom="48" v-show="searchVisable"
    >
      <div class="slide-search-item" 
        v-for="(item,index) in searchList" :key="index">
        {{item.excerpt}}
      </div>
    </scroll> -->
  </div>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import Scroll from "../common/Scroll.vue";

export default {
  components: { Scroll },
  mixins: [bookMixin],
  data() {
    return {
      searchVisable: false
    }
  },
  methods: {
    //点击取消,隐藏取消的文字
    hideSearchPage() {
      this.searchVisable = false;
    },
    //点击输入框显示取消的文字
    showSearchPage() {
      this.searchVisable = true;
    },
    //点击目录章节跳转到指定章节
    displaySection(href) {
      this.currentBook.rendition.display(href).then(() => {
        this.toggleTitleMenu();
        this.reloadedProgress();
      });
    },
    //通过关键字进行全文搜索的方法
    // doSearch() {
    //   return Promise.all(
    //     this.currentBook.spine.spineItems.map((item) =>
    //       item
    //         .load(this.currentBook.load.bind(this.currentBook))
    //         .then(item.find.bind(item, q))
    //         .finally(item.unload.bind(item))
    //     )
    //   ).then((results) => Promise.resolve([].concat.apply([], results)));
    // },
  },
  mounted() {
    // console.log(this.metadata.title);
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.slide-contents {
  width: 100%;
  height: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search {
      flex: 1;
      @include centers;
      .slide-contents-search-icon {
        width: px2rem(28);
        height: 100%;
        font-size: px2rem(14);
        @include centers;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background-color: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      width: px2rem(50);
      font-size: px2rem(14);
      @include centers;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      width: px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        font-size: px2rem(14);
        //对于元素内文字单行不换行带省略号这个设置,需要指定元素的宽度才可以
        //屏幕总宽375减去各种margin,padding得到bookinfo的宽度为153.75px
        // width: px2rem(153.75);
        line-height: px2rem(16);
        @include left;
        .slide-contents-book-title-text{
          @include ellipsis2(2);
        }   
      }
      .slide-contents-book-author {
        font-size: px2rem(12);
        // width: px2rem(153.75);
        margin-top: px2rem(5);
        @include left;
        .slide-contents-book-author-text{
          @include ellipsis;
        }
      }
    }
    .slide-contents-book-progress-wrapper {
      width: px2rem(70);
      .slide-contents-book-progress {
        @include centers;
        margin-bottom: px2rem(10);
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-progress-time {
        font-size: px2rem(12);
      }
    }
  }
  .slide-contents-scroll {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      padding: px2rem(20) 0;
      box-sizing: border-box;
      display: flex;
      .slide-contents-item-label {
        font-size: px2rem(14);
        flex: 1;
        @include ellipsis;
        &.selected {
          color: chocolate;
        }
      }
      .slide-contents-item-page {
      }
    }
  }
}
</style>
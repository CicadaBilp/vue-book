<template>
  <div>
    <div
      class="search-bar"
      :class="{ hide: !titleVisible, 'hide-shadow': !shadowVisible }"
    >
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{ $t("home.title") }}</span>
          </div>
          <div class="title-icon-shake-wrapper">
            <span class="icon-shake"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" 
           :class="{ hide: !titleVisible }"
           @click="back"
      >
        <span class="icon-back"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{ hide: !titleVisible }">
        <div class="search-bar-blank" :class="{ hide: !titleVisible }"></div>
        <div class="searrch-bar-input">
          <span class="icon-search"></span>
          <input
            type="text"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
          />
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
import { homeMixin } from "../../utils/mixin";
import HotSearchList from './HotSearchList.vue';
export default {
  components: { HotSearchList },
  mixins: [homeMixin],
  data() {
    return {
      searchText: "",  //输入框的值
      titleVisible: true,  //是否显示标题栏
      shadowVisible: false,  //是否显示阴影
      hotSearchVisible:false  //是否显示热门搜索组件
    };
  },
  watch: {
    //监听offsetY的变化
    offsetY(y) {
      //当y> 0时就将titleVisible设为false,隐藏标题部分
      if (y > 0) {
        this.hideTitle();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
    hotSearchOffsetY(y){
      if(y > 0){
        this.showShadow()
      }else{
        this.hideShadow()
      }
    }
  },
  methods: {
    hideTitle() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    },
    showHotSearch(){
      this.hotSearchVisible = true
      this.hideTitle()
      this.hideShadow()
      //调用hostsearchlist组件中的reset方法让滚动条回到顶点,
      //这个操作需要在hostsearchlist组件的dom显示出来后才能执行,可放在nextTick回调中
      // this.$nextTick(() => {
      //   this.$refs.hotSearch.reset()
      // })
    },
    hideHotSearch(){
      this.hotSearchVisible = false
    },
    back(){
      if(this.offsetY > 0){
        this.hideTitle()
        this.showShadow()
      }else{
        this.hideShadow()
        this.showTitle()
      }
      this.hideHotSearch()
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.search-bar {
  position: relative;
  width: 100%;
  height: px2rem(88);
  z-index: 105;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide {
    height: px2rem(46);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    .title-text-wrapper {
      width: 100%;
      height: px2rem(42);
      color: #666;
      font-size: px2rem(16);
      @include centers;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      top: 0;
      right: px2rem(15);
      height: px2rem(42);
      color: #666;
      font-size: px2rem(16);
      @include centers;
    }
  }
  .title-icon-back-wrapper {
    position: absolute;
    top: 0;
    left: px2rem(15);
    z-index: 200;
    height: px2rem(42);
    color: #666;
    font-size: px2rem(16);
    transition: height 0.2s linear;
    @include centers;
    &.hide {
      height: px2rem(46);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    top: px2rem(42);
    left: 0;
    width: 100%;
    height: px2rem(46);
    padding: px2rem(6) px2rem(10);
    box-sizing: border-box;
    transition: top 0.2s linear;
    display: flex;
    &.hide {
      top: 0;
    }
    .search-bar-blank {
      width: 0;
      transition: all 0.2s linear;
      &.hide {
        width: px2rem(36);
      }
    }
    .searrch-bar-input {
      flex: 1;
      width: 100%;
      background-color: #f4f4f4;
      border-radius: px2rem(20);
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid #eee;
      @include left;
      .icon-search {
        color: #999;
        font-size: px2rem(16);
      }
      input {
        width: 100%;
        height: px2rem(22);
        border: none;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;
        background-color: transparent;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #999;
        }
      }
    }
  }
}
</style>
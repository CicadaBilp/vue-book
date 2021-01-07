<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="isShowMenu && showSetting === 3">
      <transition name="slide-right">
        <div class="content" v-if="showSetting === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab == 1 ? content : bookmark" />
            </div>
            <div class="content-page-tab">
              <div
                class="tab-item"
                :class="{ selected: currentTab == 1 }"
                @click="selectTab(1)"
              >
                {{ $t("book.navigation") }}
              </div>
              <div
                class="tab-item"
                :class="{ selected: currentTab == 2 }"
                @click="selectTab(2)"
              >
                {{ $t("book.bookmark") }}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <book-loading></book-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="toggleTitleMenu"></div>
    </div>
  </transition>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import BookLoading from './BookLoading.vue';
import BookSlideContentVue from "./BookSlideContent.vue";
import BookSlideMark from './BookSlideMark'
export default {
  components: { BookLoading },
  mixins: [bookMixin],
  data() {
    return {
      currentTab: 1,  //默认展示目录模块
      content: BookSlideContentVue,  //导入目录模块组件
      bookmark: BookSlideMark,  //导入书签模块组件
    };
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 202;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    flex: 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
        // background-color: aqua;
      }
      .content-page-tab {
        // flex: px2rem(48);
        display: flex;
        width: 100%;
        height: px2rem(48);
        // background-color: brown;
        .tab-item {
          flex: 1;
          font-size: px2rem(14);
          @include centers;
          &.selected {
            color: chocolate;
          }
        }
      }
    }
    .content-empty{
      width:100%;
      height:100%;
    }
  }
  .content-bg {
    flex: 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
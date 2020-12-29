<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': !isShowMenu || showSetting > -1 }"
        v-show="isShowMenu"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="Setting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="Setting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="Setting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="Setting(0)"></span>
        </div>
      </div>
    </transition>
    <book-setting-font></book-setting-font>
    <setting-font-family></setting-font-family>
    <book-setting-theme></book-setting-theme>
    <book-progress></book-progress>
    <book-slide></book-slide>
  </div>
</template>

<script>
import { bookMixin } from "../../utils/mixin";
import BookSettingFont from "./BookSettingFont";
import SettingFontFamily from './SettingFontFamily'
import BookSettingTheme from './BookSettingTheme'
import BookProgress from './BookProgress.vue';
import BookSlide from './BookSlide.vue';



export default {
  mixins: [bookMixin],
  methods: {
    //底部菜单图标的点击事件,将图标对应的数值传到vuex中改变showSetting的值
    Setting(id) {
      this.setShowSetting(id);
    },
  },
  components:{
    BookSettingFont,
    SettingFontFamily,
    BookSettingTheme,
    BookProgress,
    BookSlide
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 102;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(28);
    }
    .icon-bright {
      font-size: px2rem(24);
    }
  }
}
</style>
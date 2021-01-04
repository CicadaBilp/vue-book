<template>
  <div class="shelf-search-wrapper" :class="{'search-top' : inputClicked,'hideShadow' : isHideShadow}">
    <div class="shelf-search" :class="{ 'search-top': inputClicked }">
      <div class="search-wrapper">
        <div class="search-icon-wrapper">
          <span class="icon-search"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            v-model="searchText"
          />
        </div>
        <div
          class="clear-icon-wrapper"
          v-show="searchText.trim().length > 0"
          @click="clearSearchText"
        >
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="cancel-btn-wrapper" v-show="inputClicked">
        <span class="cancel-text" @click="onCancelClick">取消</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-show="inputClicked">
        <div
          class="shelf-search-tab-item"
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        >
          <span
            class="shelf-search-tab-text"
            :class="{ selectedTab: item.id === selectedTab }"
            >{{ item.text }}</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      inputClicked: false,
      searchText: "",
      selectedTab: 1,
      isHideShadow:true
    };
  },
  computed: {
    tabs() {
      return [
        {
          id: 1,
          text: this.$t("shelf.default"),
        },
        {
          id: 2,
          text: this.$t("shelf.progress"),
        },
        {
          id: 3,
          text: this.$t("shelf.purchase"),
        },
      ];
    },
  },
  watch:{
    offsetY(y){
      if(y > 0){
        this.isHideShadow = false
      }else{
        this.isHideShadow = true
      }
    }
  },
  methods: {
    onSearchClick() {
      this.inputClicked = true;
      this.setShelfTitleVisible(false);
    },
    onCancelClick() {
      this.inputClicked = false;
      this.setShelfTitleVisible(true);
    },
    clearSearchText() {
      this.searchText = "";
    },
    onTabClick(id) {
      this.selectedTab = id;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: px2rem(94);
  font-size: px2rem(16);
  background-color: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
  &.search-top{
    position: fixed;
    top: 0;
    left: 0;
  }
  &.hideShadow{
    box-shadow: none;
  }
  .shelf-search {
    position: absolute;
    top: px2rem(42);
    left: 0;
    z-index: 105;
    width: 100%;
    height: px2rem(52);
    display: flex;
    transition: top 0.2s linear;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      flex: 1;
      display: flex;
      margin: px2rem(8) 0 px2rem(8) px2rem(10);
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(3);
      .search-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(12);
        @include right;
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        @include centers;
        .search-input {
          width: 100%;
          font-size: px2rem(14);
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .clear-icon-wrapper {
        flex: 0 0 px2rem(24);
        font-size: px2rem(14);
        color: #ccc;
        @include left;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      color: $blue;
      font-size: px2rem(14);
      @include centers;
    }
  }
  .shelf-search-tab-wrapper {
    position: relative;
    top: px2rem(52);
    left: 0;
    z-index: 105;
    display: flex;
    width: 100%;
    height: px2rem(42);
    .shelf-search-tab-item {
      flex: 1;
      @include centers;
      .shelf-search-tab-text {
        font-size: px2rem(12);
        color: #999;
        &.selectedTab {
          color: $blue;
        }
      }
    }
  }
}
</style>
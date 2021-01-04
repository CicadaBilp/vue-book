<template>
  <div class="shelf-foot-menu" v-show="isEditMode">
    <div
      class="shelf-foot-tabs-wrapper"
      v-for="item in tabs"
      :key="item.index"
      @click="onTabClick(item)"
    >
      <div class="shelf-foot-tab" :class="{ selected: selected }">
        <div class="icon-private tab-icon" v-if="item.index === 1"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2"></div>
        <div class="icon-move tab-icon" v-if="item.index === 3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
        <div class="tab-text">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      tabs: [
        {
          label: "私密阅读",
          label2: "关闭私密阅读",
          index: 1,
        },
        {
          label: "离线缓存",
          label2: "删除缓存",
          index: 2,
        },
        {
          label: "移动到...",
          index: 3,
        },
        {
          label: "移除",
          index: 4,
        },
      ],
    };
  },
  computed: {
    selected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    },
  },
  methods: {
    onTabClick() {},
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.shelf-foot-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 130;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background-color: white;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-foot-tabs-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;

    .shelf-foot-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      &.selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
        opacity: 0.5;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
      }
    }
  }
}
</style>
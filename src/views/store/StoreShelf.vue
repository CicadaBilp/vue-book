<template>
  <div class="store-shelf">
    <shelf-title :title = "$t('shelf.title')"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      @onScroll="onScroll"
      :bottom="scrollBottom"
      ref="scroll"
    >
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-foot-menu></shelf-foot-menu>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll.vue";
import ShelfTitle from "../../components/shelf/ShelfTitle";
import ShelfSearch from "../../components/shelf/ShelfSearch";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFootMenu from "../../components/shelf/ShelfFootMenu.vue";
import { storeShelfMixin } from "../../utils/mixin";


export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList,
    ShelfFootMenu,
  },
  data() {
    return {
      scrollBottom: 0,
    };
  },
  watch: {
    isEditMode(editmode) {
      this.scrollBottom = editmode ? 48 : 0;
      //需要使用nextTick延迟操作,等界面响应完成后再更新scroll组件的高度
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    },
  },
  mounted() {
    console.log('shelf的mounted被调用');
    this.getShelfList();
    this.setShelfCategory([])
    this.setCurrentType(1)
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.store-shelf {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  background-color: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>
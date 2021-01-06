<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title" ></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      @onScroll="onScroll"
      :bottom="scrollBottom"
      ref="scroll"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <shelf-foot-menu></shelf-foot-menu>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll.vue";
import ShelfTitle from "../../components/shelf/ShelfTitle";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFootMenu from "../../components/shelf/ShelfFootMenu.vue";
import { storeShelfMixin } from "../../utils/mixin";
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
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
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2) //处于分组列表页
  },
}
</script>

<style scoed lang="scss">
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
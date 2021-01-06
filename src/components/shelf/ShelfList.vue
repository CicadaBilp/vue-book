<template>
  <div class="shelf-list" :style="{top:listTop}">
    <transition-group name="list" tag="div" id="shelf-list">
      <div
        class="shelf-item-list-wrapper"
        v-for="item in data"
        :key="item.id"
      >
        <shelf-item :data="item" :style="{ height: itemHeight }"></shelf-item>
        <div class="shelf-item-title-wrapper">
          <span class="shelf-item-title title-small">{{ item.title }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import ShelfItem from "./ShelfItem";
import { storeShelfMixin } from "../../utils/mixin";
import { realPx,px2rem } from "../../utils/util";
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfItem,
  },
  props:{
    top:{
      type:Number,
      default:94
    },
    data:Array
  },
  computed: {
    //每个item的高度
    itemHeight() {
      return ((window.innerWidth - realPx(120)) / 3) * (350 / 250) + "px";
    },
    listTop(){
      return px2rem(this.top) + 'rem'
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.shelf-list {
  position: absolute;
  left: 0;
  z-index: 104;
  width: 100%;
  #shelf-list{
    display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0 px2rem(15);
  box-sizing: border-box;
  .shelf-item-list-wrapper {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: px2rem(15);
    box-sizing: border-box;
    &.list-leave-active{
      display: none;
    }
    &.list-move{
      transition: transform .5s;
    }
    .shelf-item-title-wrapper {
      margin-top: px2rem(10);
    }
  }
  }
  
}
</style>
<template>
  <div class="shelf-item shelf-item-shadow" @click="onItemClick">
    <component
      :is="data.type === 1 ? book : data.type === 2 ? category : add"
      :data="data"
      class="shelf-item-component"
      :class="{ 'edit-mode': isEditMode && data.type === 2 }"
    ></component>
    <div class="icon-selected" 
         v-show="isEditMode && data.type === 1"
         :class="{'selected' : data.selected}"
         ></div>
  </div>
</template>

<script>
import ShelfItemAdd from "./ShelfItemAdd";
import ShelfItemCategory from "./ShelfItemCategory";
import ShelfOne from "./ShelfItemOne";

import { storeShelfMixin } from "../../utils/mixin";
import { gotoStoreHome } from "../../utils/store";
export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object,
  },
  data() {
    return {
      book: ShelfOne,
      category: ShelfItemCategory,
      add: ShelfItemAdd,
    };
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected
        if(this.data.selected){
          this.shelfSelected.uniquePush(this.data)
          this.setShelfSelected(this.shelfSelected)
        }else{
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data);
        } else if (this.data.type === 2) {
          this.$router.push({
            path:'/store/category',
            query:{
              title:this.data.title
            }
          })
        } else {
          gotoStoreHome(this);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.shelf-item {
  width: 100%;
  position: relative;
  &.shelf-item-shadow {
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 0.3);
  }
  .shelf-item-component {
    opacity: 1;
    &.edit-mode {
      opacity: 50%;
    }
  }
  .icon-selected {
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.5);
    &.selected{
      color: blue;
    }
  }
}
</style>
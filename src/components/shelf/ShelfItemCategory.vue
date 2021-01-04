<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list">
      <div
        class="shelf-item-category-list-item"
        v-for="(item, index) in data.itemList"
        :key="index"
      >
      <img :src="item.cover" class="category-list-item-img"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.shelf-item-category{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shelf-item-category-list{
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    padding-top:px2rem(5);
    box-sizing: border-box;

    .shelf-item-category-list-item{
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      box-sizing: border-box;
      &:nth-child(3n+1){
        padding: 0 px2rem(2.5) px2rem(5) px2rem(5);
      }
      &:nth-child(3n+2){
        padding: 0 px2rem(2.5) px2rem(5) px2rem(2.5) ;
      }
      &:nth-child(3n+3){
        padding: 0 px2rem(5) px2rem(5) px2rem(2.5);
      }
      .category-list-item-img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
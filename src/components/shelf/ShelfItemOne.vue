<template>
  <div class="shelf-item-one">
    <img :src="data.cover" class="shelf-item-one-cover">
    <div class="private-wrapper" v-show="data.private"></div>
    <div class="private-icon-wrapper" v-show="data.private">
      <span class="icon-private"></span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:Object
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.shelf-item-one{
  width: 100%;
  height: 100%;
  .shelf-item-one-cover{
    width: 100%;
    height: 100%;
  }
  .private-wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-width: px2rem(15);
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, .3) rgba(0, 0, 0, .3);
  }
  .private-icon-wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: px2rem(30);
    height: px2rem(30);
    padding-bottom: px2rem(5);
    padding-left: px2rem(3);
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .icon-private{
      font-size: px2rem(12);
      color: white;
    }
  }
}
</style>
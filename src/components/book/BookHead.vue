<template>
  <div class="book-head">
    <span class="book-head-text">{{getSectionName}}</span>
  </div>
</template>

<script>
import {bookMixin} from '../../utils/mixin'
export default {
  mixins:[bookMixin]

}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
  .book-head{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    overflow: hidden;
    .book-head-text{
      font-size: px2rem(12);
      color: #6d7178;
    }
  }
</style>
<template>
  <div class="book-mark">
    <div class="book-mark-text-wrapper">
      <div class="book-mark-down-wrapper">
        <span class="icon-down"></span>
      </div>
      <div class="book-mark-text">{{text}}</div>
    </div>
    <div class="book-mark-icon-wrapper">
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      text:'下拉添加书签'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.book-mark{
  position: absolute;
  top:px2rem(-35);
  left:0;
  z-index: 200;
  width:100%;
  height:px2rem(35);
  .book-mark-text-wrapper{
    position: absolute;
    right:px2rem(45);
    bottom: 0;
    display: flex;
    .book-mark-down-wrapper{
      font-size: px2rem(14);
      color:white;
      transition: all .2s linear;
      @include center;
    }
    .book-mark-text{
      font-size: px2rem(14);
      color:white;
    }
  }
  .book-mark-icon-wrapper{

  }
}
</style>

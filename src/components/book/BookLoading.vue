<template>
  <div class="book-loading">
    <div class="book-loading-wrapper">
      <div class="book-loading-item" v-for="(item,index) in data" :key="index">
        <div class="book-loading-line-wrapper" v-for="(item2,index2) in item" :key="index2">
          <div class="book-loading-line"></div>
          <div class="book-loading-mask"></div>
        </div>
      </div>
      <div class="book-loading-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      //用来生成两边的盒子和内部的线条
      data:[
        [{},{},{}],
        [{},{},{}]
      ],
      maskWidth:[
        {value:0},
        {value:0},
        {value:0},
        {value:0},
        {value:0},
        {value:0},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.book-loading{
  position: relative;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index: 400;
  width:px2rem(63);
  height:px2rem(40);
  background: transparent;
  border:px2rem(1.5) solid #d7d7d7;
  border-radius: px2rem(3);
  .book-loading-wrapper{
    display: flex;
    width:100%;
    height:100%;
    .book-loading-item{
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(7) 0;
      box-sizing: border-box;
      .book-loading-line-wrapper{
        flex: 1;
        padding: 0 px2rem(7);
        box-sizing: border-box;
        display: flex;
        .book-loading-line{
          width:px2rem(16);
          height:px2rem(2) ;
          background-color: #ccc;
        }
        .book-loading-mask{
          width:0;
          height:px2rem(2)
        }
      }
    }
    .book-loading-center{
      position: absolute;
      left:50%;
      top:0;
      width:px2rem(1.5);
      height:100%;
      background-color: #d7d7d7;
    }
  }
}
</style>
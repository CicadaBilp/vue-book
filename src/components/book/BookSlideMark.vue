<template>
  <div class="book-slide-bookmark">
    <div class="slide-bookmark-title">书签 . {{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div class="slide-bookmark-item" 
          v-for="(item,index) in bookmark"
          :key="index" @click="displayBookMark(item.cfi)"
      >
        <div class="slide-bokmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../common/Scroll.vue'
import {bookMixin} from '../../utils/mixin'
import {getBookMark} from '../../utils/localStorage'
export default {
  mixins:[bookMixin],
  components: { Scroll },
  data(){
    return {
      bookmark:null
    }
  },
  methods:{
    displayBookMark(cfi){
      this.currentBook.rendition.display(cfi).then(() => {
        this.reloadedProgress()
      })
    }
  },
  mounted(){
    this.bookmark = getBookMark(this.fileName)
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.book-slide-bookmark{
  width: 100%;
  .slide-bookmark-title{
    width: 100%;
    height:px2rem(48);
    font-size: px2rem(14);
    font-weight: bold;
    padding:0 px2rem(15);
    box-sizing: border-box;
    text-align: left;
    line-height: px2rem(48);
  }
  .slide-bookmark-list{
    padding:0 px2rem(15);
    box-sizing: border-box;
    .slide-bookmark-item{
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      .slide-bokmark-item-icon{
        @include center;
        .icon-bookmark{
          width: px2rem(20);
          height: px2rem(20);
          font-size: px2rem(12);
          color: chocolate;
        }
      }
      .slide-bookmark-item-text{
        font-size: px2rem(14);
        line-height: px2rem(15);
        max-height: px2rem(45);
        @include ellipsis2(3)
      }
    }
  }
}
</style>
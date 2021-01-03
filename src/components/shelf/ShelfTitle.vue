<template>
  <div class="shelf-title">
    <div class="shelf-title-wrapper">
      <span class="shelf-title-text">{{$t('shelf.title')}}</span>
      <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left">
      <span class="shelf-title-btn-text ">{{$t('shelf.clearCache')}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-right">
      <span class="shelf-title-btn-text" @click="EditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
    </div>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
export default {
  mixins:[storeShelfMixin],
  computed:{
    selectedText(){
      const selectedNum = this.shelfSelected ? this.shelfSelected : 0 ;
      return selectedNum === 0 ?  this.$t('shelf.selectBook') : `已选择${selectedNum}本`
    }
  },
  methods:{
    EditClick(){
      this.setEditMode(!this.isEditMode)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/styles/global";

.shelf-title{
  position: relative;
  width: 100%;
  height: px2rem(42);
  background-color: white;
  .shelf-title-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .shelf-title-text{
      font-size: px2rem(16);
      line-height: px2rem(20);
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text{
      font-size: px2rem(10);
      color: #999;
    }
  }
  .shelf-title-btn-wrapper{
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include centers;
    .shelf-title-btn-text{
      font-size: px2rem(14);
      color: #666;
    }
    &.shelf-title-left{
      left: 0;
      padding-left: px2rem(15);
    }
    &.shelf-title-right{
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>
<template>
  <transition name="family-slide-up"> 
  <div class="setting-font-family-list" v-show="isShowFontFamily">
    <div class="font-family-title">
      <div class="title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="title-text">选择字体</span>
    </div>
    <div class="font-family-list-wrapper">
      <div class="family-list-item" @click="toggleFamily(item.font)" v-for="(item,index) in fontFamilyList" :key="index">
        <div class="item-text" :class="{'selected' : item.font == defaultFontFamily}">{{item.font}}</div>
        <div class="item-icon" v-if="item.font == defaultFontFamily">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { bookMixin } from '../../utils/mixin';
import {FONT_FAMILY_LIST} from '../../utils/book'
import {getLocalStorage,setLocalStorage} from '../../utils/localStorage'

export default {
  mixins:[bookMixin],
  methods:{
    //点击向下图标隐藏字体设置弹出层
    hide() {
      this.setShowFontFamily(false)
    },
    //点击选择字体类型
    toggleFamily(fontFamily){ 
      this.setDefaultFontFamily(fontFamily)
      if(fontFamily === 'Default'){
        this.currentBook.rendition.themes.font('Times New Roman')
      }else{
        this.currentBook.rendition.themes.font(fontFamily)
      }
    }
  },
  data(){
    return {
      fontFamilyList:FONT_FAMILY_LIST
    }
  },
  
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";

.setting-font-family-list{
  position: absolute;
  bottom:0;
  left:0;
  z-index:300;
  width:100%;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0,0,0,1);
  background-color: white;

  .font-family-title{
    position: relative;
    padding:px2rem(15);
    border-bottom: px2rem(1) solid #ccc;
    box-sizing: border-box;
    text-align: center;
    @include center;
    .title-icon{
      position: absolute;
      left:px2rem(15);
      top:50%;
      transform: translateY(-50%);
      font-size: px2rem(16);
      font-weight: bold;
      
    } 
    .title-text{
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .font-family-list-wrapper{
    .family-list-item{
      display: flex;
      padding:px2rem(15);
      .item-text{
        flex:1;
        text-align: left;
        font-size:px2rem(14);
        &.selected{
          color:chocolate;
          font-weight: bold;
        }
      }
      .item-icon{
        flex: 1;
        text-align: right;
        font-size:px2rem(14);
        color:chocolate;
        font-weight: bold;
      }
    }
  }
}
</style>

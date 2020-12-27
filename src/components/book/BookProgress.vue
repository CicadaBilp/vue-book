<template>
  <transition name="slide-up">
      <div class="setting-wrapper" v-show="isShowMenu && showSetting===2">
        <div class="setting-progress" >
          <div class="read-time-wrapper">
            <span class="read-time-text">{{getReadTimeText()}}</span>
            <span class="icon-forward"></span>
          </div>
          <div class="progress-wrapper">
            <div class="progress-icon" @click="preChapter">
              <span class="icon-back"></span>
            </div>
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            />
            <div class="progress-icon" @click="nextChapter">
              <span class="icon-forward"></span>
            </div>
          </div>
          <div class="text-wrapper">
            <span class="progress-section-text">{{getSectionName}}</span>
            <span>({{ bookAvailable ? progress + "%" : "加载中..." }})</span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import {bookMixin} from '../../utils/mixin'
import {setLocation,getReadTime} from '../../utils/localStorage'
export default {
  mixins:[bookMixin],
  computed:{
    getSectionName(){
      if(this.section){
        const sectionInfo = this.currentBook.section(this.section)
        if(sectionInfo && sectionInfo.href){
          // console.log(this.currentBook.navigation.get(sectionInfo.href).label);
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
      return ''
    },
  },
  methods:{
    //进度条改变的处理函数
    onProgressChange(progress){
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.upDateProgress()
      })
    },
    //进度条改变时渲染当前进度的电子书内容
    displayProgress(){
      //根据进度条拿到要展示的内容的cfi
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      //cfi进行渲染,之后调用reloaded方法将展示的内容位置存入缓存
      this.currentBook.rendition.display(cfi).then(() => this.reloadedProgress())
    },
    //进度条拖动的处理函数
    onProgressInput(progress){
      //更新vuex的进度条值,之后调用渲染函数渲染选择的进度的内容,并根据进度值更新进度条的背景色
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.upDateProgress()
      })
    },
    //进度条改变时背景也随之改变
    upDateProgress(){
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },


    //点击切换章节后渲染当前章节的内容
    displaySection(){
      //根据选择的章节拿到目标章节对象
      const sectionInfo = this.currentBook.section(this.section)
      if(sectionInfo && sectionInfo.href){
        //根据获取的目标章节位置渲染目标章节,之后在调用reloaded方法存入缓存
        this.currentBook.rendition.display(sectionInfo.href).then(() => this.reloadedProgress())
      }
    },
    //点击上一章
    preChapter(){
      if(this.section > 0 && this.bookAvailable){
        this.setSection(this.section-1).then(() => this.displaySection())
      }
    },
    //点击下一章
    nextChapter(){
      console.log('aaa');
      console.log(this.section);
      if(this.section < this.currentBook.spine.length-1 && this.bookAvailable){
        this.setSection(this.section + 1).then(() => this.displaySection())
      }
    },
    getReadTimeText(){
      const readTime = getReadTime(this.fileName)
      if(!readTime){
        return 0
      }else{
        return '已阅读' + Math.ceil(readTime / 60) + '分钟'
      }
    }
  },
  // updated(){
  //   this.upDateProgress()
  // }
  mounted(){
    this.upDateProgress()
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:px2rem(40);
        @include centers;
        font-size:px2rem(12)
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include centers;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon{
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin:0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        box-sizing: border-box;
        font-size: px2rem(12);
        text-align: center;
        padding:0 px2rem(15);
        @include centers;
        .progress-section-text{
          @include ellipsis
        }
      }
    }
  }
</style>
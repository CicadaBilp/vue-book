<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation' : runFlapCard}" v-show="runFlapCard">
      <div
        class="flap-card"
        v-for="(item, index) in flapCardList"
        :key="index"
        :style="{ zIndex: item.zIndex }"
      >
        <div class="flap-card-circle">
          <div
            class="flap-card-semi-circle semi-circle-left"
            :style="semiCircleStyle(item, 'left')"
            ref="left"
          ></div>
          <div
            class="flap-card-semi-circle semi-circle-right"
            :style="semiCircleStyle(item, 'right')"
            ref="right"
          ></div>
        </div>
      </div>
    </div>
    <div class="book-card" :class="{'animation' : runBookCard}" v-show="runBookCard">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data ? data.cover : ''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
import { homeMixin } from "../../utils/mixin";
import { flapCardList ,categoryText} from "../../utils/store";
export default {
  mixins: [homeMixin],
  data() {
    return {
      flapCardList,
      back: 1,
      front: 0,
      runFlapCard:false,
      runBookCard:false
    };
  },
  props:{
    data:Object
  },
  watch:{
    flapCardVisible(f){
      if(f){
        this.runAnimation()
      }
    }
  },
  methods: {
    close() {
      this.setFlapCard(false);
      this.stopFlap()
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgba(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === "left" ? item.imgLeft : item.imgRight,
      };
    },
    rotate(index, type) {
      const item = this.flapCardList[index];
      let dom;
      if (type === "front") {
        dom = this.$refs.right[index];
      } else {
        dom = this.$refs.left[index];
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`;
    },
    startFlap() {
      this.prepare();
      this.task = setInterval(() => {
        const forntFlap = this.flapCardList[this.front];
        const backFlap = this.flapCardList[this.back];
        forntFlap.rotateDegree += 10;
        forntFlap._g -= 5;
        backFlap.rotateDegree -= 10;
        if (backFlap.rotateDegree < 90) {
          backFlap._g += 5;
        }
        if (forntFlap.rotateDegree === 90 && backFlap.rotateDegree === 90) {
          backFlap.zIndex += 2;
        }
        this.rotate(this.front, "front");
        this.rotate(this.back, "back");
        if (forntFlap.rotateDegree === 180 && backFlap.rotateDegree === 0) {
          this.next();
        }
      },25);
    },
    prepare() {
      const backFlap = this.flapCardList[this.back];
      backFlap.rotateDegree = 180;
      backFlap._g = backFlap.g - 5 * 9;
      this.rotate(this.back, "back");
    },
    next() {
      const forntFlap = this.flapCardList[this.front];
      const backFlap = this.flapCardList[this.back];
      forntFlap.rotateDegree = 0;
      backFlap.rotateDegree = 0;
      forntFlap._g = forntFlap.g;
      backFlap._g = backFlap.g;
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      this.front++;
      this.back++;
      if (this.front >= this.flapCardList.length) {
        this.front = 0;
      }
      if (this.back >=this.flapCardList.length) {
        this.back = 0;
      }
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + 5) % 5);
      });
      this.prepare();
    },
    reset(){
      this.front = 0
      this.back = 1 
      this.flapCardList.forEach((item,index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index,'front')
        this.rotate(index,'back')
      })
      this.runFlapCard = false
      this.runBookCard = false
      if(this.timeout1){
        clearTimeout(this.timeout1)
      }
      if(this.timeout2){
        clearTimeout(this.timeout2)
      }
    },
    stopFlap(){
      if(this.task){
        clearInterval(this.task)
      }
      this.reset()
    },
    categoryText(){
      if(this.data){
        categoryText(this.data.category,this)
      }
    },
    runAnimation(){
      this.runFlapCard = true
      this.timeout1 = setTimeout(() => {
        this.startFlap()
      },300)
      this.timeout2 = setTimeout(() => {
        this.stopFlap()
        this.runBookCard = true
      },2500)
    }
  }

};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.flap-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  background-color: rgba(0, 0, 0, 0.5);
  @include centers;
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: px2rem(30);
    z-index: 500;
    width: 100%;
    @include center;
    .icon-close {
      width: px2rem(45);
      height: px2rem(45);
      font-size: px2rem(25);
      border-radius: 50%;
      background-color: #333;
      color: white;
      @include centers;
    }
  }
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    border-radius: px2rem(5);
    background-color: white;
    &.animation{
      animation: flap-card-move .3s ease-in ;
      @keyframes flap-card-move {
      0%{
        transform: scale(0);
        opacity: 0;
      }
      50%{
        transform: scale(1.2);
        opacity: 1;
      }
      75%{
        transform: scale(.9);
        opacity: 1;
      }
      100%{
        transform: scale(1);
        opacity: 1;
      }
    }
    
    }
    .flap-card {
      width: px2rem(48);
      height: px2rem(48);
      @include abCenter;
      .flap-card-circle {
        width: 100%;
        height: 100%;
        display: flex;
        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          backface-visibility:hidden ;
        }
        .semi-circle-left {
          border-radius: px2rem(24) 0 0 px2rem(24);
          background-position: center right;
          transform-origin: right;
        }
        .semi-circle-right {
          border-radius: 0 px2rem(24) px2rem(24) 0;
          background-position: center left;
          transform-origin: left;
        }
      }
    }
  }
  .book-card{
    position: relative;
    width: 65%;
    max-width: px2rem(400);
    box-sizing: border-box;
    border-radius: px2rem(15);
    background-color: white;
    &.animation{
      animation:scale .3s ease-in both;
      @keyframes scale {
        0%{
          transform: scale(0);
          opacity: 0;
        }
        100%{
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper{
      width: 100%;
      height: 100%;
      margin-bottom: px2rem(30);
      @include columnTop;
      .img-wrapper{
        width: 100%;
        margin-top: px2rem(20);
        @include centers;
        .img{
          width: px2rem(90);
          height: px2rem(130);
        }
      }
      .content-wrapper{
        padding: 0 px2rem(20);
        margin-top: px2rem(20);
        margin-bottom: px2rem(20);
        .content-title{
          color: #333;
          font-weight: bold;
          font-size: px2rem(18);
          line-height: px2rem(20);
          max-height: px2rem(40);
          text-align: center;
          @include ellipsis2(2)
        }
        .content-author{
          margin-top: px2rem(10);
          text-align: center;
          font-size: px2rem(18);
          @include ellipsis2(2)
        }
        .content-category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
        }
      }
      .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 px2rem(15) px2rem(15);
          padding: px2rem(15) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background:$blue;
        }

    }
  }
}
</style>
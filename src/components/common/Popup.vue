<template>
  <div class="popup" v-show="popupVisible">
    <transition name="fade">
      <div class="popup-bg" @click.stop.prevent="hide" v-show="popupVisible"></div>
    </transition>
    <transition name="family-slide-up" >
      <div class="popup-wrapper" v-show="visible">
        <div class="popup-title" v-if="title && title.trim().length > 0">
          {{ title.trim() }}
        </div>
        <div
          class="popup-btn"
          v-for="(item, index) in btn"
          :key="index"
          @click="item.click"
          :class="{ danger: item.type === 'danger' }"
        >
          {{ item.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "popup",
  data() {
    return {
      popupVisible: false,  //整个popup组件是否显示
      visible:false  //下方选项模块是否显示(为了该模块能在开关时顺利实现动画)
    };
  },
  props: {
    title: String,
    btn: Array,
  },
  methods: {
    //显示popup
    show() {
      //先显示整个模块,后显示下方组件
      this.popupVisible = true;
      setTimeout(() => {
        this.visible = true 
      })
      
    },
    //隐藏popup
    hide() {
      //先隐藏下方模块,动画完成后再隐藏整个组件
      this.visible = false
      setTimeout(() => {
        this.popupVisible = false;
      },200)
      
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    background-color: white;
    .popup-title {
      width: 100%;
      height: px2rem(44);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(12);
      line-height: px2rem(14);
      padding: px2rem(15);
      box-sizing: border-box;
      text-align: center;
      color: #999;
    }
    .popup-btn {
      width: 100%;
      height: px2rem(60);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(16);
      color: #666;
      font-weight: bold;
      line-height: px2rem(60);
      text-align: center;
      &.danger {
        color: red;
      }
    }
  }
}
</style>
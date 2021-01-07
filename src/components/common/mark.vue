<template>
  <div class="mark" :style="style"></div>
</template>

<script>
export default {
  props: {
    width: Number,  //传入书签宽度
    height: Number,  //传入书签高度
    color: String,  //传入书签要展示的颜色
  },
  computed: {
    style() {
      if (this.color) {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`,
        };
      }else{
        return {}
      }
    },
  },
  methods:{
    refresh(){
      if(this.height && this.width){
        this.$refs.mark.style.borderWidth = `${px2rem(this.height-5)}rem ${px2rem(this.width / 2)}rem 
        ${px2rem(5)}rem ${px2rem(this.width / 2)}rem` 
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.mark {
  width: 0;
  height: 0;
  border-width: px2rem(25) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: white white transparent white;
}
</style>
<template>
  <div class="store-home">
    <search-bar></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
      <div>dsd</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll";
import SearchBar from "../../components/home/SearchBar.vue";
import { homeMixin } from "../../utils/mixin";
export default {
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll,
  },
  methods:{
    //scroll组件注册的onScroll事件的处理函数
    onScroll(y){
      //将收到的scroll滚动距离设置到vuex中
      this.setOffsetY(y)
      if(y > 0){
        this.scrollTop = 46
      }else{
        this.scrollTop = 88
      }
      this.$refs.scroll.refresh()
    }
  },
  data(){
    return{
      scrollTop:88
    }
  }
};
</script>

<style scoped lang="scss">
.store {
  width: 100%;
  height: 100%;
}
</style>
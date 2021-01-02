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
    <flap-card :data="random"></flap-card>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll";
import FlapCard from '../../components/home/FlapCard.vue';
import SearchBar from "../../components/home/SearchBar.vue";
import { homeMixin } from "../../utils/mixin";
import {home} from '../../api/store'
export default {
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard
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
      scrollTop:88,
      random:null
    }
  },
  mounted(){
    home().then(res => {
      if(res && res.status === 200){
        const data = res.data
        const resIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[resIndex]
      }
    })
  }
};
</script>

<style scoped lang="scss">
.store-home {
  width: 100%;
  height: 100%;
}
</style>
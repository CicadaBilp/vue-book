<template>
  <div class="store-home">
    <search-bar></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured :data="featured" 
                class="featured" :titleText="$t('home.featured')"
                :btnText="$t('home.seeAll')">
      </featured>
      <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>

      <category :data="categories" class="categories"></category>

    </scroll>
    <flap-card :data="random"></flap-card>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll";
import FlapCard from '../../components/home/FlapCard.vue';
import SearchBar from "../../components/home/SearchBar.vue";
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook.vue';
import Category from '../../components/home/Category.vue';
import { homeMixin } from "../../utils/mixin";
import {home} from '../../api/store'

export default {
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  data(){
    return{
      scrollTop:88,  //首页滚动组件上方距离
      random:null,  //随机推荐的一本书对象
      banner:null,   //图片地址
      guessYouLike:null,  //猜你喜欢组件需要的书籍数据
      recommend:null,  //推荐组件需要的书籍数据
      featured:null,  //精选组件需要的书籍数据
      categoryList:null,  //展示四个分类的几本书信息
      categories:null,  //书城所有书籍分类,和分类下书籍数量信息
    }
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
  mounted(){
    home().then(res => {
      if(res && res.status === 200){
        const data = res.data
        console.log(data);
        const resIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[resIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    })
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper{
    padding: px2rem(10);
    box-sizing: border-box;
    .banner{
      width: 100%;
      height:px2rem(150);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .recommend{
    margin-top: px2rem(20);
  }
  .featured{
    margin-top: px2rem(20);
  }
  .category-list-wrapper{
    margin-top: px2rem(20);
  }
  .categories{
    margin-top: px2rem(20);
  }
}
</style>
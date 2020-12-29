<template>
  <div class="book" ref="book">
    <book-title></book-title>
    <book-reader></book-reader>
    <book-menu></book-menu>
    <book-mark></book-mark>
  </div>
</template>

<script>
import BookReader from '../../components/book/BookReader'
import BookTitle from '../../components/book/BookTitle'
import BookMenu from '../../components/book/BookMenu'
import BookMark from '../../components/book/BookMark'
import {getReadTime,setReadTime} from '../../utils/localStorage'
import {bookMixin} from '../../utils/mixin'
export default {
  mixins:[bookMixin],
  components:{
    BookReader,
    BookTitle,
    BookMenu,
    BookMark
  },
  methods:{
    //在进入阅读器组件时开启计时器
    startReadTime(){
      let readTime = getReadTime(this.fileName) 
      if(!readTime){
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime ++
        if(readTime % 30 ===0){
          setReadTime(this.fileName,readTime)
        } 
      },1000)
    },
    //当offsetY值发生改变时,拿到book元素实时将容器top设为改变值
    move(v){
      this.$refs.book.style.top = v + 'px'
    },
    //当改变值为0时,还原book元素的top为0
    reduce(){
      this.$refs.book.style.top = '0px'
    }
  },
  watch:{
    //watch监听offsetY的数据变化来调用move方法将阅读器组件整体向下移动
    offsetY(v){
      if(v > 0){
        this.move(v)
      }else if(v === 0){
        this.reduce()
      }
    }
  },
  mounted(){
    this.startReadTime()
  },
  //在删除组件之前清除定时器
  beforeDestory(){
    if(this.task){
      clearInterval(this.task)
    }
  }
}
</script>

<style scoped lang="scss">
.book{
  position: relative;
  width:100%;
  height:100%;
  left:0;
  top:0
}
</style>
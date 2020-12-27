<template>
  <div class="book">
    <book-title></book-title>
    <book-reader></book-reader>
    <book-menu></book-menu>
  </div>
</template>

<script>
import BookReader from '../../components/book/BookReader'
import BookTitle from '../../components/book/BookTitle'
import BookMenu from '../../components/book/BookMenu'
import {getReadTime,setReadTime} from '../../utils/localStorage'
import {bookMixin} from '../../utils/mixin'
export default {
  mixins:[bookMixin],
  components:{
    BookReader,
    BookTitle,
    BookMenu
  },
  methods:{
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
    }
  },
  mounted(){
    this.startReadTime()
  },
  beforeDestory(){
    if(this.task){
      clearInterval(this.task)
    }
  }
}
</script>

<style>
</style>
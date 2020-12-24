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
export default {
  components:{
    BookReader,
    BookTitle,
    BookMenu
  }
}
</script>

<style>

</style>
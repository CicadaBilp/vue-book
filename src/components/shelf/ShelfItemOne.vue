<template>
  <div class="shelf-item-one">
    <img :src="data.cover" class="shelf-item-one-cover">
  </div>
</template>

<script>
export default {
  props:{
    data:Object
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.shelf-item-one{
  width: 100%;
  height: 100%;
  .shelf-item-one-cover{
    width: 100%;
    height: 100%;
  }
}
</style>
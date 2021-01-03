<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//给document绑定dom加载事件,dom解析完成后拿到将窗口宽度/10的值作为html的fontsize
  export default {}
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })

</script>

<style lang='scss' scoped>
  #app{
    width:100%;
    height:100%;
    // overflow: hidden;
    // background-color: rgba(0, 0, 0, .3)
  }
</style>

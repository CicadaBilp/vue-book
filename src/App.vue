<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="test">你还好</div>
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

<style scoped>
  .test{
    font-size: 1rem;
  }
</style>

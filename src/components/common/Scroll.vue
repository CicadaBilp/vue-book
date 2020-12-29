<template>
  <div class="scroll-wrapper" 
    @scroll.passive="handleScroll"
    ref="scrollWrapper"
  >
    <slot></slot>
  </div>
</template>

<script>
import {realPx} from '../../utils/util'
export default {
  props:{
    //接收top属性,表示滚动组件容器的上方高度
    top:{
      type:Number,
      default:0
    },
    //接收bottom属性表示容器下方的高度
    bottom:{
      type:Number,
      default:0
    },
    //表示不可滚动属性
    ifNoScroll:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    //滚动时的处理函数,可在此获得滚动条滚动距离,并触发父组件注册的onScroll事件,子传父通信
    handleScroll(e){
      const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll',offsetY)
    },
    //拿到滚动组件外层元素,根据传入的top和bottom属性计算并设置滚动容器的高度
    refresh(){
      if(this.$refs.scrollWrapper){
        this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'

      }
    }
  },
  mounted(){
    //组件挂载完成后调用refresh方法设置容器高度
    this.refresh()
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.scroll-wrapper{
  position: relative;
  z-index: 100;
  width:100%;
  overflow-y: scroll;
  overflow-x: hidden;
  //解决移动端滚动卡顿问题
  -webkit-overflow-scrolling:touch;
  &::-webkit-scrollbar{
    display:none;
  }
  
}
</style>
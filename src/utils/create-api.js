import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'

//挂载插件(该插件可将需要的组件融合在插件内使用时只需this.$create组件名({组件需要的属性}))
Vue.use(CreateAPI)
//设置使用这些组件
Vue.createAPI(Toast,true)
Vue.createAPI(Popup,true)

//全局混入方法(用来导入使用公共组件)
Vue.mixin({
  methods:{
    toast(setting){
      return this.$createToast({
        $props:setting
      })
    },
    popup(setting){
      return this.$createPopup({
        $props:setting
      })
    },
    simpleToast(text){
      this.toast({
        text:text
      }).show()
    }
  }
})
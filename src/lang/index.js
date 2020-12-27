import Vue from 'vue'
import VueI18N from 'vue-i18n'
import {getLocale, setLocale} from '../utils/localStorage'
import en from './en'
import cn from './cn'

Vue.use(VueI18N)
//对象存储语言文件
const messages = {
  en,
  cn
}
//默认语言,先从缓存中获取,如果没有就设置为cn
let locale = getLocale()
if(!locale){
  locale = 'cn'
  setLocale(locale)
}
//实例化VueI18N,传入
const i18n = new VueI18N({
  locale,
  messages
})

export default i18n
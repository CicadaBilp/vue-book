import {realPx} from './util'


//字体大小数组
export const FONT_SIZE_LIST = [
  {fontSize : 12},
  {fontSize : 14},
  {fontSize : 16},
  {fontSize : 18},
  {fontSize : 20},
  {fontSize : 22},
  {fontSize : 24},
]
//字体类型数组
export const FONT_FAMILY_LIST = [
  {font:'Default'},
  {font:'Cabin'},
  {font:'Days One'},
  {font:'Tangerine'}
]
//返回主题主类型的方法
export function themeList(vue){
  return [
    {
      alias:vue.$t('book.themeDefault'),
      name:'Default',
      style:{
        body:{
          'color':'#4c5059',
          'background':'#cecece',
          'padding-top':`${realPx(48)}px !important`,
          'padding-bottom':`${realPx(40)}px !important`
        }
      }
    },
    {
      alias:vue.$t('book.themeGold'),
      name:'Gold',
      style:{
        body:{
          'color':'#5c5b56',
          'background':'#c6c2b6',
          'padding-top':`${realPx(48)}px !important`,
          'padding-bottom':`${realPx(40)}px !important`
        }
      }
    },{
      alias:vue.$t('book.themeEye'),
      name:'Eye',
      style:{
        body:{
          'color':'#404c42',
          'background':'#a9c1a9',
          'padding-top':`${realPx(48)}px !important`,
          'padding-bottom':`${realPx(40)}px !important`
        }
      }
    },{
      alias:vue.$t('book.themeNight'),
      name:'Night',
      style:{
        body:{
          'color':'#cecece',
          'background':'#000000',
          'padding-top':`${realPx(48)}px !important`,
          'padding-bottom':`${realPx(40)}px !important`
        }
      }
    },
  ]
}

//为html添加css文件
export function addCss(href) {
  const link = document.createElement('link')
  link.setAttribute('rel','stylesheet')
  link.setAttribute('type','text/css')
  link.setAttribute('href',href)
  document.getElementsByTagName('head')[0].appendChild(link)
}
//删除导入的全局主题css链接
export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  //遍历links数组,找出href为href的link删除
  for(let i = links.length-1;i >= 0;i--){
    const link = links[i]
    if(link && link.getAttribute('href') && link.getAttribute('href')===href){
      link.parentNode.removeChild(link)
    }
  }
}
//删除所有全局主题样式
export function removeAllCss(){
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}
//将目录数组扁平化
export function flatten(array){
  return [].concat(...array.map(item => [].concat(item,...flatten(item.subitems))))
}


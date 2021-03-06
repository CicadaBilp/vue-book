import axios from 'axios'
import {setLocalForage} from '../utils/localForage'

//请求mock首页各种书籍数据(本地服务器)
export function home(){
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BASE_URL}/book/home`
  })
}
//请求书籍详情数据(传入书籍对象,线上服务器)
export function detail(book){
  return axios({
    mathod:'get',
    url:`${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params:{
      fileName:book.fileName
    }
  })
}
//请求mock书籍列表数据(本地服务器)
export function list(){
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
//从mock中获取书架图书数据
export function shelf(){
  console.log('shelf被调用');
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}
//书架页编辑中的离线缓存需要的请求函数
export function download(book,onSuccess,onFailed,onError,onProgress){
  if(!onProgress){
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL:process.env.VUE_APP_EPUB_URL,
    method:'get',
    responseType:'blob',
    timeout:180 * 1000,
    onDownloadProgress:progressEvent => {
      if(onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName,blob,() => {
        if(onSuccess) onSuccess(book)
      },err => {
        if(onFailed) onFailed(err)
      })
    }).catch(err => {
      if(onError) onError(err)
    })
}

//speak
export function flatList() {
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BOOK_URL}/book/flat-list`
  })
}


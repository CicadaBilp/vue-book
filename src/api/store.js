import axios from 'axios'

//请求首页各种书籍数据
export function home(){
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BASE_URL}/book/home`
  })
}
//请求书籍详情数据(传入书籍对象)
export function detail(book){
  return axios({
    mathod:'get',
    url:`${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params:{
      fileName:book.fileName
    }
  })
}
//请求书籍列表数据
export function list(){
  return axios({
    method:'get',
    url:`${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
// function mock(app,url,data){
//   app.get(url,(request,response) => {
//     response.json(data)
//   })
// }

// //导入mock中写好的几个接口数据
// const homeData = require('./src/mock/bookHome')
// const shelfData = require('./src/mock/bookShelf')
// const listData = require('./src/mock/bookList')
// const flatListData = require('./src/mock/bookFlatList')



module.exports = {
  publicPath:process.env.NODE_ENV === 'production'
    ? './'
    : '/' ,
  devServer:{
    // before(app){
    //   mock(app,'/book/home',homeData)
    //   mock(app,'/book/shelf',shelfData)
    //   mock(app,'/book/list',listData)
    //   mock(app,'/book/flat-list',flatListData)
    // }
  },
  //webpack设置加大引入文件大小限制
  configureWebpack:{
    performance:{
      hints:'warning',
      maxAssetSize:512 * 1024,
      maxEntrypointSize:512 * 1024,
    }
  }
}
import Storage from 'web-storage-cache'
//使用库中的方法实例一个localStorage
const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}
export function getLocalStorage(key) {
  return localStorage.get(key)
}
export function removeLocalStorage(key) {
  return localStorage.remove(key)
}
export function clearLocalStorage() {
  return localStorage.clear
}


export function setBookObject(fileName,bookKey, bookValue) {
  let book = getLocalStorage(fileName)
  if (!book) {
    book = {}
  }
  book[bookKey] = bookValue
  setLocalStorage(fileName, book)
}
export function getBookObject(fileName,bookKey) {
  let book = getLocalStorage(fileName)
  if (book) {
    return book[bookKey]
  } else {
    return null

  }
}

//读写字体类型
export function getFontFamily(fileName) {
  return getBookObject(fileName,'font-family')
}
export function setFontFamily(fileName,fontFamily) {
  return setBookObject(fileName,'font-family', fontFamily)
}
//读写字体大小
export function getFontSize(fileName) {
  return getBookObject(fileName,'font-size')
}
export function setFontSize(fileName,fontSize) {
  return setBookObject(fileName,'font-size',fontSize)
}
//读写显示语言
export function getLocale() {
  return getLocalStorage('locale')
}
export function setLocale(locale) {
  return setLocalStorage('locale',locale)
}
//读写主题
export function getlocalTheme(fileName){
  return getBookObject(fileName,'theme')
}
export function setlocalTheme(fileName,defaultTheme){
  return setBookObject(fileName,'theme',defaultTheme)
}
//读写当前页的位置cfi
export function setLocation(fileName,startCfi){
  return setBookObject(fileName,'start-cfi',startCfi)
}
export function getLocation(fileName){
  return getBookObject(fileName,'start-cfi')
}
//读写阅读时间
export function getReadTime(fileName){
  return getBookObject(fileName,'read-time')
}
export function setReadTime(fileName,readTime){
  return setBookObject(fileName,'read-time',readTime)
}
//读写书签
export function getBookMark(fileName){
  return getBookObject(fileName,'book-mark')
}
export function setBookMark(fileName,bookMark){
  return setBookObject(fileName,'book-mark',bookMark)
}
//读写书架书籍
export function getBookshelf(){
  return setLocalStorage('shelf')
}
export function setBookShelf(shelf){
  return setLocalStorage('shelf',shelf)
}



import Storage from 'web-storage-cache'
//使用库中的方法实例一个localStorage
const localStorage = new Storage()

export function setLocalStorage(key,value){
  return localStorage.set(key,value)
}
export function getLocalStorage(key){
  return localStorage.set(key)
}
export function removeLocalStorage(key){
  return localStorage.set(key)
}
export function clearLocalStorage(){
  return localStorage.clear
}



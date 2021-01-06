<template>
  <div class="shelf-foot-menu" v-show="isEditMode">
    <div
      class="shelf-foot-tabs-wrapper"
      v-for="item in tabs"
      :key="item.index"
      @click="onTabClick(item)"
    >
      <div class="shelf-foot-tab" :class="{ selected: selected }">
        <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 && !isDownload"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 && isDownload"></div>
        <div class="icon-move tab-icon" v-if="item.index === 3"></div>
        <div class="icon-shelf tab-icon" :class="{'remove-text' : item.index === 4}" v-if="item.index === 4"></div>
        <div class="tab-text">{{ label(item) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import {setBookShelf,removeLocalStorage} from '../../utils/localStorage'
import {download} from '../../api/store'
import { removeLocalForage } from '../../utils/localForage';
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      tabs: [
        {
          label1: "私密阅读",
          label2: "关闭私密阅读",
          index: 1,
        },
        {
          label1: "离线缓存",
          label2: "删除缓存",
          index: 2,
        },
        {
          label: "移动到...",
          index: 3,
        },
        {
          label: "移除",
          index: 4,
        },
      ],
      popupMenu:null
    }
  },
  computed: {
    selected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    },
    isPrivate(){
      if(!this.selected){
        return false
      }else{
        return this.shelfSelected.every(item => item.private)
      }
    },
    isDownload(){
      if(!this.selected){
        return false
      }else{
        return this.shelfSelected.every(item => item.cache)
      }
    }
  }, 
  methods: {
    label(item){
      switch(item.index){
        case 1:
          return this.isPrivate ? item.label2 : item.label1
        case 2:
          return this.isDownload ? item.label2 : item.label1
        default:
          return item.label
      }
    },
    complete(){
      // setBookShelf(this.shelfList)
      // this.hidePopupMenu()
      this.popupMenu.hide()
      this.setEditMode(false)

    },
    hidePopupMenu(){
      this.popupMenu.hide()
      this.setShelfSelected([])
      this.setEditMode(false)
    },
    setPrivate(){
      let privated 
      if(this.isPrivate){
        privated = false
      }else{
        privated = true
      }
      this.shelfSelected.forEach(book => {
        book.private = privated
      })
      this.complete()
      this.setShelfSelected(this.shelfSelected)
      setBookShelf(this.shelfList)
      this.simpleToast('设置成功') 
      this.setShelfSelected([])
    },
    showPrivate(){
      this.popupMenu = this.popup({
        title:this.isPrivate ? '关闭后图书阅读记录将对外公开' : '开启后所选图书的阅读记录将不对外公开',
        btn:[
          {
            text:this.isPrivate ? '关闭' : '确定',
            click:() => {this.setPrivate()}
          },
          {
            text:'取消',
            click:() => {this.hidePopupMenu()}
          }
        ]
      }).show()
    },
    removeSelected(){
      Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
      this.shelfSelected.forEach(book => book.cache = false)
    },
    removeBook(book){
      return new Promise((resolve,reject) => {
        removeLocalStorage(`${book.categoryText}/${book.fileName}`)
        removeLocalForage(`${book.fileName}`)
        resolve(book)
      })
    },
    async setDownload(){
      this.complete()
      if(this.isDownload){
        this.removeSelected()
        this.simpleToast('删除成功')
      }else{
        await this.downloadSelected()
        this.simpleToast('缓存成功')
      } 
      this.setShelfSelected(this.shelfSelected)
      setBookShelf(this.shelfList)  
      this.setShelfSelected([])
    },  
    async downloadSelected(){
      console.log('dddd');
      for(let i = 0;i < this.shelfSelected.length;i++){
        let res = await this.downloadBook(this.shelfSelected[i])
        res.cache = true
        console.log(this.shelfSelected);
      }    
    },
    downloadBook(book){
      console.log('book');
      let text = ''
      const toast = this.toast({
        text
      })
      toast.continueShow()
      return new Promise((resolve,reject) => {
        download(book,book => {
          toast.remove()
          resolve(book)
        }, reject, ProgressEvent => { 
          const progress = Math.floor(ProgressEvent.loaded / ProgressEvent.total * 100) + '%'
          text = `正在下载 ${progress}`
          toast.updateText(text)
        })
      })
    },
    showDownload(){
      this.popupMenu = this.popup({
        title:this.isDownload ? '将删除所选图书的缓存内容' : '将缓存所选图书内容',
        btn:[
          {
            text:this.isDownload ? '删除' : '开启',
            click:() => {
              this.setDownload()
            }
          },
          {
            text:'取消',
            click:() => {
              this.hidePopupMenu()
            }
          }
        ]
      }).show()
    },
    removeShelfBook(){
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.shelfList.filter(book => book !== selected))
      })
      this.setShelfSelected([])
      this.complete()
      setBookShelf(this.shelfList)
      this.simpleToast('设置成功') 
    },
    showRemove(){
      let title;
      if(this.shelfSelected.length === 1){
        title = `是否将《${this.shelfSelected[0].title}》移除书架`
      }else{
        title = '是否将所选图书移除书架'
      }
      this.popupMenu = this.popup({
        title,
        btn:[
          {
            text:'移除',
            type:'danger',
            click:() => {
              this.removeShelfBook()
            }
          },
          {
            text:'取消',
            click:() => {
              this.hidePopupMenu()
            }
          }
        ]
      }).show()
    },
    onTabClick(item) {
      if(!this.selected) return
      switch (item.index){
        case 1:
          this.showPrivate()
          break;
        case 2:
          this.showDownload()
          break;
        case 3:
          this.dialog().show()
          break;
        case 4:
          this.showRemove()
          break;
        default: 
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.shelf-foot-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 130;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background-color: white;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-foot-tabs-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;

    .shelf-foot-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      &.selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
        opacity: 0.5;
      }
      .icon-shelf{
        color: red;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
        &.remove-text{
          color: red;
        }
      }
    }
  }
}
</style>
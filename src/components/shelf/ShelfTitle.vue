<template>
  <transition name="fade">
    <div
      class="shelf-title"
      v-show="shelfTitleVisible"
      :class="{ hideShadow: isHideShadow }"
    >
      <div class="shelf-title-wrapper">
        <span class="shelf-title-text">{{ title }}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{
          selectedText
        }}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
        <span class="shelf-title-btn-text" @click="clearCache">{{
          $t("shelf.clearCache")
        }}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
        <span class="shelf-title-btn-text" @click="EditClick">{{
          isEditMode ? $t("shelf.cancel") : $t("shelf.edit")
        }}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
        <span class="icon-back" @click="back"></span>
      </div>
      <div
        class="shelf-title-btn-wrapper"
        :class="{
          'shelf-title-left': changeGroupLeft,
          'shelf-title-right': changeGroupRight,
        }"
        @click="changeGroup"
        v-if="showChangeGroup"
      >
        <span class="shelf-title-btn-text">{{$t('shelf.editGroup')}}</span>  
      </div>
    </div>
  </transition>
</template>

<script>
import { clearLocalForage  } from "../../utils/localForage";
import {clearLocalStorage, setBookShelf} from '../../utils/localStorage'
import { storeShelfMixin } from "../../utils/mixin";
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      isHideShadow: true,
      selectedNum: 0,
      popupMenu:null
    };
  },
  props: {
    title: String,
  },
  computed: {
    selectedText() {
      const selectedNum = this.shelfSelected ? this.shelfSelected.length : 0;
      return selectedNum === 0
        ? this.$t("shelf.selectBook")
        : `已选择${selectedNum}本`;
    },
    showBack(){
      return this.currentType === 2 && !this.isEditMode
    },
    showChangeGroup(){
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory)
    },
    changeGroupLeft(){
      return !this.emptyCategory
    },
    changeGroupRight(){
      return this.emptyCategory
    },
    showClear(){
      return this.currentType === 1
    },
    showEdit(){
      return this.currentType === 1 || !this.emptyCategory
    },
    emptyCategory(){
      return !this.shelfCategory || !this.shelfCategory.itemList || this.shelfCategory.itemList.length === 0
    },
    popupCancel(){
      return this.createPopup('取消',() => {
        this.hidePopup()
      })
    }
  },
  watch: {
    offsetY(y) {
      if (y > 0) {
        this.isHideShadow = false;
      } else {
        this.isHideShadow = true;
      }
    },
  },
  methods: {
    EditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([]);
        this.shelfList.forEach((item) => {
          item.selected = false;
          if (item.itemList) {
            item.itemList.forEach((item2) => {
              item2.selected = false;
            });
          }
        });
      }
      this.selectedNum = 0;
      this.setEditMode(!this.isEditMode);
    },
    clearCache() {
      clearLocalStorage();
      clearLocalForage();
      this.setShelfList([]);
      this.setShelfSelected([]);
      this.getShelfList();
      this.simpleToast("缓存已清除");
    },
    back() {
      this.$router.go(-1);
      this.setEditMode(false);
    },
    hidePopup(){
      this.popupMenu.hide()
    },
    createPopup(text,onClick,type='normal'){
      return {
        text,
        type,
        click:onClick
      }
    },
    changeGroup(){
      this.popupMenu = this.popup({
        btn:[
          this.createPopup('修改分组名称',() => {
            this.changeGroupName()
          }),
          this.createPopup('删除分组',() => {
            this.showDeleteGroup()
          },'danger'),
          this.popupCancel
        ]
      }).show()
    },
    //在将分组中书籍移出去之后删除这个分组
    onComplete(){
      this.hidePopup()
      this.setShelfList(this.shelfList.filter(book => book.id !== this.shelfCategory.id)).then(() => { 
          setBookShelf(this.shelfList)
          this.$router.go(-1)
          this.setEditMode(false)
         })
    },
    deleteGroup(){
      if(!this.emptyCategory){
        this.setShelfSelected(this.shelfCategory.itemList)
        this.moveOutGroup(this.onComplete)
      }else{
        this.onComplete()
      }
    },
    showDeleteGroup(){
      this.hidePopup()
      setTimeout(() => {
        this.popupMenu = this.popup({
          title:this.$t('shelf.deleteGroupTitle'),
          btn:[
            this.createPopup('确定',() => {this.deleteGroup()},'danger'),
            this.popupCancel
          ]
        }).show()
      },200)
    },
    changeGroupName(){
      this.hidePopup()
      this.dialog({
        showNewGroup:true,
        groupName:this.shelfCategory.title
      }).show()
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../../assets/styles/global";

.shelf-title {
  position: relative;
  z-index: 130;
  width: 100%;
  height: px2rem(42);
  background-color: white;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hideShadow {
    box-shadow: none;
  }
  .shelf-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: px2rem(16);
      line-height: px2rem(20);
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text {
      font-size: px2rem(10);
      color: #999;
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    height: 100%;
    @include centers;
    .shelf-title-btn-text {
      font-size: px2rem(14);
      color: #666;
    }
    .icon-back {
      font-size: px2rem(20);
      color: #666;
    }
    &.shelf-title-left {
      left: 0;
      padding-left: px2rem(15);
    }
    &.shelf-title-right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>
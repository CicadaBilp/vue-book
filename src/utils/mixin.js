//将映射vuex中的action和state的操作抽离到mixin中,在需要使用的地方导入进行融合即可

import { mapState, mapActions } from 'vuex'

export const bookMixin = {
  computed: {
    ...mapState(
      [
        'isShowMenu',
        'fileName',
        'showSetting',
        'defaultFontSize',
        'currentBook',
        'defaultFontFamily',
        'isShowFontFamily'
      ]
    )
  },
  methods: {
    ...mapActions(
      [
        'setShowMenu',
        'setFileName',
        'setShowSetting',
        'setDefaultFont',
        'setCurrentBook',
        'setDefaultFontFamily',
        'setShowFontFamily'
      ]
    )
  }
}
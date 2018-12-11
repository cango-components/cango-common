// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Utils from './utils/Utils'
//import Api from './Api'
import Api from './App'
//import Api from './Auto'
import Cg from './cgCommon'
import './themes/index.less'
Vue.config.productionTip = false
Vue.use(Cg)

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
/* eslint-disable no-new */
new Vue({
  el: '#api',
  components: { Api },
  template: '<api/>',
  created: function () {
    Utils.resize()
  }
})

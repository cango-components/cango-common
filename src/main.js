// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Utils from './utils/Utils'
//import Api from './Api'
import Api from './Auto'
import Cg from './cgCommon'
import './themes/index.less'
Vue.config.productionTip = false
Vue.use(Cg)

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

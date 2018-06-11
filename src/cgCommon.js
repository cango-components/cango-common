import Cg from './components'
import { PACKAGE_TYPE } from './Constants'
import './themes/index.less'

let result = null
if (PACKAGE_TYPE) {
  result = Cg.install
  window.Cg = Cg
} else {
  window.Cg = Cg
}

(() => {
  if (window.Vue) {
    console.log('项目中已经有了全局vue，组件无需注册可以直接使用')
    CgUI.install(Vue)
  } else {
    console.info('需要通过 Vue.use(CG) 的方式进行组件注册')
    window.CG = CgUI
  }
})()

export default result

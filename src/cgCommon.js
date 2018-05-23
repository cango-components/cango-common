import CgUI from './components'
import { PACKAGE_TYPE } from './Constants'

let result = null
if (PACKAGE_TYPE) {
  result = CgUI.install
} else {
  window.CG = CgUI
}
export default result

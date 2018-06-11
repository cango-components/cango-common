import Cg from './components'
import { PACKAGE_TYPE } from './Constants'

let result = null
if (PACKAGE_TYPE) {
  result = Cg.install
  window.Cg = Cg
} else {
  window.Cg = Cg
}
export default result

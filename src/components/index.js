import config from '../config'

import CgInput from './cgInput'
import CgSwitch from './cgSwitch'
import CgCustom from '../libs/image-clip'
import CgDatePicker from './cgDatePicker'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(CgInput)
      Vue.use(CgSwitch)
      Vue.use(CgCustom)
      Vue.use(CgDatePicker)
    })
  }
}

console.log(CgUI)
export default CgUI

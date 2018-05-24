import config from '../config'

import CgInput from './cgInput'
import CgSwitch from './cgSwitch'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(CgInput)
      Vue.use(CgSwitch)
    })
  }
}

export default CgUI

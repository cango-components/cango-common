import config from '../config'

import CgInput from './cgInput'
import CgSwitch from './cgSwitch'
import CgCustom from '../libs/image-clip'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(CgInput)
      Vue.use(CgSwitch)
      Vue.use(CgCustom)
    })
  }
}

export default CgUI

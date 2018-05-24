import config from '../config'

import CgInput from './cgInput/src/main.vue'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(CgInput)
    })
  }
}

export default CgUI

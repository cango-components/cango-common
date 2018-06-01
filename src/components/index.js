import config from '../config'

import CgInput from './cgInput'
import CgSwitch from './cgSwitch'
import CgCustom from '../libs/image-clip'
import CgButton from './cgButton'
import CgCheckbox from './cgCheckbox'
import CgForm from './cgForm'
import CgPagelist from './cgPagelist'
import CgScolllist from './cgScolllist'
import CgSelect from './cgSelect'
import CgTab from './cgTab'
import CgTree from './cgTree'
import CgUploadify from './cgUploadify'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(CgInput)
      Vue.use(CgSwitch)
      Vue.use(CgCustom)
      Vue.use(CgButton)
      Vue.use(CgCheckbox)
      Vue.use(CgForm)
      Vue.use(CgPagelist)
      Vue.use(CgScolllist)
      Vue.use(CgSelect)
      Vue.use(CgTab)
      Vue.use(CgTree)
      Vue.use(CgUploadify)
    })
  }
}

export default CgUI

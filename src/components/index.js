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
import CgDatePicker from './CgDatePicker'
import BrowseUtils from '../utils/BrowseUtils'
import DateUtils from '../utils/DateUtils'
import NumberUtils from '../utils/NumberUtils'
import StrUtils from '../utils/StrUtils'
import Utils from '../utils/Utils'
import FileUtils from '../utils/FileUtils'
import Excel from '../utils/Excel'
import FileConfig from '../utils/FileConfig'
import Layer from '../utils/Layer'

const Cg = {
  FileConfig,
  Excel,
  Layer,
  Utils,
  FileUtils,
  StrUtils,
  DateUtils,
  NumberUtils,
  BrowseUtils,
  install (Vue) {
    Vue.use(CgInput)
    Vue.use(CgSwitch)
    Vue.use(CgDatePicker)
    Vue.use(CgCheckbox)
    Vue.use(CgSelect)
    Vue.use(CgButton)
    Vue.use(CgPagelist)
    Vue.use(CgScolllist)
    Vue.use(CgTab)
    Vue.use(CgTree)
    Vue.use(CgForm)
    Vue.use(CgUploadify)
    Vue.use(CgCustom)
    // config.forEach(item => {
    //   Vue.use(CgInput)
    //   Vue.use(CgSwitch)
    //   Vue.use(CgDatePicker)
    //   Vue.use(CgCheckbox)
    //   Vue.use(CgSelect)
    //   Vue.use(CgButton)
    //   Vue.use(CgPagelist)
    //   Vue.use(CgScolllist)
    //   Vue.use(CgTab)
    //   Vue.use(CgTree)
    //   Vue.use(CgForm)
    //   Vue.use(CgUploadify)
    //   Vue.use(CgCustom)
    // })
  }
}

export default Cg

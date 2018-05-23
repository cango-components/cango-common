import config from '../config'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(item.component)
    })
  }
}

export default CgUI

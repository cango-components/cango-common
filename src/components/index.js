import config from '../config'

const CgUI = {
  install (Vue) {
    config.forEach(item => {
      Vue.use(item.component)
    })
  }
}

let result = null
try {
  if (Vue) {
    result = CgUI.install(Vue)
  }
} catch (err) {
  result = CgUI
}
export default result

import CgUploadify from './src/main.vue'

CgUploadify.install = function (Vue) {
  Vue.component(CgUploadify.name, CgUploadify)
}

export default CgUploadify

import CgEditor from './src/main.vue'

CgEditor.install = function (Vue) {
  Vue.component(CgEditor.name, CgEditor)
}

export default CgEditor

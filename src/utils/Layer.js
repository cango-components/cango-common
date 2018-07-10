/**
 * Created by ligd on 2018/7/10.
 */
import layer from 'vue-layer'
export default {
  cgLayer: null,
  setVue: function (v) {
    this.cgLayer = layer(v)
  },
  alert: function (content, options, yes) {
    return this.cgLayer.alert(content, options, yes)
  },
  confirm: function (content, options, yes, cancel) {
    return this.cgLayer.confirm(content, options, yes, cancel)
  },
  msg: function (content, options, end) {
    return this.cgLayer.msg(content, options, end)
  },
  tips: function (content, follow, options) {
    return this.cgLayer.tips(content, follow, options)
  },
  iframe: function (options) {
    return this.cgLayer.iframe(options)
  },
  open: function (options) {
    return this.cgLayer.open(options)
  },
  close: function (id) {
    return this.cgLayer.close(id)
  },
  closeAll: function (type) {
    return this.cgLayer.closeAll(type)
  }
}

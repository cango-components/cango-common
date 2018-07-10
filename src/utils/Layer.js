/**
 * Created by ligd on 2018/7/10.
 */
import Vue from 'vue'
import layer from 'vue-layer'
export default {
  cgLayer: layer(Vue, {msgtime: 1}),
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
  iframe: function (content, area, title) {
    return this.cgLayer.iframe({content: content, area: area, title: title})
  },
  open: function (options) {
    return layer.open(options)
  },
  close: function (id) {
    return layer.close(id)
  },
  closeAll: function (type) {
    return layer.closeAll(type)
  }
}

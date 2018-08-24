import BrowseUtils from './BrowseUtils'
export default {
  resize: function () {
    let oHtml = document.documentElement
    let designWidth = oHtml.clientWidth
    let fontSize = 65
    // 判断是不是pc端
    if (!BrowseUtils.isPC()) {
      if (designWidth < 375) {
        fontSize = '400'
        // 做相对应的判断 ，如果大于最大值 就将根目录的font-size固定在这个最大值所对应的font-size值
      } else if (designWidth >= 750) {
        fontSize = '200'
        // 在最大值和最小值的区间之内，就让它自动去计算
      } else {
        fontSize = '120'
      }
    }
    let wWidth = oHtml.clientWidth
    oHtml.style.fontSize = (wWidth / designWidth) * fontSize + '%'
  },
  getRecordValue: function (record, keyName, defaultValue) {
    if (!defaultValue) defaultValue = ''
    if (record === null || record === undefined) {
      return defaultValue
    }
    if (keyName === null || keyName === undefined) {
      return record
    }
    let keyNameList = keyName.split('-')
    let value = record
    for (let i = 0; i < keyNameList.length; i++) {
      if (value[keyNameList[i]] === null || value[keyNameList[i]] === undefined) {
        value = defaultValue
        break
      } else {
        value = value[keyNameList[i]]
      }
    }
    return value
  },
  /* 是否纯粹object */
  isPlainObject: function (o) {
    if (!o || o === window || o === document || o === document.body) {
      return false
    }
    return Object.prototype.toString.call(o) === '[object Object]'
  },
  isArray: function (list) {
    if (!list) return false
    return (list instanceof Array)
  },
  clone: function (obj) {
    let o
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]))
          }
        } else {
          o = {}
          for (let j in obj) {
            o[j] = this.clone(obj[j])
          }
        }
      }
    } else {
      o = obj
    }
    return o
  },
  /**
   * TODO 数组处理还要再改下
   * 数据merge类方法
   * to的数据作为默认值将from的数据merge到to里面
   * @param  to   数据本身
   * @param  from 来源数据
   * @param  mergeType 合并方式(支持:left,right,outer,inner;默认left)
   * @return to
   */
  mergeObject: function (to, from, mergeType) {
    // 默认left，支持大小写
    if (!mergeType) {
      mergeType = 'left'
    } else {
      mergeType = mergeType.toLowerCase()
    }
    if (!from) {
      if (mergeType === 'outer' || mergeType === 'left') {
        return to
      } else {
        // 设置为null会不会影响到vue组件的功能(指针发生偏移，不确认是否会影响到view的控件渲染，后续持续观察，如果影响会考虑把内部所有变量设置为null来处理)
        to = null
        return to
      }
    }
    if (!to) {
      if (mergeType === 'left' || mergeType === 'inner') {
        return to
      } else {
        to = {}
      }
    }
    if (this.isArray(from)) {
      let hasDemo = false
      let demo = null
      // 针对数组的，我们认为第一个数组是demo
      if (to) {
        if (to[0]) {
          demo = this.clone(to[0])
          hasDemo = true
          let length = to.length
          for (let k = 0; k < length; k++) {
            to.pop()
          }
        }
      } else {
        // 这里可能会有指向问题，需要注意
        to = []
      }
      for (let k = 0; k < from.length; k++) {
        if (hasDemo) {
          to.push(this.clone(demo))
          // 有demo的时候以demo为准
          this.mergeObject(to[k], from[k], mergeType)
        } else {
          // 没有demo时以right为准
          to.push(this.clone(from[k]))
        }
      }
      return to
    }
    let key
    let toKeys = Object.keys(to)
    let keys = Object.keys(from)
    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      if (toKeys.indexOf(key) >= 0) {
        toKeys.splice(toKeys.indexOf(key), 1)
      }
      if (to[key] === undefined) {
        if (mergeType === 'left' || mergeType === 'inner') {
          continue
        } else {
          if (from[key] === undefined || from[key] === null) {
            continue
          } else {
            // 判断是否简单类型，简单类型直接覆盖，非简单类型，递归
            if ((typeof from[key]) === 'object') {
              if (this.isArray(from[key])) {
                to[key] = []
                for (let k = 0; k < from[key].length; k++) {

                  // 没有demo时以right为准
                  to[key].push(this.clone(from[key][k]))
                  // to[key][k] = {}
                  // list的时候是不会有默认数据的，所以以right为准
                  // this.mergeObject(to[key][k], from[key][k], 'right')
                }
              } else {
                to[key] = {}
                this.mergeObject(to[key], from[key], mergeType)
              }
            } else {
              to[key] = from[key]
            }
          }
        }
      } else {
        if (from[key] === undefined || from[key] === null) {
          if (mergeType === 'left' || mergeType === 'outer') {
            if (to[key] && this.isArray(to[key])) {
              to[key] = []
            }
            continue
          } else {
            // 设置为null会不会影响到vue组件的功能(指针发生偏移，不确认是否会影响到view的控件渲染，后续持续观察，如果影响会考虑把内部所有变量设置为null来处理)
            to[key] = null
          }
        } else {
          // 判断是否简单类型，简单类型直接覆盖，非简单类型，递归
          if ((typeof from[key]) === 'object') {
            if (this.isArray(from[key])) {
              let hasDemo = false
              let demo = null
              // 针对数组的，我们认为第一个数组是demo
              if (to[key]) {
                if (to[key][0]) {
                  demo = this.clone(to[key][0])
                  hasDemo = true
                  let length = to[key].length
                  for (let k = 0; k < length; k++) {
                    to[key].pop()
                  }
                }
              } else {
                to[key] = []
              }
              for (let k = 0; k < from[key].length; k++) {
                if (hasDemo) {
                  to[key].push(this.clone(demo))
                  // 有demo的时候以demo为准
                  this.mergeObject(to[key][k], from[key][k], mergeType)
                } else {
                  to[key].push(from[key][k])
                  // 没有demo时以right为准
                  // this.mergeObject(to[key][k], from[key][k], 'right')
                }
              }
            } else {
              this.mergeObject(to[key], from[key], mergeType)
            }
          } else {
            to[key] = from[key]
          }
        }
      }
    }
    for (let i = 0; i < toKeys.length; i++) {
      if (mergeType === 'right' || mergeType === 'inner') {
        to[toKeys[i]] = null
      } else {
        if (this.isArray(to[toKeys[i]])) {
          to[toKeys[i]] = []
        }
      }
    }
    return to
  },
  /* 从url地址中获取变量 */
  getFromRequest: function (key) {
    let url = location.search
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    if (url.indexOf('?') >= 0) {
      let r = url.substr(1).match(reg)
      if (r !== null) {
        return decodeURIComponent(r[2])
      }
    }
    return null
  },
  /* 跳转链接 */
  linkUrl: function (url, params, target) {
    let start = '?'
    if (url.indexOf('?') >= 0) {
      start = '&'
    }
    if (!params) {
      params = {}
    }
    let request = ''
    for (let key in params) {
      if (this.isArray(params[key])) {
        for (let key1 in params[key]) {
          request += start + encodeURIComponent(key) + '=' + encodeURIComponent(params[key][key1])
          start = '&'
        }
      } else {
        request += start + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        start = '&'
      }
    }
    if (target && target === '_blank') {
      window.open(url + request)
    } else {
      window.location = url + request
    }
  },
  /* 跳转链接并清空当前访问的url列表(不能前进或后退) */
  replaceUrl: function (url, params) {
    let start = '?'
    if (url.indexOf('?') >= 0) {
      start = '&'
    }
    if (!params) {
      params = {}
    }
    let request = ''
    for (let key in params) {
      if (this.isArray(params[key])) {
        for (let key1 in params[key]) {
          request += start + encodeURIComponent(key) + '=' + encodeURIComponent(params[key][key1])
          start = '&'
        }
      } else {
        request += start + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        start = '&'
      }
    }
    location.replace(url + request)
  },
  /* TODO guid生成，后续考虑优化 */
  guid: function () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
  formatJson: function (json, options) {
    let reg = null
    let formatted = ''
    let pad = 0
    let PADDING = '    '
    options = options || {}
    options.newlineAfterColonIfBeforeBraceOrBracket = false
    options.spaceAfterColon = true
    if (typeof json !== 'string') {
      json = JSON.stringify(json)
    } else {
      json = JSON.parse(json)
      json = JSON.stringify(json)
    }
    reg = /([{}])/g
    json = json.replace(reg, '\r\n$1\r\n')
    reg = /([[\]])/g
    json = json.replace(reg, '\r\n$1\r\n')
    reg = /(,)/g
    json = json.replace(reg, '$1\r\n')
    reg = /(\r\n\r\n)/g
    json = json.replace(reg, '\r\n')
    reg = /\r\n,/g
    json = json.replace(reg, ',')
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
      reg = /:\r\n\{/g
      json = json.replace(reg, ':{')
      reg = /:\r\n\[/g
      json = json.replace(reg, ':[')
    }
    if (options.spaceAfterColon) {
      reg = /:/g
      json = json.replace(reg, ':')
    }
    (json.split('\r\n')).forEach(
      function (node, index) {
        let i = 0
        let indent = 0
        let padding = ''
        if (node.match(/\{$/) || node.match(/\[$/)) {
          indent = 1
        } else if (node.match(/\}/) || node.match(/\]/)) {
          if (pad !== 0) {
            pad -= 1
          }
        } else {
          indent = 0
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING
        }

        formatted += padding + node + '\r\n'
        pad += indent
      }
    )
    return formatted
  }
}

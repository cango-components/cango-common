export default {
  escapeChars: {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  },
  reversedEscapeChars: {
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    '\'': '#39'
  },
  /* TODO 对于字符串类型要做判断 删除字符串两边空白 */
  trim: function (str) {
    return str.replace(/^\s+|\s+$/gm, '')
  },
  /* TODO 对于字符串类型要做判断 删除字符串左边空白 */
  ltrim: function (str) {
    return str.replace(/^\s+/, '')
  },
  /* TODO 对于字符串类型要做判断 删除字符串右边空白 */
  rtrim: function (str) {
    return str.replace(/\s+$/, '')
  },
  /* 是否空白 */
  isBlank: function (str) {
    if (str == null) return true
    if (str === undefined) return true
    return (/^\s*$/).test(str)
  },
  /* 去除字符串中的html标签 */
  stripTags: function (str) {
    if (str == null) return ''
    if (str === undefined) return ''
    return String(str).replace(/<\/?[^>]+>/g, '')
  },
  /* 字符串以什么开头 */
  startsWith: function (str, starts) {
    if (starts === '') return true
    if (str == null || starts == null) return false
    str = String(str)
    starts = String(starts)
    return str.length >= starts.length && str.slice(0, starts.length) === starts
  },
  /* 字符串以什么结尾 */
  endsWith: function (str, ends) {
    if (ends === '') return true
    if (str == null || ends == null) return false
    str = String(str)
    ends = String(ends)
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends
  },
  /* 字符串进行html编码用于静态页面输出 */
  escapeHTML: function (str) {
    let self = this
    if (str == null) return ''
    return String(str).replace(/[&<>"']/g, function (m) {
      return '&' + self.reversedEscapeChars[m] + ';'
    })
  },
  /* 字符串进行html解码 */
  unescapeHTML: function (str) {
    if (str == null) return ''
    let self = this
    return String(str).replace(/&([^;]+);/g, function (entity, entityCode) {
      var match
      if (entityCode in self.escapeChars) {
        return self.escapeChars[entityCode]
      } else if (match === entityCode.match(/^#x([\da-fA-F]+)$/)) {
        return String.fromCharCode(parseInt(match[1], 16))
      } else if (match === entityCode.match(/^#(\d+)$/)) {
        return String.fromCharCode(~~match[1])
      } else {
        return entity
      }
    })
  },
  /* 是否数字，排除NaN */
  isNum: function (str) {
    if (str === '' || str === null || str === undefined) {
      return false
    }
    return (!isNaN(str))
  },
  /* 全部替换 */
  replaceAll: function (str, s1, s2) {
    return str.replace(new RegExp(s1, 'gm'), s2)
  }
}

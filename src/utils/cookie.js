/**
 * Created by zhangting on 2018/4/28.
 */
export default {
  createCookie: function (name, value, days) {
    document.cookie = ''
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    }
    document.cookie = name + '=' + value + expires + '; path=/'
  },
  readCookie: function (name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
  eraseCookie: function (name) {
    this.createCookie(name, '', -1)
  }
}

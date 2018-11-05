export default {
  // Browser environment sniffing
  inBrowser: function () {
    return typeof window !== 'undefined'
  },
  inWeex: function () {
    return typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
  },
  weexPlatform: function () {
    return this.inWeex() && WXEnvironment.platform.toLowerCase()
  },
  UA: function () {
    return this.inBrowser() && window.navigator.userAgent.toLowerCase()
  },
  isIE: function () {
    return this.UA() && /msie|trident/.test(this.UA())
  },
  isIE9: function () {
    return this.UA() && this.UA().indexOf('msie 9.0') > 0
  },
  isEdge: function () {
    return this.UA() && this.UA().indexOf('edge/') > 0
  },
  isAndroid: function () {
    return (this.UA() && this.UA().indexOf('android') > 0) || (this.weexPlatform === 'android')
  },
  isIOS: function () {
    return (this.UA() && /iphone|ipad|ipod|ios/.test(this.UA())) || (this.weexPlatform === 'ios')
  },
  isChrome: function () {
    return (this.UA() && /chrome\/\d+/.test(this.UA())) && !this.isEdge()
  },
  isPC: function () {
    let userAgentInfo = navigator.userAgent
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  // TODO
  isWechat: function () {
    return false
  },
  isWxwork: function () {
    return this.UA() && this.UA().indexOf('wxwork/') > 0
  },
  // TODO
  isAndroidApp: function () {
    return false
  },
  // TODO
  isIosApp: function () {
    return false
  }
}

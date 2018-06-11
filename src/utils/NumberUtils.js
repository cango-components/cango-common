export default {
  /* 计算百分比 */
  percent: function (mumerator, denominator, num) {
    if (!num) {
      num = 0
    }
    denominator = parseFloat(denominator)
    mumerator = parseFloat(mumerator)
    if (denominator > 0) {
      let number = mumerator * 100 / denominator
      return this.numberFormat(number, num) + '%'
    } else {
      if (mumerator > denominator) {
        return '100%'
      } else {
        return '0%'
      }
    }
  },
  /* 计算百分比无符号 */
  percentNoSymbol: function (mumerator, denominator, num) {
    if (!num) {
      num = 0
    }
    denominator = parseFloat(denominator)
    mumerator = parseFloat(mumerator)
    if (denominator > 0) {
      let number = mumerator * 100 / denominator
      return this.numberFormat(number, num)
    } else {
      if (mumerator > denominator) {
        return '100'
      } else {
        return '0'
      }
    }
  },
  /* toFixed功能的完善，去除小数点后不需要的0 */
  numberFormat: function (number, toFixedNumber) {
    let num = Number(number).toFixed(toFixedNumber) + ''
    let index = num.indexOf('.')
    if (index > -1) {
      let i = (num.length - 1)
      for (; i > index; i--) {
        if (num.charAt(i) !== '0') {
          i++
          break
        }
      }
      return num.substr(0, i)
    } else {
      return num
    }
  },
  /* 钱格式化 */
  moneyFormat: function (val) {
    // 数字判断
    if (!isNaN(val)) {
      let v = Number(val).toFixed(2)
      let str = '' + v
      let result = ''
      let arr = str.split('')
      let len = arr.length
      for (var i = len; i > 0; i--) {
        if ((len - i) % 3 === 0 && (len - i) >= 6) {
          if (arr[i - 1] === '-') {
            result = arr[i - 1] + result
          } else {
            result = arr[i - 1] + ',' + result
          }
        } else {
          result = arr[i - 1] + result
        }
      }
      return result
    } else {
      return val
    }
  },
  /* 文件大小格式转换 */
  fileSizeFormat: function (bytes) {
    let k = bytes
    let list = ['B', 'KB', 'MB', 'GB', 'TB']
    let unit = list[list.length - 1]
    for (var i = 0; i < list.length; i++) {
      if (k > 999) {
        k = (k / 1024).toFixed(2)
      } else {
        unit = list[i]
        break
      }
    }
    return k + unit
  }
}

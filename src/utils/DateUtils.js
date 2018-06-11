export default {
  /* 字符串转日期 */
  strToDate: function (str, dateFormat) {
    if (!dateFormat) {
      dateFormat = 'yyyy-MM-dd HH:mm:ss'
    }
    if (!str) {
      return null
    }
    let matchs1 = dateFormat.match(/([yYMdDhHmsS])(\1*)/g)
    let matchs2 = str.match(/(\d)+/g)
    if (matchs1.length === matchs2.length) {
      let _date = new Date(1970, 0, 1)
      _date.setHours(0)
      _date.setMinutes(0)
      _date.setSeconds(0)
      for (let i = 0; i < matchs1.length; i++) {
        let _int = parseInt(matchs2[i])
        let sign = matchs1[i]
        switch (sign.charAt(0)) {
          case 'y': _date.setFullYear(_int)
            break
          case 'Y': _date.setFullYear(_int)
            break
          case 'M': _date.setMonth(_int - 1)
            break
          case 'd': _date.setDate(_int)
            break
          case 'D': _date.setDate(_int)
            break
          case 'h': _date.setHours(_int)
            break
          case 'H': _date.setHours(_int)
            break
          case 'm': _date.setMinutes(_int)
            break
          case 's': _date.setSeconds(_int)
            break
          case 'S': _date.setSeconds(_int)
            break
        }
      }
      return _date
    }
    return null
  },
  /* 日期格式化 */
  format: function (date, formatStr) {
    if (!date) {
      return null
    }
    if (date === 'Invalid Date') {
      return null
    }
    let str = formatStr
    let Week = ['日', '一', '二', '三', '四', '五', '六']
    str = str.replace(/yyyy|YYYY/, date.getFullYear())
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))
    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1))
    str = str.replace(/M/g, (date.getMonth() + 1))
    str = str.replace(/w|W/g, Week[date.getDay()])
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
    str = str.replace(/d|D/g, date.getDate())
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
    str = str.replace(/h|H/g, date.getHours())
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
    str = str.replace(/m/g, date.getMinutes())
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
    str = str.replace(/s|S/g, date.getSeconds())
    return str
  },
  /* 获取指定日期过去或未来第n周的周一(n=0为当周) */
  getWeekStartDate: function (srcDate, n) {
    if (!srcDate) {
      return null
    }
    if (srcDate === 'Invalid Date') {
      return null
    }
    if (n === undefined) {
      n = 0
    } else if (n === null) {
      n = 0
    }
    // 今天当周的第几天（周一为第一天）
    let dayOfWeek = srcDate.getDay() - 1
    // 当前日
    let day = srcDate.getDate()
    // 当前月
    let month = srcDate.getMonth()
    // 当前年
    let year = srcDate.getYear()
    year += (year < 2000) ? 1900 : 0
    dayOfWeek += (dayOfWeek < 0) ? 7 : 0
    let weekStartDate = new Date(year, month, day - dayOfWeek + (n * 7))
    return weekStartDate
  },
  /* 获取指定日期所在周的周日 */
  getWeekEndDate: function (srcDate, n) {
    if (!srcDate) {
      return null
    }
    if (srcDate === 'Invalid Date') {
      return null
    }
    if (n === undefined) {
      n = 0
    } else if (n === null) {
      n = 0
    }
    // 今天当周的第几天（周一为第一天）
    let dayOfWeek = srcDate.getDay() - 1
    // 当前日
    let day = srcDate.getDate()
    // 当前月
    let month = srcDate.getMonth()
    // 当前年
    let year = srcDate.getYear()
    year += (year < 2000) ? 1900 : 0
    let weekEndDate = new Date(year, month, day - dayOfWeek + 6 + n * 7)
    return weekEndDate
  },
  /* 获取指定日期为周几 */
  getDayOfWeek: function (date, preStr) {
    if (preStr === undefined || preStr === null) {
      preStr = '周'
    }
    return preStr + '日一二三四五六'.split('')[date.getDay()]
  },
  /* 校验两个字符串日期是否属于同一周 */
  checkWeek: function (newDate, oldDate) {
    let newDays = Date.parse(newDate) / (1000 * 60 * 60 * 24)
    let oldDays = Date.parse(oldDate) / (1000 * 60 * 60 * 24)
    return Math.floor((newDays + 4) / 7) === Math.floor((oldDays + 4) / 7)
  },
  /* 获取当前月份 */
  getCurrentMonth: function () {
    let now = new Date()
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return now
  },
  /* 获取上个月份 */
  getPrevMonth: function () {
    let now = new Date()
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    let prevMonth = new Date(now.setMonth(now.getMonth() - 1))
    return prevMonth
  },
  /* 获取下个月份 */
  getNextMonth: function () {
    let now = new Date()
    now.setDate(1)
    let nextMonth = new Date(now.setMonth(now.getMonth() + 1))
    return nextMonth
  }
}

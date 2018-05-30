let date = new Date()

export default {
  year: {
    currentY: date.getFullYear()
  },
  month: {
    monthDates: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    currentM: date.getMonth()
  },
  date: {
    currentD: date.getDate
  },
  day: {
    week: ['日', '一', '二', '三', '四', '五', '六'],
    currentW: date.getDay
  }
}

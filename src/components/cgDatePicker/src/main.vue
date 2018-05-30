<template>
  <div class="cg-date-picker">
    <div class="cg-date-picker-nav">
      <span class="nav-item nav-prev-year" @click="prevYear">&lt;&lt;</span>
      <span class="nav-item nav-prev-month" @click="prevMonth">&lt;</span>
      <span class="nav-item nav-yandm">{{curYear}}&nbsp;{{curMonth}}</span>
      <span class="nav-item nav-next-month" @click="nextMonth">&gt;</span>
      <span class="nav-item nav-next-year" @click="nextYear">&gt;&gt;</span>
    </div>
    <div class="cg-date-picker__header">
      <div
        class="cg-date-picker__header-item"
        v-for="(item, index) in week"
        :key="index"
      >{{item}}</div>
    </div>
    <div class="cg-date-picker__content">
      <div
        class="cg-date-picker__content-item"
        v-for="(item, index) in monthDays"
        :key="index"
        :class="item.isLastM?'cg-date-picker__content-disabled':''"
        @click="selectDate(item)"
      >{{item.lab}}</div>
    </div>
  </div>
</template>

<script>
import define from './define'
export default {
  name: 'cg-date-picker',
  data () {
    return {
      week: define.day.week,
      dateList: [],
      curYear: 2018,
      curMonth: 2,
      curDate: 1
    }
  },
  props: {

  },
  computed: {
    monthDays () {
      let monthDates = this.getMaxDate(this.curMonth)
      let lastMonthDates = this.getMaxDate(this.curMonth - 1)
      let result = []
      let time = new Date(this.curTime)
      let curDay = time.getDay()
      for (let i = 0; i < curDay; i++) {
        result.unshift({
          val: `${this.curYear}/${this.curMonth - 1}/${lastMonthDates - i}`,
          lab: lastMonthDates - i,
          isLastM: true
        })
      }
      for (let i = 0; i < monthDates; i++) {
        result.push({
          val: `${this.curYear}/${this.curMonth - 1}/${i + 1}`,
          lab: i + 1,
          isLastM: false
        })
      }
      return result
    },
    curTime () {
      return this.curYear + '/' + this.curMonth + '/' + this.curDate
    },
    isLeapmonth () { // 判断当前年份是否是闰年
      return ((this.curYear % 4 === 0) && (this.curYear % 100 !== 0)) || (this.curYear % 400 === 0)
    },
    monthDates () { // 获取指定年份的每个月天数
      this.isLeapmonth ? define.month.monthDates.splice(1, 1, 29) : define.month.monthDates.splice(1, 1, 28)
      return define.month.monthDates
    }
  },
  methods: {
    getMaxDate (month) { // 获取指定月份的天数
      let max = this.monthDates[month - 1]
      return max
    },
    selectDate (data) { // 选择日期
      // let time = new Date(data)
    },
    prevYear () {
      this.curYear--
    },
    prevMonth () {
      this.curMonth--
    },
    nextMonth () {
      this.curMonth++
    },
    nextYear () {
      this.curYear++
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <div class="cg-date-picker">
    <div class="cg-date-picker__input" @click.stop="showPicker">
      <cg-input v-model="date" :readonly="true" class="cg-date-picker__input-content"></cg-input>
    </div>
    <div class="cg-date-picker__picker" v-if="showFlag" @click.stop="() => {}">
      <div class="cg-date-picker-nav">
        <span class="nav-item nav-prev-year" @click.stop="curYear--">&lt;&lt;</span>
        <span class="nav-item nav-prev-month" @click.stop="curMonth--">&lt;</span>
        <span class="nav-item nav-yandm">{{curYear}}&nbsp;{{curMonth | toDou}}</span>
        <span class="nav-item nav-next-month" @click.stop="curMonth++">&gt;</span>
        <span class="nav-item nav-next-year" @click.stop="curYear++">&gt;&gt;</span>
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
          :class="[item.isLastM?'cg-date-picker__content-disabled':'', , item.val===date?'cg-date-picker__content-selected':'']"
          @click="selectDate(item)"
        >
          <i class="cg-date-picker__content-i">{{item.lab}}</i>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import CgInput from '../../cgInput/src/main'
import define from './define'
export default {
  name: 'cg-date-picker',
  data () {
    return {
      week: define.day.week,
      dateList: [],
      curYear: define.year.currentY,
      curMonth: define.month.currentM + 1,
      curDate: 1,
      date: '',
      showFlag: false
    }
  },
  props: {
    /**
     * 后续还需要扩展
     *  时间格式化
     *  选择时间范围
     */
    value: { // 默认值
      type: String,
      default: ''
    }
  },
  created () {
    let $this = this
    document.querySelector('body').addEventListener('click', () => {
      $this.showFlag = false
    }, false)
  },
  mounted () {
    this.date = this.value
  },
  components: {
    CgInput
  },
  filters: {
    toDou (val, style) { // 单数变成双数
      let type = Object.prototype.toString.call(val)
      switch (type) {
        case '[object String]':
          return val.length < 2 ? '0' + val : val
        case '[object Number]':
          return val < 10 ? '0' + val : val
        default:
          return val
      }
    }
  },
  watch: {
    curMonth (val) {
      if (val < 1) {
        this.curYear--
        this.curMonth = 12
      }
      if (val > 12) {
        this.curYear++
        this.curMonth = 1
      }
    },
    date (newVal, oldVal) {
      if (newVal === oldVal) return
      this.$emit('input', newVal)
    }
  },
  computed: {
    monthDays () {
      let curMonthDates = this.getMaxDate(this.curMonth)
      let lastMonthDates = this.getMaxDate(this.curMonth - 1)
      let result = []
      let time = new Date(this.curTime)
      let curDay = time.getDay()
      // 填充上个月的天数
      for (let i = 0; i < curDay; i++) {
        result.unshift(Object.assign({}, lastMonthDates, {
          val: lastMonthDates.val + (lastMonthDates.lab - i),
          lab: lastMonthDates.lab - i,
          isLastM: true,
          id: curDay - i - 1
        }))
      }
      // 填充本月天数
      for (let i = 0; i < curMonthDates.lab; i++) {
        result.push(Object.assign({}, curMonthDates, {
          val: `${this.curYear}/${this.curMonth}/${i + 1}`,
          lab: i + 1,
          isLastM: false,
          id: curDay + i
        }))
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
      let val
      if (month < 1) {
        val = `${this.curYear - 1}/12/`
        max = 31
      } else {
        val = `${this.curYear}/${this.curMonth - 1}/`
      }
      return {
        val,
        lab: max
      }
    },
    selectDate (data) { // 选择日期
      this.selected = data.val
      this.date = data.val
      if (data.isLastM) {
        this.curMonth--
      }
    },
    showPicker () { // 打开时间面板
      this.showFlag = true
      if (this.date.trim()) {
        let date = new Date(this.date)
        this.curYear = date.getFullYear()
        this.curMonth = date.getMonth() + 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .cg-date-picker {
    position: relative;
  }
  .cg-date-picker__picker {
    position: absolute;
  }
</style>

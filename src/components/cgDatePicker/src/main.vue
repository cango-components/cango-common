<template>
  <div class = 'cg-datepick__main'>
    <div v-if='label' class = 'cg-datepick__label'>
      <div class="label">
       {{ label }}
      </div>
      <div v-if='tip' class="title-tips">
        <span>?</span>
        <div class="title-tips-content">{{ tip }}</div>
      </div>
    </div>
    <div class = 'cg-datepick__datepick'>
      <el-date-picker
        v-model="dataPickerOption.value"
        :type="dataPickerOption.type"
        :readonly="dataPickerOption.readonly"
        :placeholder="dataPickerOption.placeholder"
        :default-time="dataPickerOption.defaultTime"
      >
      </el-date-picker>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import DateUtils from '../../../utils/DateUtils.js'
import StrUtils from '../../../utils/StrUtils.js'
import {DateTimePicker} from 'element-ui'
export default {
  name: 'cg-datepicker',
  components: {
    DateTimePicker
  },
  data () {
    return {
      defaultTime: {
        default: null
      },
      dataPickerOption: {
        // year/month/date/week/datetime/datetimerange/daterange
        type: this.showtype,
        placeholder: this.placeholder,
        startPlaceholder: this.startPlaceholder,
        endPlaceholder: this.endPlaceholder,
        value: null,
        readonly: this.readonly,
        format: 'yyyy-MM-dd HH:mm:ss',
        // 弹窗样式
        align: 'left',
        timeArrowControl: false,
        rangeSeparator: '-',
        unlinkPanels: '',
        // 用处不大的配置数据
        // large, small, mini
        size: 'small',
        editable: true,
        clearable: true
        // valueFormat: '',
        // popperClass: '',
        // pickerOptions: {},
        // defaultValue: '',
      }
    }
  },
  props: {
    // 标题
    label: {
      default: ''
    },
    // 数值
    value: {
      default: null
    },
    // 默认值(timestamp,string)
    type: {
      type: String,
      default: 'timestamp'
    },
    // 显示类型
    showtype: {
      type: String,
      default: 'date'
    },
    defaultTimeStamp: {
      default: null
    },
    // 格式化
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // placeholder
    placeholder: {
      type: String,
      default: ''
    },
    // startPlaceholder
    startPlaceholder: {
      type: String,
      default: ''
    },
    // endPlaceholder
    endPlaceholder: {
      type: String,
      default: ''
    },
    // 提示信息
    'tip': {
      default: null
    },
    // 是否readonly
    'readonly': {
      type: Boolean,
      default: false
    },
  },
  created () {
    if ((this.defaultTimeStamp === null || this.defaultTimeStamp === undefined) && this.showtype === 'daterange') {
      this.defaultTime = [0, 86399999]
    } else {
      this.defaultTime = this.defaultTimeStamp
    }
    this.setValue()
  },
  mounted () {
  },
  watch: {
    dataPickerOption: {
      handler: function (newVal, oldVal) {
        this.putValue()
      },
      deep: true
    },
    value: {
      handler: function (newVal, oldVal) {
        this.setValue()
      },
      deep: true
    }
  },
  computed: {
  },
  methods: {
    putValue: function () {
      let minAddValue = 0
      let maxAddValue = 0
      let startDate = (this.dataPickerOption.value) ? this.dataPickerOption.value[0] : null
      let endDate = (this.dataPickerOption.value) ? this.dataPickerOption.value[1] : null
      if (this.showtype === 'daterange') {
        minAddValue += this.defaultTime[0]
        maxAddValue += this.defaultTime[1]
      }
      if (this.showtype === 'daterange') {
        if (this.dataPickerOption.value !== null) {
          if (this.dataPickerOption.value[0]) {
            startDate = new Date()
            startDate.setTime(this.dataPickerOption.value[0].getTime() + minAddValue)
          }
          if (this.dataPickerOption.value[1]) {
            endDate = new Date()
            endDate.setTime(this.dataPickerOption.value[1].getTime() + maxAddValue)
          }
        }
      }
      if (this.showtype === 'datetimerange' || this.showtype === 'daterange') {
        if (this.type === 'timestamp') {
          if (this.dataPickerOption.value === null) {
            this.$emit('input', null)
          } else {
            let minDate = (startDate) ? startDate.getTime() : null
            let maxDate = (endDate) ? endDate.getTime() : null
            if (this.value) {
              let flg = false
              if (this.value[0]) {
                if (this.value[0] === minDate) {
                  flg = true
                }
              } else if (!minDate) {
                flg = true
              }
              if (flg) {
                if (this.value[1]) {
                  if (this.value[1] === maxDate) {
                    return
                  }
                } else if (!maxDate) {
                  return
                }
              }
            }
            this.$emit('input', [minDate, maxDate])
          }
        } else if (this.type === 'string') {
          if (this.dataPickerOption.value === null) {
            this.$emit('input', null)
          } else {
            let minDate = (startDate) ? DateUtils.format(startDate, this.format) : null
            let maxDate = (endDate) ? DateUtils.format(endDate, this.format) : null
            if (this.value) {
              let flg = false
              if (this.value[0]) {
                if (this.value[0] === minDate) {
                  flg = true
                }
              } else if (!minDate) {
                flg = true
              }
              if (flg) {
                if (this.value[1]) {
                  if (this.value[1] === maxDate) {
                    return
                  }
                } else if (!maxDate) {
                  return
                }
              }
            }
            this.$emit('input', [minDate, maxDate])
          }
        } else if (this.type === 'date') {
          let minDate = startDate
          let maxDate = endDate
          if (this.value) {
            let flg = false
            if (this.value[0]) {
              if (minDate && this.value[0].getTime() === minDate.getTime()) {
                flg = true
              }
            } else if (!minDate) {
              flg = true
            }
            if (flg) {
              if (this.value[1]) {
                if (maxDate && this.value[1].getTime() === maxDate.getTime()) {
                  return
                }
              } else if (!maxDate) {
                return
              }
            }
          }
          this.$emit('input', [minDate, maxDate])
        }
      } else {
        if (this.type === 'timestamp') {
          if (this.dataPickerOption.value === null) {
            this.$emit('input', null)
          } else {
            if (this.value && this.value === this.dataPickerOption.value.getTime()) {
              return
            }
            this.$emit('input', this.dataPickerOption.value.getTime())
          }
        } else if (this.type === 'string') {
          if (this.dataPickerOption.value === null) {
            this.$emit('input', null)
          } else {
            if (this.value && this.value === DateUtils.format(this.dataPickerOption.value, this.format)) {
              return
            }
            this.$emit('input', DateUtils.format(this.dataPickerOption.value, this.format))
          }
        } else if (this.type === 'date') {
          if (this.value && this.value.getTime() === this.dataPickerOption.value.getTime()) {
            return
          }
          this.$emit('input', this.dataPickerOption.value)
        }
      }
    },
    setValue: function () {
      if (this.showtype === 'datetimerange' || this.showtype === 'daterange') {
        if (this.type === 'timestamp') {
          if (this.value === null || this.value === undefined) {
            this.dataPickerOption.value = null
          } else {
            let minDate = null
            let maxDate = null
            if (this.value[0] !== null || this.value[0] !== undefined) {
              minDate = new Date()
              minDate.setTime(this.value[0])
              if (this.showtype === 'daterange') {
                minDate.setHours(0)
                minDate.setMinutes(0)
                minDate.setSeconds(0)
                minDate.setMilliseconds(0)
              }
            }
            if (this.value[1] !== null || this.value[1] !== undefined) {
              maxDate = new Date()
              maxDate.setTime(this.value[1])
              if (this.showtype === 'daterange') {
                maxDate.setHours(0)
                maxDate.setMinutes(0)
                maxDate.setSeconds(0)
                maxDate.setMilliseconds(0)
              }
            }
            this.dataPickerOption.value = [minDate, maxDate]
          }
        } else if (this.type === 'string') {
          if (this.value === null || this.value === undefined) {
            this.dataPickerOption.value = [null, null]
          } else {
            let minDate = null
            let maxDate = null
            if (!StrUtils.isBlank(this.value[0])) {
              minDate = DateUtils.strToDate(this.value[0])
            }
            if (!StrUtils.isBlank(this.value[1])) {
              maxDate = DateUtils.strToDate(this.value[1])
            }
            this.dataPickerOption.value = [minDate, maxDate]
          }
        } else if (this.type === 'date') {
          this.dataPickerOption.value = this.value
        }
      } else {
        if (this.type === 'timestamp') {
          if (this.value === null || this.value === undefined) {
            this.dataPickerOption.value = null
          } else {
            let date = new Date()
            date.setTime(this.value)
            this.dataPickerOption.value = date
          }
        } else if (this.type === 'string') {
          if (StrUtils.isBlank(this.value)) {
            this.dataPickerOption.value = null
          } else {
            let date = DateUtils.strToDate(this.value)
            this.dataPickerOption.value = date
          }
        } else if (this.type === 'date') {
          this.dataPickerOption.value = this.value
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

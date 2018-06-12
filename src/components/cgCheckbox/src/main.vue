<template>
  <div class = 'cg-checkbox__main'
    :class='getClass()'
  >
    <div v-if='label'
         :class='titleStyle==0 ? "cg-checkbox__label_transverse": "cg-checkbox__label_vertical"'
         class = 'cg-checkbox__label'
    >
      {{ label }}
    </div>
    <div
      class = 'cg-checkbox__content_main'
      :class='(titleStyle==0 && label) ? "cg-checkbox__content_main_transverse" : "cg-checkbox__content_main_vertical"'>
      <div :class='showStyle==0 ? "cg-checkbox__content_checkbox_transverse" : "cg-checkbox__content_checkbox_vertical"'>
        <div v-for='(item, index) in list'
             :key='"list" + index'
             @click='putValue(item)'
             :class='isChecked(item) ? "cg-checkbox__checked" : ""'
             class = 'cg-checkbox__content'>
          <slot v-bind:option='item'>
            {{ showRecordName(item) }}
          </slot>
        </div>
      </div>
      <div class='clear'></div>
    </div>
    <div class='clear'></div>
  </div>
</template>

<script>
import Utils from '../../../utils/Utils.js'
import StrUtils from '../../../utils/StrUtils.js'
export default {
  name: 'cg-checkbox',
  props: {
    // 标题
    'label': {
      type: String,
      default: ''
    },
    // ID
    'id': {
      type: String,
      default: ''
    },
    // 是否readonly
    'readOnly': {
      type: Boolean,
      default: false
    },
    // 是否必填
    'required': {
      type: Boolean,
      default: false
    },
    // 选项为空时转换成null
    'emptyIsNull': {
      type: Boolean,
      default: true
    },
    // 和data配合使用，去data里面对应的keyName的值作为id
    'keyName': {
      type: String,
      default: 'id'
    },
    // 和data配合使用，去data里面对应的showName的值作为显示
    'showName': {
      type: String,
      default: 'name'
    },
    // 候选项
    'list': {
      type: Array,
      default: function () {
        return []
      }
    },
    // 展示的函数，优先级再showName之前，复杂展示方式的时候使用，这里考虑用插槽实现
    'showFunc': {
      type: Function
    },
    // 最多选中数量(0:为不限制;1:为单选;)
    'selectNum': {
      type: Number,
      default: 1
    },
    // 下拉框数值
    'value': {
      default: null
    },
    // 标题和内容展示方式(0:横向展示;1:竖向展示)
    'titleStyle': {
      type: Number,
      default: 0
    },
    // 选项展示方式(0:横向展示;1:竖向展示)
    'showStyle': {
      type: Number,
      default: 0
    }
  },
  created: function () {
    this.resizeValue(this.value)
  },
  data: function () {
    return {
      errorMsg: ''
    }
  },
  computed: {
  },
  methods: {
    getClass: function () {
      let className = ''
      if (this.errorMsg !== '') {
        className += ' cg-checkbox__error'
      }
      if (this.readOnly) {
        className += ' cg-checkbox__readonly'
      }
      console.log(className)
      return className
    },
    valid: function () {
      if (this.required) {
        if (this.selectNum === 1) {
          if (StrUtils.isBlank(this.value)) {
            // TODO 错误信息，后续考虑规范报错方式
            this.errorMsg = '不能为空'
            return this.errorMsg
          }
        } else {
          if (this.value === undefined || this.value == null || this.value.length === 0) {
            // TODO 错误信息，后续考虑规范报错方式
            this.errorMsg = '不能为空'
            return this.errorMsg
          }
        }
        this.errorMsg = ''
      } else {
        this.errorMsg = ''
      }
      return this.errorMsg
    },
    resizeValue: function (value) {
      if (this.selectNum === 1) {
        if (this.emptyIsNull) {
          if (StrUtils.isBlank(value)) {
            this.$emit('input', null)
            return
          }
        }
      } else {
        if (this.emptyIsNull) {
          if (value === undefined || value == null || value.length === 0) {
            this.$emit('input', null)
            return
          }
        }
      }
      this.$emit('input', value)
    },
    isChecked: function (item) {
      if (this.value == null || this.value === undefined) {
        return false
      }
      if (Utils.isArray(this.value)) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] === item[this.keyName]) {
            return true
          }
        }
      } else {
        if (this.value === item[this.keyName]) {
          return true
        }
      }
      return false
    },
    putValue: function (item) {
      if (this.readOnly) {
        return
      }
      let add = true
      let value = Utils.clone(this.value)
      if (this.selectNum === 1) {
        value = item[this.keyName]
        add = false
      } else if (this.selectNum === 0) {
        if (!value) {
          value = []
        }
        for (let i = 0; i < value.length; i++) {
          if (value[i] === item[this.keyName]) {
            value.splice(i, 1)
            add = false
            break
          }
        }
      } else {
        if (!value) {
          value = []
        }
        for (let i = 0; i < value.length; i++) {
          if (value[i] === item[this.keyName]) {
            value.splice(i, 1)
            add = false
            break
          }
        }
        if (value.length >= this.selectNum) {
          add = false
        }
      }
      if (add) {
        value.push(item[this.keyName])
      }
      this.resizeValue(value)
    },
    showRecordName: function (record) {
      if (this.showFunc) {
        return this.showFunc(record)
      } else {
        return Utils.getRecordValue(record, this.showName)
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.valid()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

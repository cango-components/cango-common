<template>
  <div class = 'cg-checkbox__main'
    :class='getClass' @blur="blur"
  >
    <div v-if='label'
         :class='titlestyle==0 ? "cg-checkbox__label_transverse": "cg-checkbox__label_vertical"'
         class = 'cg-checkbox__label'
    >
      {{ label }}
      <div v-if='tip' class="title-tips">
        <span>?</span>
        <div class="title-tips-content">{{ tip }}</div>
      </div>
    </div>
    <div
      class = 'cg-checkbox__content_main'
      :class='getContentClass'>
      <div :class='showstyle==0 ? "cg-checkbox__content_checkbox_transverse" : "cg-checkbox__content_checkbox_vertical"'>
        <div v-for='(item, index) in list'
             :key='"list" + index'
             @click='putValue(item)'
             :class='isChecked(item) ? "cg-checkbox__checked" : ""'
             class = 'cg-checkbox__content'>
          <span></span>
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
    'readonly': {
      type: Boolean,
      default: false
    },
    // 是否必填
    'required': {
      type: Boolean,
      default: false
    },
    // 选项为空时转换成null
    'emptyisnull': {
      type: Boolean,
      default: true
    },
    // 和data配合使用，去data里面对应的keyname的值作为id
    'keyname': {
      type: String,
      default: 'id'
    },
    // 和data配合使用，去data里面对应的showname的值作为显示
    'showname': {
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
    // 展示的函数，优先级再showname之前，复杂展示方式的时候使用，这里考虑用插槽实现
    'showfunc': {
      type: Function
    },
    // 最多选中数量(0:为不限制;1:为单选;)
    'selectnum': {
      type: Number,
      default: 1
    },
    // 下拉框数值
    'value': {
      default: null
    },
    // 标题和内容展示方式(0:横向展示;1:竖向展示)
    'titlestyle': {
      type: Number,
      default: 1
    },
    // 选项展示方式(0:横向展示;1:竖向展示)
    'showstyle': {
      type: Number,
      default: 1
    },
    // 提示信息
    'tip': {
      default: null
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
    getClass () {
      let className = ''
      if (this.readonly) {
        className += ' cg-checkbox__readonly'
      }
      return className
    },
    getContentClass () {
      let className = 'cg-checkbox__content_main_vertical'
      if (this.titlestyle === 0 && this.label) {
        className = 'cg-checkbox__content_main_transverse'
      }
      let errorClassName = ''
      if (this.errorMsg !== '') {
        errorClassName = 'cg-checkbox__error'
      }
      return [className, errorClassName]
    }
  },
  methods: {
    blur: function () {
      this.valid()
    },
    valid: function () {
      if (this.required) {
        if (this.selectnum === 1) {
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
      if (this.selectnum === 1) {
        if (this.emptyisnull) {
          if (StrUtils.isBlank(value)) {
            this.$emit('input', null)
            return
          }
        }
      } else {
        if (this.emptyisnull) {
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
          if (this.value[i] === item[this.keyname]) {
            return true
          }
        }
      } else {
        if (this.value === item[this.keyname]) {
          return true
        }
      }
      return false
    },
    putValue: function (item) {
      if (this.readonly) {
        return
      }
      let add = true
      let value = Utils.clone(this.value)
      if (this.selectnum === 1) {
        value = item[this.keyname]
        add = false
      } else if (this.selectnum === 0) {
        if (!value) {
          value = []
        }
        for (let i = 0; i < value.length; i++) {
          if (value[i] === item[this.keyname]) {
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
          if (value[i] === item[this.keyname]) {
            value.splice(i, 1)
            add = false
            break
          }
        }
        if (value.length >= this.selectnum) {
          add = false
        }
      }
      if (add) {
        value.push(item[this.keyname])
      }
      this.resizeValue(value)
    },
    showRecordName: function (record) {
      if (this.showfunc) {
        return this.showfunc(record)
      } else {
        return Utils.getRecordValue(record, this.showname)
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
.cg-checkbox__error{
  outline: none;
  border-radius: 4px;
  border: solid 1px !important;
  border-color: #f70505 !important;
}
</style>

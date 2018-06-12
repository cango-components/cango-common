<template>
  <div class = 'cg-select__base'
    :class='getClass()' >
    <div class = 'cg-select__main' >
      <div
        v-if='label'
        class = 'cg-select__label'
        :class = 'titleStyle == 0 ? "cg-select__label_transverse" : "cg-select__label_vertical"'>
        {{ label }}
      </div>

      <div
        :class="(titleStyle==0 && label) ? 'cg-select__box_transverse' : 'cg-select__box_vertical'"
        @click="showHide()" >
        <div
          class = 'cg-select__value'
          :class="showSelectDiv ? 'cg-select__value_active' : ''">
          {{ showText }}
          <i :class="showSelectDiv ? 'cg-select__icon_down' : 'cg-select__icon_up'"></i>
        </div>
      </div>

      <div class='clear'></div>

      <div v-if='showSelectDiv'
           :class='(titleStyle==0 && label) ? "cg-select__pop_transverse" : "cg-select__pop_vertical"'
           class = 'cg-select__pop'>
        <div v-if='showSelectAll' class = 'cg-select__pop_selectAll'>
        </div>
        <div v-if='filter' class = 'cg-select__select_pop_filter'>
          <input type = 'text' v-model='filterText' v-bind:placeholder = 'filterPlaceholder' >
        </div>
        <div v-if='(!required && selectNum == 1)' @click='putValue(emptyItem)' class = 'cg-select__pop_content' >
          空选项
        </div>
        <div v-for='(item, index) in getList' :key='index' @click='putValue(item)' v-bind:class='isSelected(item) ? "cg-select__pop_selected" : ""' class = 'cg-select__pop_content'>
          <slot v-bind:option='item' >
            {{ showRecordName(item) }}
          </slot>
        </div>
        <div v-if='selectNum != 1' @click='closeDiv()' class = 'cg-select__select_pop_close'>
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../../../utils/Utils.js'
import StrUtils from '../../../utils/StrUtils.js'
import BrowseUtils from '../../../utils/BrowseUtils.js'
export default {
  name: 'cg-select',
  props: {
    // 下拉框标题
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
    // 下拉框候选项
    'list': {
      type: Array,
      default: function () {
        return []
      }
    },
    // TODO 展示的函数，优先级再showName之前，复杂展示方式的时候使用，这里考虑用插槽实现
    'showFunc': {
      type: Function
    },
    // 是否显示筛选器
    'filter': {
      type: Boolean,
      default: false
    },
    // 是否忽略大小写
    'filterIgnore': {
      type: Boolean,
      default: true
    },
    // 筛选器默认文字
    'filterPlaceholder': {
      type: String,
      default: '请输入关键字'
    },
    // 是否显示全选按钮(selectNum为0时才有意义)
    'showSelectAll': {
      type: Boolean,
      default: false
    },
    // 空选项的时候，默认展示数据
    'emptyLabel': {
      type: String,
      default: '请选择'
    },
    // 下拉框最多选中数量(0:为不限制;1:为单选;)
    'selectNum': {
      type: Number,
      default: 1
    },
    // 下拉框数值
    'value': {
      default: null
    },
    // 分隔符
    'separator': {
      type: String,
      default: ','
    },
    // 标题和内容展示方式(0:横向展示;1:竖向展示)
    'titleStyle': {
      type: Number,
      default: 0
    }
  },
  created: function () {
    this.resizeValue(this.value)
  },
  data: function () {
    return {
      showSelectDiv: false,
      filterText: '',
      errorMsg: ''
    }
  },
  computed: {
    getList: function () {
      let dataList = []
      if (this.list) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.filterText !== '') {
            let text = this.showRecordName(this.list[i]) + ''
            let filterText = this.filterText + ''
            if (this.filterIgnore) {
              filterText = filterText.toLowerCase()
              text = text.toLowerCase()
            }
            if (text.indexOf(filterText) >= 0) {
              dataList.push(Utils.clone(this.list[i]))
            }
          } else {
            dataList.push(Utils.clone(this.list[i]))
          }
        }
      }
      return dataList
    },
    emptyItem: function () {
      let obj = {}
      obj[this.keyName] = ''
      return obj
    },
    showText: function () {
      let text = ''
      if (this.value == null || this.value === undefined) {
        return this.emptyLabel
      }
      if (Utils.isArray(this.value)) {
        if (this.value.length === 0) {
          return this.emptyLabel
        }
        for (let i = 0; i < this.value.length; i++) {
          for (let k = 0; k < this.list.length; k++) {
            if (this.value[i] === this.list[k][this.keyName]) {
              if (text === '') {
                text = this.showRecordName(this.list[k])
              } else {
                text += this.separator + this.showRecordName(this.list[k])
              }
              break
            }
          }
        }
      } else {
        for (let i = 0; i < this.list.length; i++) {
          if (this.value === this.list[i][this.keyName]) {
            text = this.showRecordName(this.list[i])
            break
          }
        }
      }
      return text
    }
  },
  methods: {
    getClass: function () {
      let className = ''
      if (this.errorMsg !== '') {
        className += ' cg-select__error'
      }
      if (this.readOnly) {
        className += ' cg-select__readonly'
      }
      if (!BrowseUtils.isPC()) {
        className += ' cg-select__mobile'
      }
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
    showHide: function () {
      if (this.readOnly) {
        return
      }
      this.showSelectDiv = !this.showSelectDiv
    },
    isSelected: function (item) {
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
      if (this.selectNum === 1) {
        this.closeDiv()
      }
    },
    closeDiv: function () {
      this.showSelectDiv = false
    },
    showRecordName: function (record) {
      if (this.showFunc) {
        return this.showFunc(record)
      } else {
        return record[this.showName]
      }
    }
  },
  watch: {
    value (oldValue, newValue) {
      this.valid()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <table class = 'cg-pageList__base' >
    <tr class = 'cg-pageList__title' >
      <th v-if='showcheckbox' class = 'cg-pageList__label cg-pageList__label_checkall' >
        <input type="checkbox" v-model="checkallValue" @change="checkall()" >
      </th>
      <th v-for='(title, index) in titleconfig'
          :key='"title"+index'
          @click='orderClick(title)'
          class = 'cg-pageList__label'>
        {{ title.label }}
        <span v-if='getOrderClass(title)' :class='getOrderClass(title)'></span>
      </th>
    </tr>
    <tbody class = 'cg-pageList__data'>
      <tr v-for='(record, recordIndex) in list'
          :key='"record"+recordIndex'
          class = 'cg-pageList__content'>
        <td v-if='showcheckbox' class = 'cg-pageList__check' >
          <input type='checkbox' @click='check(record)' :checked = 'isChecked(record)'>
        </td>
        <td v-for='(title, recTitleIndex) in titleconfig'
            :key='"recTitle"+recTitleIndex'
            class = 'cg-pageList__record'
            @click='rowClick(record)' >
          <slot v-bind:option='{record: record, title: title}' >
            {{ showRecordName(record, title) }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tr class = 'cg-pageList__page'>
      <td :colspan="showcheckbox ? titleconfig.length+1 : titleconfig.length ">
        一共 {{ this.page.totalNum }} 条记录,
        当前 {{ this.page.pageNo }} 页
      </td>
    </tr>
  </table>
</template>

<script>
import Utils from '../../../utils/Utils.js'
export default {
  name: 'cg-pagelist',
  props: {
    // 分页信息
    'page': {
      default: {
        pageSize: 20,
        pageNo: 1,
        totalNum: 0
      }
    },
    // 排序展示(keyname:排序的主键;orderBy:asc/desc顺序逆序)
    'initorder': {
      default: {
        keyName: '',
        orderBy: ''
      }
    },
    // 数据
    'list': {
      type: Array,
      default: []
    },
    // 标题配置{orderAble:是否可以排序,label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}
    'titleconfig': {
      type: Array,
      default: []
    },
    // 是否显示勾选功能
    'showcheckbox': {
      type: Boolean,
      default: true
    },
    // 选中的记录
    'value': {
      default: null
    },
    // 数据加载方法(排序，分页等都会触发，返回data,page,order对象)
    'loadfunction': {
      type: Function
    },
    // 行点击事件
    'rowclickfunction': {
      type: Function
    }
  },
  created: function () {
  },
  data: function () {
    return {
      order: {
        keyName: this.initorder.keyName,
        orderBy: this.initorder.orderBy
      },
      checkallValue: false
    }
  },
  computed: {

  },
  methods: {
    checkall: function () {
      let value = []
      if (this.checkallValue) {
        if (this.list) {
          for (let i = 0; i < this.list.length; i++) {
            value.push(this.list[i])
          }
        }
      }
      this.resizeValue(value)
    },
    check: function (record) {
      let value = []
      if (this.value) {
        for (let i = 0; i < this.value.length; i++) {
          value.push(this.value[i])
        }
      }
      for (let k = 0; k < value.length; k++) {
        if (record === value[k]) {
          value.splice(k, 1)
          this.resizeValue(value)
          return
        }
      }
      value.push(record)
      this.resizeValue(value)
    },
    resizeValue: function (value) {
      this.$emit('input', value)
    },
    rowClick: function (record) {
      if (this.rowclickfunction) {
        this.rowclickfunction(record)
      }
    },
    orderClick: function (title) {
      if (this.loadfunction && title.orderAble) {
        let page = Utils.clone(this.page)
        if (title.keyName === this.order.keyName) {
          if (this.order.orderBy === 'desc') {
            this.order.orderBy = 'asc'
          } else {
            this.order.orderBy = 'desc'
          }
        } else {
          this.order.keyName = title.keyName
          this.order.orderBy = 'asc'
        }
        this.loadfunction(page, this.order)
      }
    },
    showRecordName: function (record, title) {
      let keyName = title.keyName
      let showFunction = title.showFunction
      if (showFunction) {
        return showFunction(record)
      } else {
        return Utils.getRecordValue(record, keyName)
      }
    },
    getOrderClass: function (title) {
      let className = ''
      if (title.keyName === this.order.keyName) {
        className = 'cg-pageList__' + this.order.orderBy
      }
      return className
    },
    toPage: function (pageNo) {
      if (this.loadfunction) {
        let page = Utils.clone(this.page)
        page.pageNo = pageNo
        this.loadfunction(page, this.order)
      }
    },
    isChecked: function (record) {
      if (this.value) {
        for (let i = 0; i < this.value.length; i++) {
          if (record === this.value[i]) {
            return true
          }
        }
      }
      return false
    }
  },
  watch: {
    list (oldValue, newValue) {
      this.resizeValue([])
    }
  }
}
</script>

<style lang="less" scoped>
</style>

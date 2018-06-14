<template>
  <table class = 'cg-scollList__base' >
    <tr class = 'cg-scollList__title' >
      <th v-for='(title, thIndex) in titleconfig' :key='"thTitle"+thIndex'  class = 'cg-scollList__label'>
        {{ title.label }}
      </th>
    </tr>
    <tr v-for='(record, index) in list' :key='"list"+index' class = 'cg-scollList__content'>
      <td v-for='(title, titleIndex) in titleconfig'
          :key='"title"+titleIndex'
          class = 'cg-scollList__record'
          @click='rowClick(record)' >
        <slot v-bind:option='{record: record, title: title}' >
          {{ showRecordName(record, title) }}
        </slot>
      </td>
    </tr>
    <tr v-if='hasMore' class = 'cg-scollList__page' @click='showMore()' >
      <td :colspan="titleconfig.length">
        点击显示更多
      </td>
    </tr>
  </table>
</template>

<script>
import Utils from '../../../utils/Utils.js'
export default {
  name: 'cg-scolllist',
  props: {
    // 数据
    'list': {
      type: Array,
      default: []
    },
    // 标题配置{label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}
    'titleconfig': {
      type: Array,
      default: []
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
    if (this.list && this.list.length > 0) {
      this.hasMore = true
    } else {
      this.hasMore = false
    }
  },
  data: function () {
    return {
      hasMore: true
    }
  },
  computed: {

  },
  methods: {
    rowClick: function (record) {
      if (this.rowclickfunction) {
        this.rowclickfunction(record)
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
    showMore: function () {
      if (this.loadfunction) {
        if (this.list) {
          this.loadfunction(this.list[this.list.length - 1])
        } else {
          this.loadfunction(null)
        }
        this.hasMore = false
      }
    }
  },
  watch: {
    list (oldValue, newValue) {
      if (newValue && newValue.length > 0) {
        this.hasMore = true
      } else {
        this.hasMore = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

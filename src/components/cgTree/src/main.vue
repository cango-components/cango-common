<template>
  <div class = 'cg-tree__base' >
    <div v-if='filter' class = 'cg-tree__filter' >
      <input type = 'text' v-model='filterText' v-bind:placeholder = 'filterplaceholder'>
    </div>
    <div  class = 'cg-tree__main'>
      <div v-for='(node, nodeIndex) in getList'
           :key='"node" + nodeIndex'
           class = 'cg-tree__node' :title="showRecordName(node.record)">
        <div  :class = '(node == selectNode) ? "cg-tree__selected" : ""' >
          <span v-for="i in node.level" :key='"node" + nodeIndex + "span" + i' >&nbsp;&nbsp;</span>
          <i class='cango-uploadify__file_iconfont icon-zengjia' @click='treeNodeExtend(node)'></i>
          <span v-bind:option='node' @click="treeNodeSelect(node)">
            {{ showRecordName(node.record) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cg-tree',
    props: {
      // 和data配合使用，去data里面对应的showname的值作为显示(-做分割进行深层次访问)
      'showname': {
        type: String,
        default: 'name'
      },
      // 和data配合使用，去data里面对应的childname的值作为子节点列表(-做分割进行深层次访问)
      'childname': {
        type: String,
        default: 'child'
      },
      // 展示的函数，优先级再showname之前，复杂展示方式的时候使用，这里考虑用插槽实现
      'showfunc': {
        type: Function
      },
      // 候选项
      'list': {
        type: Array,
        default: function () {
          return []
        }
      },
      // 选中事件
      'onselected': {
        type: Function
      },
      // 展开事件
      'onextend': {
        type: Function
      },
      // 是否显示筛选器(在已知的节点范围内进行检索，最好配合list一次性加载，否则只检索已知数据)
      'filter': {
        type: Boolean,
        default: false
      },
      // 是否忽略大小写
      'filterignore': {
        type: Boolean,
        default: true
      },
      // 筛选器默认文字
      'filterplaceholder': {
        type: String,
        default: '请选择'
      }
    },
    created: function () {
      // 刷新树图
      this.recordList = this.resizeRecordList(this.list, 1, false)
    },
    data: function () {
      return {
        recordList: [],
        filterText: '',
        selectNode: null
      }
    },
    computed: {
      getList: function () {
        let finalList = []
        if (this.recordList) {
          let preLevel = 0
          let preShowChild = true
          for (let i = 0; i < this.recordList.length; i++) {
            if (this.recordList[i].level > preLevel) {
              if (!preShowChild) {
                continue
              }
              finalList.push(this.recordList[i])
            } else {
              finalList.push(this.recordList[i])
            }
            preLevel = this.recordList[i].level
            preShowChild = this.recordList[i].showChild
          }
        }
        return finalList
      }
    },
    methods: {
      filterLike: function (record) {
        if (this.filterText === '') return true
        let filterText = this.filterText + ''
        let text = this.showRecordName(record) + ''
        if (this.filterignore) {
          filterText = filterText.toLowerCase()
          text = text.toLowerCase()
        }
        if (text.indexOf(filterText) >= 0) {
          return true
        } else {
          return false
        }
      },

      showRecordName: function (record) {
        if (this.showfunc) {
          return this.showfunc(record)
        } else {
          return record[this.showname]
        }
      },
      treeNodeExtend: function (record) {
        record.showChild = !record.showChild
        if (this.onextend) {
          this.onextend(record.record, record.showChild)
        }
      },
      treeNodeSelect: function (record) {
        this.selectNode = record
        if (this.onselected) {
          this.onselected(record.record)
        }
      },
      resizeRecordList: function (list, level, parentIsOk) {
        let result = []
        if (!level) level = 1
        if (this.list) {
          for (let i = 0; i < list.length; i++) {
            if (parentIsOk || this.filterLike(list[i])) {
              result.push({record: list[i], level: level, showChild: this.searchShowChild(list[i])})
              if (list[i][this.childname]) {
                let res = this.resizeRecordList(list[i][this.childname], level + 1, true)
                if (res != null && res.length > 0) {
                  result = result.concat(res)
                }
              }
            } else {
              if (list[i][this.childname]) {
                let res = this.resizeRecordList(list[i][this.childname], level + 1, false)
                if (res != null && res.length > 0) {
                  result.push({record: list[i], level: level, showChild: true})
                  result = result.concat(res)
                }
              } else {
                continue
              }
            }
          }
        }
        return result
      },
      resetRecordList: function (list, level, parentIsOk) {
        let result = []
        if (!level) level = 1
        if (this.list) {
          for (let i = 0; i < list.length; i++) {
            if (parentIsOk || this.filterLike(list[i])) {
              result.push({record: list[i], level: level, showChild: false})
              if (list[i][this.childname]) {
                let res = this.resetRecordList(list[i][this.childname], level + 1, true)
                if (res != null && res.length > 0) {
                  result = result.concat(res)
                }
              }
            } else {
              if (list[i][this.childname]) {
                let res = this.resetRecordList(list[i][this.childname], level + 1, false)
                if (res != null && res.length > 0) {
                  result.push({record: list[i], level: level, showChild: true})
                  result = result.concat(res)
                }
              } else {
                continue
              }
            }
          }
        }
        return result
      },
      searchShowChild: function (record) {
        for (let i = 0; i < this.recordList.length; i++) {
          if (this.recordList[i].record === record) {
            return this.recordList[i].showChild
          }
        }
        return false
      }
    },
    watch: {
      list: {
        handler: function (val, oldVal) {
          // 刷新树图
          this.recordList = this.resizeRecordList(this.list, 1, false)
        },
        deep: true
      },
      filterText (oldValue, newValue) {
        // 刷新树图
        this.recordList = this.resetRecordList(this.list, 1, false)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cg-tree__base{
    max-height: 50rem;
    overflow-y: auto;
  }
  .cg-tree__filter input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .cg-tree__filter input:focus{
    outline: none;
    border-color: #409eff;
  }
  .icon-zengjia:before{
    content: "\e604";
  }
  .cg-tree__main{
    padding:0.6rem;
  }
  .cg-tree__node{
    line-height: 2.5rem;
    height:2.5rem;
    overflow: hidden;
    font-size: 3rem;
    cursor: pointer;
  }
  .cg-tree__selected{
    background:#f1f2f3;
  }
</style>

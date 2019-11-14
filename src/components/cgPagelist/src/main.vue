<template>
  <table class = 'cg-pageList__base' cellpadding="0" cellspacing="0">
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
      <template v-for='(title, recTitleIndex) in titleconfig'>
        <td v-if="showSpan[recordIndex][recTitleIndex].isShow"
            :colspan = "showSpan[recordIndex][recTitleIndex].colspan"
            :rowspan = "showSpan[recordIndex][recTitleIndex].rowspan"
            :key='"recTitle"+recTitleIndex'
            class = 'cg-pageList__record'
            @click='rowClick(record)' >
          <slot v-bind:option='{record: record, title: title}' >
            {{ showRecordName(record, title) }}
          </slot>
        </td>
      </template>
    </tr>
    </tbody>
    <tr class = 'cg-pageList__page' v-if="page">
      <td :colspan="showcheckbox ? titleconfig.length+1 : titleconfig.length ">
        <div v-if="page" class="pages">
          <div v-if="page.pageNo > 1" @click='toPage(page.pageNo - 1)' class="prev">上一页</div>
          <div class="page">
            <template v-if="page.pageNo === 1" >
              <span @click='toPage(1)' class="current">1</span>
            </template>
            <template v-if="page.pageNo === 2" >
              <span @click='toPage(1)'>1</span>
              <span @click='toPage(2)' class="current">2</span>
            </template>
            <template v-if="page.pageNo === 3" >
              <span @click='toPage(1)'>1</span>
              <span @click='toPage(2)'>2</span>
              <span @click='toPage(3)' class="current">3</span>
            </template>
            <template v-if="page.pageNo > 3" >
              <span @click='toPage(page.pageNo - 3)'>...</span>
              <span @click='toPage(page.pageNo - 2)'>{{ page.pageNo - 2 }}</span>
              <span @click='toPage(page.pageNo - 1)'>{{ page.pageNo - 1}}</span>
              <span @click='toPage(page.pageNo)' class="current">{{ page.pageNo }}</span>
            </template>
            <template v-if="(totalPageNo - page.pageNo) === 1" >
              <span @click='toPage(totalPageNo)' >{{ totalPageNo }}</span>
            </template>
            <template v-if="(totalPageNo - page.pageNo) === 2" >
              <span @click='toPage(totalPageNo - 1)' >{{ totalPageNo - 1 }}</span>
              <span @click='toPage(totalPageNo)' >{{ totalPageNo }}</span>
            </template>
            <template v-if="(totalPageNo - page.pageNo) === 3" >
              <span @click='toPage(totalPageNo - 2)' >{{ totalPageNo - 2 }}</span>
              <span @click='toPage(totalPageNo - 1)' >{{ totalPageNo - 1 }}</span>
              <span @click='toPage(totalPageNo)' >{{ totalPageNo }}</span>
            </template>
            <template v-if="(totalPageNo - page.pageNo) > 3" >
              <span @click='toPage(page.pageNo + 1)'>{{ page.pageNo + 1}}</span>
              <span @click='toPage(page.pageNo + 2)'>{{ page.pageNo + 2 }}</span>
              <span @click='toPage(page.pageNo + 3)'>...</span>
            </template>
          </div>
          <div v-if="page.pageNo < totalPageNo" @click='toPage(page.pageNo + 1)' class="next">下一页</div>
          <div class="page-go">
            <input type="text" v-model="inputPageNum" placeholder="输入页码"/>
            <button class="goto-page" @click='toPage2()'>跳</button>
          </div>
        &nbsp;&nbsp;第{{ this.page.pageNo }}页/共{{ this.page.totalRow }}条
        </div>
      </td>
    </tr>
  </table>
</template>
<script>
import Utils from '../../../utils/Utils.js'
import StrUtils from '../../../utils/StrUtils.js'
export default {
  name: 'cg-pagelist',
  props: {
    // 分页信息(pageSize:每页记录数;pageNo:当前第几页;totalRow:总记录数)
    'page': {
      default: null
    },
    // 计算cowspan和rowspan
    'spanmethod': {
      default: null
    },
    // 排序展示(keyname:排序的主键;orderBy:asc/desc顺序逆序)
    'initorder': {
      default: function () {
        return {
          keyName: '',
          orderBy: ''
        }
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
      checkallValue: false,
      inputPageNum: null
    }
  },
  computed: {
    totalPageNo: function () {
      let totalPageNo = 1
      if (this.page && this.page.totalRow > 0) {
        totalPageNo = Math.ceil(this.page.totalRow / this.page.pageSize)
      }
      return totalPageNo
    },
    showSpan: function () {
      let self = this
      let show = {}
      if (self.list) {
        for (let i = 0; i < self.list.length; i++) {
          if (!show[i]) {
            show[i] = {}
          }
          for (let k = 0; k < self.titleconfig.length; k++) {
            if (!show[i][k]) {
              show[i][k] = {}
              show[i][k].isShow = true
              let spanRule = self.objectSpanMethod(self.list[i], i, k)
              show[i][k].colspan = spanRule.colspan
              show[i][k].rowspan = spanRule.rowspan
              for (let m = 1; m <= spanRule.rowspan; m++) {
                for (let n = 1; n <= spanRule.colspan; n++) {
                  if (m > 1 || n > 1) {
                    if (!show[i + m - 1]) {
                      show[i + m - 1] = {}
                    }
                    if (!show[i + m - 1][k + n - 1]) {
                      show[i + m - 1][k + n - 1] = {}
                    }
                    show[i + m - 1][k + n - 1].isShow = false
                  }
                }
              }
            }
          }
        }
      }
      return show
    }
  },
  methods: {
    objectSpanMethod: function (row, rowIndex, columnIndex) {
      let result = null
      if (this.spanmethod) {
        result = this.spanmethod(row, rowIndex, columnIndex)
      }
      if (!result) {
        result = {
          colspan: 1,
          rowspan: 1
        }
      }
      return result
    },
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
    toPage2: function () {
      if (StrUtils.isNum(this.inputPageNum)) {
        if (this.inputPageNum < 1) {
          this.inputPageNum = 1
        }
        if (this.inputPageNum > this.totalPageNo) {
          this.inputPageNum = this.totalPageNo
        }
        this.inputPageNum = parseInt(this.inputPageNum)
        this.toPage(this.inputPageNum)
      } else {
        this.inputPageNum = null
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
  .pages{
    width:100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    align-items: center;
    justify-content:center;
    margin: 0.5rem auto;
    span,input,.goto-page{
      display: inline-block;
      vertical-align: middle;
      width:2.6rem;
      text-align: center;
      height: 2.6rem;
      line-height: 2.6rem;
      overflow: hidden;
      padding:0;
      margin: 0 0.2rem;
      border: 0.06rem solid #ddd;
      font-size: 1.1rem;
      border-radius: 0.3rem;
      cursor: pointer;
      color:#333;
    }
    .next,.prev{
      padding: 0.6rem 1.3rem;
      line-height: 1.4rem;
      margin: 0 0.2rem;
      border: 0.06rem solid #ddd;
      font-size: 1.1rem;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: column;
      border-radius: 0.3rem;
      cursor: pointer;
      &.no-cursor{
        color: #ccc;
        border: 0.06rem solid #eee;
        cursor: default;
      }
    }

    input{
      width: 6rem;
      cursor: default;
    }
    span:hover{
      color:#39a0ff;
    }
    span.current,.goto-page{
      color: #409eff;
      background: #ecf5ff;
      border: 0.06rem solid #b3d8ff;
    }
  }

</style>

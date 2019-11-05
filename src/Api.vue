<template>
  <div id='content'>
    <div class="menu">
      <template v-for='(item, index) in ApiData'>
        <h3 :key='"menu"+index'>{{ item.name }}</h3>
        <template v-for='(child, childIndex) in item.child'>
          <li :key='"menu"+index+"child"+childIndex'>
            <button class="menuBtn" @click='changeData(index, childIndex, $event)' ref="menuBtnRef">{{ child.name }}</button>
            <ul v-show="showDetailMenu" ref='detailMenuRef'>
              <li v-for='(children, childrenIndex) in child.children' :key='"menu"+index+"child"+childIndex+"children"+childrenIndex'>
                <a :href='"#"+children.name' class="menuHref">{{ children.name }}</a>
              </li>
            </ul>
          </li>
        </template>
      </template>
    </div>
    <div class="common" ref="commonRef">
      <div class="commonDiv">
        <template v-for='(item, index) in details'>
          <div :key='"details"+index'>
            <li :id='item.name'>
              <a :href='"#"+item.name' class="menuHref commonTitle">{{ item.name }}</a>
            </li>
            <p><code class="codeFunc">{{ item.funcUsed }}</code>{{ item.explain }}</p>
            <h4 v-show="item.param.length!==0">参数：</h4>
            <template v-for='(paramItem, paramIndex) in item.param'>
              <p :key='"details"+index+"param"+paramIndex' style="padding-left: 15px">
                <strong style='color: red'>{{ paramItem.name }}</strong><br>
                <span>类型：{{ paramItem.type }}</span><br>
                <span>必填：{{ paramItem.require }}</span><br>
                <span>描述：{{ paramItem.detail }}</span>
              </p>
            </template>
            <div v-show="item.demo!==''">
              <h4>例如：</h4>
              <div v-show='itemId===0'>
                <pre class="demoPre">
                  <code contenteditable='true' ref="codeRef">{{ item.demo }}</code>
                </pre>
                <pre v-show='jsResultPre' ref="tryRef">
                  <code ref='tryResultRef'></code>
                </pre>
                <button @click='jsTryExample(index)'>试一试</button>
              </div>
              <div v-show='itemId===1'>
                <pre>
                  <code>{{ item.template }}</code>
                </pre>
                <pre class="demoPre">
                  <code contenteditable='true' ref="tagCodeRef">{{ item.demo }}</code>
                </pre>
                <div v-if="showInput" >
                  <cg-input
                    :label = "input.label"
                    :id = "input.id"
                    :type = "input.type"
                    :readonly = "input.readonly"
                    :size = "input.size"
                    :cols = "input.cols"
                    :rows = "input.rows"
                    :placeholder = "input.placeholder"
                    :emptyisnull = "input.emptyisnull"
                    :required = "input.required"
                    :validparam = "input.validparam"
                  >
                  </cg-input>
                </div>
                <div v-if="showSwitch" >
                  <cg-switch
                    :label = "switchConfig.label"
                    :readonly = "switchConfig.readOnly"
                    v-model = 'data.switch'
                  >
                  </cg-switch>
                </div>
                <div v-if="showCheckbox" >
                  <cg-checkbox
                    :label = "checkbox.label"
                    :id = "checkbox.id"
                    :readonly = "checkbox.readOnly"
                    :required = "checkbox.required"
                    :emptyisnull = "checkbox.emptyIsNull"
                    :keyname = "checkbox.keyName"
                    :showname = "checkbox.showName"
                    :list = "checkbox.list"
                    :showfunc = "checkbox.showFunc"
                    :selectnum = "checkbox.selectNum"
                    :titlestyle = "checkbox.titleStyle"
                    :showstyle = "checkbox.showStyle"
                    v-model = "data.checkbox"
                  >
                  </cg-checkbox>
                </div>
                <div v-if="showSelect" >
                  <cg-select
                    :label = "select.label"
                    :id = "select.id"
                    :readonly = "select.readOnly"
                    :required = "select.required"
                    :emptyisnull = "select.emptyIsNull"
                    :keyname = "select.keyName"
                    :showname = "select.showName"
                    :list = "select.list"
                    :showfunc = "select.showFunc"
                    :filter = "select.filter"
                    :filterignore = "select.filterIgnore"
                    :filterplaceholder = "select.filterPlaceholder"
                    :emptylabel = "select.emptyLabel"
                    :selectnum = "select.selectNum"
                    :separator = "select.separator"
                    :titlestyle = "select.titleStyle"
                    v-model = "data.select"
                  >
                  </cg-select>
                </div>
                <div v-if="showUploadify" >
                  <cg-uploadify
                    :type = "uploadify.type"
                    :id = "uploadify.id"
                    :readonly = "uploadify.readOnly"
                    :candelete = "uploadify.canDelete"
                    :required = "uploadify.required"
                    :emptyisnull = "uploadify.emptyIsNull"
                    :prefix = "uploadify.prefix"
                    :filenum = "uploadify.fileNum"
                    :maxsize = "uploadify.maxSize"
                    :errorimage = "uploadify.errorImage"
                    :defaultimage = "uploadify.defaultImage"
                    :loadingimage = "uploadify.loadingImage"
                    v-model = "data.uploadify"
                  >
                  </cg-uploadify>
                </div>
                <div v-if="showButton" >
                  <cg-button
                    :className = "button.className"
                    :label = "button.label"
                    :readonly = "button.readOnly"
                    :buttonclick = "button.buttonClick"
                  >
                  </cg-button>
                </div>
                <div v-if="showPagelist" >
                  <cg-pagelist
                    :page = "pagelist.page"
                    :initorder = "pagelist.initOrder"
                    :list = "pagelist.list"
                    :titleconfig = "pagelist.titleConfig"
                    :showcheckbox = "pagelist.showCheckBox"
                    :loadfunction = "pagelist.loadFunction"
                    :rowclickfunction = "pagelist.rowClickFunction"
                    v-model= "data.pagelist"
                  >
                  </cg-pagelist>
                </div>
                <div v-if="showScolllist" >
                  <cg-scolllist
                    :list = "scolllist.list"
                    :titleconfig = "scolllist.titleConfig"
                    :loadfunction = "scolllist.loadFunction"
                    :rowclickfunction = "scolllist.rowClickFunction"
                  >
                  </cg-scolllist>
                </div>
                <div v-if="showTab" >
                  <cg-tab :tabconfig="tab.tabConfig">
                    <template slot-scope="slotProps">
                      <span v-if='slotProps.activeTab.id==1'>
                        这是第一个
                      </span>
                      <span v-if='slotProps.activeTab.id==2'>
                        这是第二个
                      </span>
                    </template>
                  </cg-tab>
                </div>
                <div v-if="showTree" >
                  <cg-tree
                    :showname="tree.showName"
                    :childname="tree.childName"
                    :showfunc="tree.showFunc"
                    :list="tree.list"
                    :onselected="tree.onSelected"
                    :onextend="tree.onExtend"
                    :filter="tree.filter"
                    :filterignore="tree.filterIgnore"
                    :filterplaceholder="tree.filterPlaceholder"
                  >
                  </cg-tree>
                </div>
                <button @click='tagTryExample(item.name)' style="margin-top: 2rem">试一试</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from './utils/Utils'
export default {
  name: 'Api',
  data () {
    return {
      details: '',
      showDetailMenu: false,
      jsResultPre: false,
      tagResultDiv: false,
      itemId: 0, // 一级菜单id (封装方法，自定义标签)
      childId: 0, // 二级子菜单id （常用操作，INPUT 等等...）
      childrenId: '', // 三级子菜单id （Cg.Utils.getRecordValue 等等...）
      showCheckbox: false,
      showSelect: false,
      showButton: false,
      showPagelist: false,
      showScolllist: false,
      showTab: false,
      showTree: false,
      showUploadify: false,
      showSwitch: false,
      showInput: false,
      input: {
        label: 'input',
        id: 'input',
        type: 'text',
        readonly: false,
        size: 'default',
        cols: null,
        rows: 2,
        placeholder: '',
        emptyisnull: false,
        required: false,
        validparam: {
          min: null,
          max: null,
          minlength: null,
          maxlength: null,
          validFunc: null,
          errorMsg: ''
        }
      },
      switchConfig: {
        label: 'switchConfig',
        readOnly: false
      },
      uploadify: {
        id: 'uploadifyId',
        label: 'uploadify',
        type: 'image',
        prefix: 'Test',
        fileNum: 0,
        maxSize: 0,
        required: false,
        readOnly: false,
        canDelete: true,
        emptyIsNull: true
      },
      tree: {
        showName: 'name',
        childName: 'child',
        showFunc: null,
        list: [],
        onSelected: null,
        onExtend: null,
        filter: false,
        filterIgnore: true,
        filterPlaceholder: '请选择'
      },
      tab: {
        tabConfig: []
      },
      button: {
        className: '',
        label: 'button',
        readOnly: false,
        buttonClick: null
      },
      checkbox: {
        id: 'checkbox',
        label: '',
        readOnly: false,
        required: false,
        emptyIsNull: true,
        keyName: 'id',
        showName: 'name',
        list: null,
        showFunc: null,
        selectNum: 1,
        titleStyle: 0,
        showStyle: 0
      },
      select: {
        id: 'select',
        label: '',
        readOnly: false,
        required: false,
        emptyIsNull: true,
        keyName: 'id',
        showName: 'name',
        showFunc: null,
        list: [],
        filter: false,
        filterIgnore: true,
        filterPlaceholder: '请输入关键字',
        emptyLabel: '请选择',
        separator: ',',
        selectNum: 1,
        titleStyle: 0
      },
      scolllist: {
        list: [],
        titleConfig: [],
        loadFunction: null,
        rowClickFunction: null
      },
      pagelist: {
        page: {
          pageSize: 20,
          pageNo: 1,
          totalNum: 0
        },
        initOrder: {
          keyName: '',
          orderBy: ''
        },
        list: [],
        titleConfig: [],
        showCheckBox: true,
        loadFunction: null,
        rowClickFunction: null,
        pagelist: []
      },
      data: {
        checkbox: null,
        select: null,
        uploadify: null,
        switch: false
      }
    }
  },
  mounted () {
    this.$refs.detailMenuRef[this.childId].style.display = ''
    this.details = this.ApiData[this.itemId].child[this.childId].children
    this.$refs.menuBtnRef[this.childId].style.color = '#e96900'
  },
  methods: {
    // 菜单切换
    changeData: function (itemId, childId, e) {
      this.itemId = itemId
      this.childId = childId
      this.$refs.commonRef.scrollTo(0, 0) // 滚动条置于最顶端
      this.details = this.ApiData[itemId].child[childId].children // 更新datails数据
      this.$refs.detailMenuRef.forEach((ev) => { // 隐藏全部子菜单
        ev.style.display = 'none'
      })
      e.currentTarget.nextElementSibling.style = true
      this.$refs.menuBtnRef.forEach((ev) => { // 菜单选中状态
        ev.style.color = ''
      })
      e.currentTarget.style.color = '#e96900'
      if (itemId !== 0) {
        this.$refs.detailMenuRef.forEach((ev) => {
          ev.style.display = 'none'
        })
      }
      this.$refs.tryRef.forEach((ev) => { // 试一试 结果pre隐藏
        ev.style.display = 'none'
      })
      this.showCheckbox = false
      this.showSelect = false
      this.showButton = false
      this.showPagelist = false
      this.showScolllist = false
      this.showTab = false
      this.showTree = false
      this.showUploadify = false
      this.showSwitch = false
      this.showInput = false
    },
    // js试一试
    jsTryExample (childrenIndex) {
      this.childrenId = childrenIndex
      this.$refs.tryRef[this.childrenId].style.display = '' // js试一试 结果pre显示
      this.printResult(eval(this.$refs.codeRef[this.childrenId].innerText.replace(/printResult/g,'')))
    },
    // 组件试一试
    tagTryExample (tag) {
      if (tag === '<cg-input></cg-input>') {
        this.showInput = true
        Utils.mergeObject(this.input, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-switch></cg-switch>') {
        this.showSwitch = true
        Utils.mergeObject(this.switchConfig, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-checkbox></cg-checkbox>') {
        this.showCheckbox = true
        Utils.mergeObject(this.checkbox, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-select></cg-select>') {
        this.showSelect = true
        Utils.mergeObject(this.select, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-uploadify></cg-uploadify>') {
        this.showUploadify = true
        Utils.mergeObject(this.uploadify, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-button></cg-button>') {
        this.showButton = true
        Utils.mergeObject(this.button, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-pagelist></cg-pagelist>') {
        this.showPagelist = true
        Utils.mergeObject(this.pagelist, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-scolllist></cg-scolllist>') {
        this.showScolllist = true
        Utils.mergeObject(this.scolllist, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-tab></cg-tab>') {
        this.showTab = true
        Utils.mergeObject(this.tab, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      } else if (tag === '<cg-tree></cg-tree>') {
        this.showTree = true
        Utils.mergeObject(this.tree, eval('(' + this.$refs.tagCodeRef[0].innerText + ')'), 'outer')
      }
    },
    // 输出结果
    printResult (result) {
      if (this.childId === 0) {
        this.$refs.tryResultRef[this.childrenId].innerText = JSON.stringify(result)
      } else {
        this.$refs.tryResultRef[this.childrenId].innerText = result
      }
    }
  }
}
</script>

<style scoped>
#content {
  display: flex;
  display: -webkit-flex; /* Safari */
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.menu {
  width: 24rem;
  padding: 2rem 1rem 5rem 2rem;
  border-right: solid 1px #dddddd;
  overflow-y: auto
}
ul{
  padding: 0.8rem 0
}
.menuBtn{
  border: 0;
  background-color: transparent;
  font-size: 1.4rem;
  padding: 0;
  text-align: left;
  font-weight: bold;
  outline: none;
  line-height: 2rem;
}
.menuBtn:focus{
  color: #e96900
}
li{
  line-height: 2rem;
  list-style: none;
}
pre code {
  display: block;
  overflow-x: auto;
  color: #525252;
  white-space: pre;
  padding: 0rem 0.8rem;
  line-height: 2rem;
  font-size: 1.4rem;
  outline: none
}
.menuHref{
  color: #4f5959;
  text-decoration: none
}
.common{
  flex: auto;
  overflow-y: auto;
}
.commonDiv{
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px 50px 20px
}
.codeFunc{
  background: #f5f5f5;
  color: #d63200;
  padding: 3px 5px;
  margin: 0 2px;
  border-radius: 2px;
  white-space: nowrap;
}
.commonTitle{
  line-height: 100px;
  color: #e96900;
  font-size: 25px
}
.commonTitle::after{
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-bottom: 2rem;
}
p{
  line-height: 2rem;
  margin-bottom: 1rem
}
.demoPre{
  border: solid 1px black;
  background-color: transparent;
  border-radius: 5px;
}
.demoPre code {
  background-color: transparent;
}
</style>

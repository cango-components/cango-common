<template>
  <div>
    <div v-if="viewMain" class="cg-auto__left">
      <cg-tree
        :keyname="'treeId'"
        :list="left.leftTreeList"
        :onselected="leftTreeSelected"
        :filter="true"
      >
      </cg-tree>
    </div>
    <div v-if="viewMain" class="cg-auto__right">
      <div>
        <cg-button
          :label = '"新增顶级节点"'
          :buttonclick = 'addTreeMainView'
        >
        </cg-button>
        <cg-button
          :label = '"新增子节点"'
          :buttonclick = 'addTreeView'
        >
        </cg-button>
        <cg-button
          :label = '"编辑节点"'
          :buttonclick = 'editTreeView'
        >
        </cg-button>
        <cg-button
          :label = '"删除节点"'
          :buttonclick = 'deleteTreeRecord'
        >
        </cg-button>

        <cg-button
          :label = '"新增明细"'
          :buttonclick = 'addTreeLeafView'
        >
        </cg-button>

        <cg-button
          :label = '"删除明细"'
          :buttonclick = 'deleteTreeLeaf'
        >
        </cg-button>
      </div>
      <cg-pagelist
        :titleconfig="right.rightPageListTitle"
        :list="right.list"
        :page="right.page"
        :filter="true"
        :loadfunction="freshRightPageList"
        :rowclickfunction="editTreeLeafView"
        v-model= "right.selectlist"
      >
      </cg-pagelist>
    </div>
    <div v-if="viewTreeEdit" class="cg-auto__tree_edit">
      <cg-input
        :label = '"名称"'
        :required = "true"
        :validparam = "{maxlength: 60}"
        v-model = 'editTreeData.name'
      >
      </cg-input>
      <cg-button
        :label = '"保存"'
        :buttonclick = 'updateTree'
      >
      </cg-button>
      <cg-button
        :label = '"返回"'
        :buttonclick = 'backTree'
      >
      </cg-button>
    </div>
    <div v-if="viewEdit" class="cg-auto__record_edit">
      <div v-if="!editData.leafId" >
        <cg-input
          :label = '"名称"'
          :required = "true"
          :validparam = "{maxlength: 60}"
          v-model = 'editData.name'
        >
        </cg-input>
        <cg-button
          :label = '"保存"'
          :buttonclick = 'updateRecord'
        >
        </cg-button>
        <cg-button
          :label = '"返回"'
          :buttonclick = 'backTree'
        >
        </cg-button>
      </div>
      <div v-else >
        <cg-tab
          :tabconfig="[{ name: '基本信息', id: 1 },{ name: '明细信息', id: 2 },{ name: '预览', id: 3 },{ name: '源码', id: 4 }]"
        >
          <template slot-scope="slotProps">
            <span v-show='slotProps.activeTab.id==1'>
              <cg-input
                :label = '"名称"'
                :required = "true"
                :validparam = "{maxlength: 60}"
                v-model = 'editData.name'
              >
              </cg-input>
              <cg-button
                :label = '"保存"'
                :buttonclick = 'updateRecord'
              >
              </cg-button>
              <cg-button
                :label = '"返回"'
                :buttonclick = 'backTree'
              >
              </cg-button>
            </span>
            <span v-show='slotProps.activeTab.id==2'>
              <template v-if='viewDetailEdit'>
                <cg-select
                  :label = '"类型"'
                  :required = "true"
                  :list="[
                    {id: 'text',      name: 'text'},
                    {id: 'textarea',  name: 'textarea'},
                    {id: 'password',  name: 'password'},
                    {id: 'select',    name: 'select'},
                    {id: 'checkbox',  name: 'checkbox'},
                    {id: 'switch',    name: 'switch'},
                    {id: 'file',      name: 'file'},
                    {id: 'image',     name: 'image'},
                    {id: 'button',    name: 'button'},
                    {id: 'blank',     name: '换行'}
                  ]"
                  v-model="detail.type"
                >
                </cg-select>
                <cg-input
                  :label = '"排序"'
                  :type = '"text"'
                  :required = "true"
                  v-model="detail.orderId"
                >
                </cg-input>
                <template v-if="detail.type !== 'blank'">
                  <cg-input
                    :label = '"name"'
                    :type = '"text"'
                    :required = "true"
                    :validparam = "{maxlength: 60}"
                    v-model="detail.name"
                  >
                  </cg-input>
                  <cg-input
                    :label = '"标题"'
                    :type = '"text"'
                    :required = "true"
                    :validparam = "{maxlength: 60}"
                    v-model="detail.label"
                  >
                  </cg-input>
                  <cg-select
                    v-if="detail.type !== 'button'"
                    :label = '"是否必填"'
                    :required = "true"
                    :list="[
                      {id: 1,  name: '是'},
                      {id: 0,  name: '否'}
                    ]"
                    v-model="detail.required"
                  >
                  </cg-select>
                  <cg-select
                    :label = '"是否只读"'
                    :required = "true"
                    :list="[
                      {id: 1,  name: '是'},
                      {id: 0,  name: '否'}
                    ]"
                    v-model="detail.readonly"
                  >
                  </cg-select>
                  <template v-if="detail.type === 'text' || detail.type === 'password'">
                    <cg-input
                      :label = '"最小值"'
                      :type = '"text"'
                      v-model="detail.min"
                    >
                    </cg-input>
                    <cg-input
                      :label = '"最大值"'
                      :type = '"text"'
                      v-model="detail.max"
                    >
                    </cg-input>
                  </template>
                  <template v-if="detail.type === 'text' || detail.type === 'password' || detail.type === 'textarea'">
                    <cg-input
                      :label = '"最小长度"'
                      :type = '"text"'
                      v-model="detail.minlength"
                    >
                    </cg-input>
                    <cg-input
                      :label = '"最大长度"'
                      :type = '"text"'
                      v-model="detail.maxlength"
                    >
                    </cg-input>
                  </template>
                  <template v-if="detail.type === 'checkbox' || detail.type === 'select'">
                    <cg-input
                      :label = '"最多选中数量(0:为不限制;1:为单选;)"'
                      :type = '"text"'
                      v-model="detail.selectnum"
                    >
                    </cg-input>
                    <cg-input
                      :label = '"候选项(逗号分隔)"'
                      :type = '"text"'
                      v-model="detail.list"
                    >
                    </cg-input>
                  </template>
                  <template v-if="detail.type === 'image'">
                    <cg-input
                      :label = '"最大KB数"'
                      :type = '"text"'
                      v-model="detail.maxsize"
                    >
                    </cg-input>
                  </template>
                  <template v-if="detail.type === 'image' || detail.type === 'file'">
                    <cg-input
                      :label = '"文件数量"'
                      :type = '"text"'
                      v-model="detail.filenum"
                    >
                    </cg-input>
                    <cg-select
                      :label = '"可以删除"'
                      :required = "true"
                      :list="[
                        {id: '1',  name: '是'},
                        {id: '0',  name: '否'}
                      ]"
                      v-model="detail.candelete"
                    >
                    </cg-select>
                  </template>
                  <cg-input
                    :label = '"宽度"'
                    :type = '"text"'
                    v-model="detail.width"
                  >
                  </cg-input>
                  <cg-input
                    :label = '"备注"'
                    :type = '"textarea"'
                    v-model="detail.memo"
                  >
                  </cg-input>
                </template>
                <cg-button
                  :label = '"保存"'
                  :buttonclick = 'updateDetail'
                >
                </cg-button>
                <cg-button
                  :label = '"返回"'
                  :buttonclick = 'backLeaf'
                >
                </cg-button>
              </template>
              <template v-else>
                <div>
                  <cg-button
                    :label = '"新增明细"'
                    :buttonclick = 'addDetailView'
                  >
                  </cg-button>
                  <cg-button
                    :label = '"删除明细"'
                    :buttonclick = 'deleteDetailLeaf'
                  >
                  </cg-button>
                </div>
                <cg-pagelist
                  :titleconfig="detailList.editDetailPageList"
                  :list="detailList.list"
                  :page="detailList.page"
                  :filter="true"
                  :loadfunction="freshDetailPageList"
                  :rowclickfunction="editDetailView"
                  v-model= "detailList.selectlist"
                >
                </cg-pagelist>
              </template>
            </span>
            <span v-show='slotProps.activeTab.id==3'>
              <div id="preview">
              </div>
            </span>
            <span v-show='slotProps.activeTab.id==4'>
              HTML:
              <textarea id="html" style="width:100%" rows = 10></textarea>
              SCRIPT:
              <textarea id="script" style="width:100%" rows = 10></textarea>
            </span>
          </template>
        </cg-tab>

      </div>
    </div>
  </div>
</template>
<style>
.cg-auto__left {
  width: 29%;
  float: left;
}
.cg-auto__right {
  width: 70%;
  float: right;
}
.cg-auto__tree_edit {
  width: 80%;
}
</style>
<script>
import axios from 'axios'
import Vue from 'vue'
import Utils from './utils/Utils'
var srcDetail = {
  label: '',
  type: null,
  leafId: null,
  detailId: null,
  name: '',
  readonly: 0,
  required: 0,
  min: null,
  max: null,
  minlength: null,
  maxlength: null,
  selectnum: 1,
  filenum: 1,
  maxsize: 0,
  list: '',
  candelete: 1,
  width: 100,
  orderId: 1,
  memo: ''
}
export default {
  name: 'auto',
  data: function () {
    return {
      detailList: {
        selectlist: [],
        editDetailPageList: [
          {label: '标题', keyName: 'label'},
          {label: 'name', keyName: 'name'},
          {label: '类型', keyName: 'type'}
        ],
        list: [],
        page: {
          pageSize: 20,
          pageNo: 1,
          totalNum: 0
        }
      },
      detail: Utils.clone(srcDetail),
      viewMain: true,
      viewTreeEdit: false,
      viewEdit: false,
      viewDetailEdit: false,
      selectId: '',
      selectName: '',
      left: {
        leftTreeList: []
      },
      right: {
        selectlist: [],
        rightPageListTitle: [
          {label: 'ID', keyName: 'leafId'},
          {label: '名称', keyName: 'name'}
        ],
        list: [],
        page: {
          pageSize: 20,
          pageNo: 1,
          totalNum: 0
        }
      },
      editTreeData: {
        treeId: null,
        parentId: null,
        name: ''
      },
      editData: {
        treeId: null,
        leafId: null,
        name: ''
      }
    }
  },
  created: function () {
    // 树图数据初始化
    this.freshLeftTree()
  },
  methods: {
    createDemo: function () {
      let self = this
      if (self.detailList.list && self.detailList.list.length > 0) {
        let html = '<cg-form ref = "form" >\r\n'
        let data = {}
        data.formValue = {}
        data.elements = {}
        for (let i = 0; i < self.detailList.list.length; i++) {
          let ele = self.detailList.list[i]
          data.elements[ele.name] = {}
          data.formValue[ele.name] = null
          if (ele.type === 'blank') {
            html += '<div style="clear:both"></div>\r\n'
          } else {
            html += `  <div style = "width:` + ele.width + `%;float:left;">\r\n`
            if (ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') {
              html += `  <cg-input :type="'` + ele.type + `'"\r\n`
            } else if (ele.type === 'file' || ele.type === 'image') {
              html += `  <cg-uploadify :type="'` + ele.type + `'"\r\n`
            } else {
              html += `  <cg-` + ele.type + ` \r\n`
            }
            html += `    v-model = 'formValue.` + ele.name + `'\r\n`
            if (ele.label !== '') {
              html += `    :label = 'elements.` + ele.name + `.label'\r\n`
              data.elements[ele.name]['label'] = ele.label
            }
            if (ele.readonly === 1) {
              html += `    :readonly = 'elements.` + ele.name + `.readonly'\r\n`
              data.elements[ele.name]['readonly'] = true
            }
            if (ele.required === 1) {
              html += `    :required = 'elements.` + ele.name + `.required'\r\n`
              data.elements[ele.name]['required'] = true
            }
            if (ele.candelete === 0) {
              html += `    :candelete = 'elements.` + ele.name + `.candelete'\r\n`
              data.elements[ele.name]['candelete'] = false
            }
            if (ele.type === 'select' && ele.selectnum !== 1) {
              html += `    :selectnum = 'elements.` + ele.name + `.selectnum'\r\n`
              data.elements[ele.name]['selectnum'] = ele.selectnum
            }
            if ((ele.type === 'file' || ele.type === 'image') && ele.filenum !== 1) {
              html += `    :filenum = 'elements.` + ele.name + `.filenum'\r\n`
              data.elements[ele.name]['filenum'] = ele.filenum
            }
            if ((ele.type === 'image') && ele.maxsize !== 0) {
              html += `    :maxsize = 'elements.` + ele.name + `.maxsize'\r\n`
              data.elements[ele.name]['maxsize'] = ele.maxsize
            }
            if ((ele.type === 'checkbox' || ele.type === 'select') && ele.list !== '') {
              let list = ele.list.split(',')
              let listConfig = []
              for (let k = 0; k < list.length; k++) {
                listConfig.push({id: list[k], name: list[k]})
              }
              html += `    :list = 'elements.` + ele.name + `.list'\r\n`
              data.elements[ele.name]['list'] = listConfig
            }
            let validParam = null
            if ((ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') && ele.min !== null && ele.min !== undefined && ele.min !== '') {
              if (validParam === null) {
                validParam = {}
              }
              validParam['min'] = ele.min
            }
            if ((ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') && ele.max !== null && ele.max !== undefined && ele.max !== '') {
              if (validParam === null) {
                validParam = {}
              }
              validParam['max'] = ele.max
            }
            if ((ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') && ele.minlength !== null && ele.minlength !== undefined && ele.minlength !== '') {
              if (validParam === null) {
                validParam = {}
              }
              validParam['minlength'] = ele.min
            }
            if ((ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') && ele.maxlength !== null && ele.maxlength !== undefined && ele.maxlength !== '') {
              if (validParam === null) {
                validParam = {}
              }
              validParam['maxlength'] = ele.maxlength
            }
            if (validParam !== null) {
              html += `    :validParam = 'elements.` + ele.name + `.validParam'\r\n`
              data.elements[ele.name]['validParam'] = validParam
            }
            if (ele.type === 'text' || ele.type === 'textarea' || ele.type === 'password') {
              html += `  >\r\n`
              html += `  </cg-input>\r\n`
            } else if (ele.type === 'file' || ele.type === 'image') {
              html += `  >\r\n`
              html += `  </cg-uploadify>\r\n`
            } else {
              html += `  >\r\n`
              html += `  </cg-` + ele.type + `>\r\n`
            }
            html += `  </div>\r\n`
          }
        }
        html += '</cg-form>\r\n'
        document.getElementById('preview').innerHTML = html
        document.getElementById('html').value = html
        document.getElementById('script').value = Utils.formatJson(data)
        let demo = new Vue({
          el: '#preview',
          data: data
        })
        console.log(html)
        console.log(data)
        console.log(demo)
      } else {
        document.getElementById('html').innerHTML = ''
        document.getElementById('script').innerHTML = ''
        document.getElementById('preview').innerHTML = ''
      }
    },
    updateDetail: function () {
      let self = this
      self.detail.leafId = this.editData.leafId
      // 新增修改
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeafDetail/edit',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entity: self.detail
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.viewDetailEdit = false
          self.freshDetailPageList(self.detailList.page, null)
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    backLeaf: function () {
      this.viewDetailEdit = false
    },
    addDetailView: function () {
      let self = this
      this.viewDetailEdit = true
      Utils.mergeObject(self.detail, srcDetail, 'right')
    },
    editDetailView: function (record) {
      let self = this
      this.viewDetailEdit = true
      Utils.mergeObject(self.detail, srcDetail, 'right')
      Utils.mergeObject(self.detail, record, 'left')
    },
    deleteDetailLeaf: function () {
      let self = this
      if (!self.detailList.selectlist || self.detailList.selectlist.length === 0) {
        alert('未选中记录')
        return
      }
      if (!confirm('是否确认勾选的记录')) {
        return
      }
      // 删除
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeafDetail/delete',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entityList: self.detailList.selectlist
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.freshDetailPageList(self.detailList.page, null)
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    freshDetailPageList: function (page, order) {
      let self = this
      // 文件打包功能
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeafDetail/findPage',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          page: page,
          entity: {
            leafId: this.editData.leafId
          }
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          if (response.data.result) {
            self.detailList.page.totalNum = response.data.result.page.totalRow
            self.detailList.page.pageSize = response.data.result.page.pageSize
            self.detailList.page.pageNo = response.data.result.page.pageNo
            Utils.mergeObject(self.detailList.list, response.data.result.result)
          }
        } else {
          console.log(response)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    addTreeLeafView: function () {
      this.viewMain = false
      this.viewEdit = true
      this.editData.treeId = this.selectId
      this.editData.leafId = null
      this.editData.name = ''
    },
    editTreeLeafView: function (record) {
      this.viewMain = false
      this.viewEdit = true
      this.editData.treeId = record.treeId
      this.editData.leafId = record.leafId
      this.editData.name = record.name
      this.viewDetailEdit = false
      this.freshDetailPageList({
        pageSize: 20,
        pageNo: 1,
        totalNum: 0
      }, null)
    },
    deleteTreeLeaf: function () {
      let self = this
      if (!self.right.selectlist || self.right.selectlist.length === 0) {
        alert('未选中记录')
        return
      }
      if (!confirm('是否确认勾选的记录')) {
        return
      }
      // 删除
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeaf/delete',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entityList: self.right.selectlist
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.freshRightPageList(self.right.page, null)
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateRecord: function () {
      let self = this
      // 新增修改
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeaf/edit',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entity: self.editData
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.viewMain = true
          self.viewEdit = false
          self.freshRightPageList(self.right.page, null)
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    addTreeMainView: function () {
      this.viewMain = false
      this.viewTreeEdit = true
      this.editTreeData.treeId = null
      this.editTreeData.parentId = null
      this.editTreeData.name = ''
    },
    addTreeView: function () {
      this.viewMain = false
      this.viewTreeEdit = true
      this.editTreeData.treeId = null
      this.editTreeData.parentId = this.selectId
      this.editTreeData.name = ''
    },
    editTreeView: function () {
      this.viewMain = false
      this.viewTreeEdit = true
      this.editTreeData.treeId = this.selectId
      this.editTreeData.parentId = null
      this.editTreeData.name = this.selectName
    },
    deleteTreeRecord: function () {
      let self = this
      if (!confirm('是否确认删除选中树图节点')) {
        return
      }
      // 删除
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTree/delete',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entity: {
            treeId: self.selectId
          }
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.freshLeftTree()
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    backTree: function () {
      this.viewMain = true
      this.viewTreeEdit = false
      this.viewEdit = false
    },
    updateTree: function () {
      let self = this
      // 新增修改
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTree/edit',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          entity: self.editTreeData
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          self.viewMain = true
          self.viewTreeEdit = false
          self.freshLeftTree()
        } else {
          alert('错误')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    leftTreeSelected: function (record) {
      let treeId = record.treeId
      if (treeId !== this.selectId) {
        this.selectId = treeId
        this.selectName = record.name
        this.freshRightPageList({
          pageSize: 20,
          pageNo: 1,
          totalNum: 0
        }, null)
      }
    },
    freshLeftTree: function () {
      let self = this
      // 文件打包功能
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTree/findAllTree',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          if (response.data.result) {
            Utils.mergeObject(self.left.leftTreeList, response.data.result, 'right')
            self.selectId = ''
            self.selectName = ''
          }
        } else {
          console.log(response)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    freshRightPageList: function (page, order) {
      let self = this
      // 文件打包功能
      axios({
        method: 'post',
        url: 'http://10.43.22.82:8888/pinkiepie/cangoAutoTreeLeaf/findPage',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          page: page,
          entity: {
            treeId: this.selectId
          }
        }
      }).then(function (response) {
        if (response && response.data && response.data.code === 200) {
          if (response.data.result) {
            self.right.page.totalNum = response.data.result.page.totalRow
            self.right.page.pageSize = response.data.result.page.pageSize
            self.right.page.pageNo = response.data.result.page.pageNo
            Utils.mergeObject(self.right.list, response.data.result.result)
          }
        } else {
          console.log(response)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    detailList: {
      handler: function (val, oldVal) {
        // 刷新视图和源码
        this.createDemo()
      },
      deep: true
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

<template>
  <div>
    <div v-if='show' id = 'testdemo' >
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
          :label = 'switchConfig.label'
          :readonly = 'switchConfig.readOnly'
          v-model = 'data.switch'
        >
        </cg-switch>
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
      <div v-if="showTab" >
        <cg-tab
          :tabconfig="tab.tabConfig"
        >
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
      <div v-if="showScolllist" >
        <cg-scolllist
          :list = "scolllist.list"
          :titleconfig = "scolllist.titleConfig"
          :loadfunction = "scolllist.loadFunction"
          :rowclickfunction = "scolllist.rowClickFunction"
        >
        </cg-scolllist>
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

      <div v-if="showButton" >
        <cg-button
          :className = "button.className"
          :label = "button.label"
          :readonly = "button.readOnly"
          :buttonclick = "button.buttonClick"
        >
        </cg-button>
      </div>
      <button @click = "returnMain()" >返回</button>
    </div>
    <div id = 'main' class="fix-sidebar">
      <div class="sidebar">
        <div class="sidebar-inner">
          <div class="list">
            <ul class="menu-root">
              <template v-for='(item, index) in apiDoc' >
                <li :key='"li"+index' >
                  <a class="section-link" v-bind:href='"#"+item.name'>{{ item.name }}</a>
                </li>
                <ul :key='"ul"+index' class="menu-sub">
                  <li v-for="(child, childIndex) in item.child" :key='"ulChild"+childIndex' ><a class="section-link" v-bind:href='"#"+child.name'>{{ child.name }}</a></li>
                </ul>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <div class="content api with-sidebar ">
        <template v-for='(item, index) in apiDoc' >
          <template v-for='(child, childIndex) in item.child' >
            <h3 :id='child.name' :key='"item"+index+"h3child"+childIndex'>
              <a :href='"#"+child.name' class="headerlink" >{{ child.name }}</a>
            </h3>
            <ul v-for='(func, funcIndex) in child.child' :key='"item"+index+"h3child"+childIndex+"func"+funcIndex'>
              <li>
                <p><strong>方法名</strong>：<code>{{ func.name }}</code></p>
              </li>
              <li>
                <p><strong>参数</strong>：</p>
                <template v-if='func.param' >
                  <template v-for='(param, paramIndex) in func.param' >
                    <p :key='"param"+paramIndex'>
                      <span style="color: #FF0000;">{{param.name}}</span>：<b>{{ param.type }}</b> <template v-if='param.default' >默认值: <b>{{ param.default }} </b></template><br>
                      说明：{{ param.detail }}
                    </p>
                  </template>
                </template>
              </li>
              <li v-if="func.return">
                <p><strong>返回值</strong>：</p>
                <p>{{ func.return.type }} <br>
                说明：{{ func.return.detail }}</p>
              </li>
              <li>
                <p><strong>说明</strong>：</p>
                <p>{{ func.detail }}</p>
              </li>

              <li v-if="!func.template">
                <p><strong>示例</strong>：</p>
                <p>
                  <textarea style="width:100%;font-size:16px;" rows = 5 v-model='func.demo'></textarea>
                  <button  @click = "tryTest(func.demo)" >亲自试一试</button>
                </p>
              </li>
              <li v-else>
                <p><strong>示例</strong>：</p>
                <p>
                  HTML：<textarea style="width:100%;font-size:16px;" readOnly = true rows = 5 v-model='func.template'></textarea>
                  JS：<textarea style="width:100%;font-size:16px;" rows = 5 v-model='func.demo'></textarea>
                  <button  @click = "tryTest2(child.name, func.demo)" >亲自试一试</button>
                </p>
              </li>
            </ul>
          </template>
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
      show: false,
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
        label: 'switch',
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
      },
      apiDoc: [
        {
          name: '方法',
          child: [
            {
              name: '常用操作',
              child: [
                {
                  name: 'Cg.Utils.getRecordValue(record, keyName, [defaultValue])',
                  param: [
                    {
                      name: 'record',
                      type: 'Object',
                      require: true,
                      detail: '数据源'
                    },
                    {
                      name: 'keyName',
                      type: 'String',
                      require: true,
                      detail: '需要获取的对象数据, "-"做分割进行深层次访问'
                    },
                    {
                      name: 'defaultValue',
                      type: 'Anything',
                      require: false,
                      detail: '默认值为空'
                    }
                  ],
                  return: {
                    type: 'Anything',
                    detail: '对应的值，如果不存在返回默认值'
                  },
                  demo: `let a = {a:1,b : {a:1}};\r\nlet b = {a:1};\r\nconsole.log(Cg.Utils.getRecordValue(a, "b-a"))`,
                  detail: '获取record对应的keyname的值，keyname进行"-"分割用于深层次访问，如果没有返回defaultValue'
                },
                {
                  name: 'Cg.Utils.isPlainObject(o)',
                  param: [
                    {
                      name: 'o',
                      type: 'Anything',
                      require: true,
                      detail: '对象'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否为Object'
                  },
                  demo: `let a = {a:1};\r\nlet b = 2;\r\nconsole.log(Cg.Utils.isPlainObject(a))`,
                  detail: '是否为object'
                },
                {
                  name: 'Cg.Utils.isArray(list)',
                  param: [
                    {
                      name: 'list',
                      type: 'Anything',
                      require: true,
                      detail: '数组'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否为数组'
                  },
                  demo: `let a = [{a:1}];\r\nlet b = {a:2};\r\nconsole.log(Cg.Utils.isArray(a))`,
                  detail: '是否为数组'
                },
                {
                  name: 'Cg.Utils.clone(o)',
                  param: [
                    {
                      name: 'o',
                      type: 'Anything',
                      require: true,
                      detail: '对象'
                    }
                  ],
                  return: {
                    type: 'Anything',
                    detail: '复制后的对象'
                  },
                  demo: `let a = {a:1};\r\nlet b = Cg.Utils.clone(a)\r\na.a = 2;\r\nconsole.log(a);\r\nconsole.log(b);`,
                  detail: '对象复制'
                },
                {
                  name: 'Cg.Utils.mergeObject(to, from, [mergeType])',
                  param: [
                    {
                      name: 'to',
                      type: 'Object || Array',
                      require: true,
                      detail: '目标数据'
                    },
                    {
                      name: 'from',
                      type: 'Object || Array',
                      require: true,
                      detail: '来源数据'
                    },
                    {
                      name: 'mergeType',
                      type: 'String',
                      require: false,
                      detail: '支持:left,right,outer,inner;默认left,类似db的join方式，以哪个为准，其中如果存在数组特殊处理'
                    }
                  ],
                  return: {
                    type: 'Object || Array',
                    detail: '合并后的对象'
                  },
                  demo: `let a = {a:1};\r\nlet b = {a:2,b:3};\r\nCg.Utils.mergeObject(a, b);\r\nconsole.log(a);`,
                  detail: '对象合并，以mergeType为准，其中数组的话，如果有demo数据，根据demo数据进行合并，如果没有demo，则按照right模式合并'
                },
                {
                  name: 'Cg.Utils.getFromRequest(key)',
                  param: [
                    {
                      name: 'key',
                      type: 'String'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '参数对应的值'
                  },
                  demo: `let name = Cg.Utils.getFromRequest("name");\r\nconsole.log(name);`,
                  detail: '获取get请求里面的指定参数'
                },
                {
                  name: 'Cg.Utils.linkUrl(url, params, [target])',
                  param: [
                    {
                      name: 'url',
                      type: 'String'
                    },
                    {
                      name: 'params',
                      type: 'Object'
                    },
                    {
                      name: 'target',
                      type: 'String'
                    }
                  ],
                  demo: `Cg.Utils.linkUrl("http://www.baidu.com", {id : "test"})`,
                  detail: '页面跳转，params里面对应的参数进行urlencode，target为"_blank"时在新窗口打开'
                },
                {
                  name: 'Cg.Utils.replaceUrl(url, params)',
                  param: [
                    {
                      name: 'url',
                      type: 'String'
                    },
                    {
                      name: 'params',
                      type: 'Object'
                    }
                  ],
                  demo: `Cg.Utils.replaceUrl("http://www.baidu.com", {id : "test"})`,
                  detail: '页面跳转，params里面对应的参数进行urlencode，逻辑同linkUrl，只是具有历史替换功能'
                },
                {
                  name: 'Cg.Utils.guid()',
                  param: [
                  ],
                  demo: `console.log(Cg.Utils.guid())`,
                  detail: '生成GUID'
                }
              ]
            },
            {
              name: '日期操作',
              child: [
                {
                  name: 'Cg.DateUtils.strToDate(str, [dateFormat])',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    },
                    {
                      name: 'dateFormat',
                      type: 'String',
                      require: false,
                      detail: '日期格式,默认"yyyy-MM-dd HH:mm:ss"'
                    }
                  ],
                  return: {
                    type: 'Date',
                    detail: '字符串转日期的结果'
                  },
                  demo: `let d = Cg.DateUtils.strToDate("2018-01-01 11:11:11", "yyyy-MM-dd HH:mm:ss");\r\nconsole.log(d);`,
                  detail: '将字符串根据日期格式进行字符串日期转换'
                },
                {
                  name: 'Cg.DateUtils.format(date, formatStr)',
                  param: [
                    {
                      name: 'date',
                      type: 'Date',
                      require: true,
                      detail: '日期对象'
                    },
                    {
                      name: 'formatStr',
                      type: 'String',
                      require: true,
                      detail: '日期格式'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '日期转字符串的结果'
                  },
                  demo: `let d = Cg.DateUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");\r\nconsole.log(d);`,
                  detail: '将日期根据日期格式进行字符串转换'
                },
                {
                  name: 'Cg.DateUtils.getWeekStartDate(srcDate, [n])',
                  param: [
                    {
                      name: 'srcDate',
                      type: 'Date',
                      require: true,
                      detail: '日期对象'
                    },
                    {
                      name: 'n',
                      type: 'Int',
                      require: false,
                      detail: '未来第几周'
                    }
                  ],
                  return: {
                    type: 'Date',
                    detail: '周一对应的日期'
                  },
                  demo: `let d = Cg.DateUtils.getWeekStartDate(new Date());\r\nconsole.log(d);`,
                  detail: '获取指定日期过去或未来第n周的周一(n=0为当周)'
                },
                {
                  name: 'Cg.DateUtils.getWeekEndDate(srcDate, [n])',
                  param: [
                    {
                      name: 'srcDate',
                      type: 'Date',
                      require: true,
                      detail: '日期对象'
                    },
                    {
                      name: 'n',
                      type: 'Int',
                      require: false,
                      detail: '未来第几周'
                    }
                  ],
                  return: {
                    type: 'Date',
                    detail: '周日对应的日期'
                  },
                  demo: `let d = Cg.DateUtils.getWeekEndDate(new Date());\r\nconsole.log(d);`,
                  detail: '获取指定日期过去或未来第n周的周日(n=0为当周)'
                },
                {
                  name: 'Cg.DateUtils.getDayOfWeek(date, [preStr])',
                  param: [
                    {
                      name: 'date',
                      type: 'Date',
                      require: true,
                      detail: '日期对象'
                    },
                    {
                      name: 'preStr',
                      type: 'String',
                      require: false,
                      detail: '前置字符串，默认"周"'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '周几字符串'
                  },
                  demo: `let d = Cg.DateUtils.getDayOfWeek(new Date());\r\nconsole.log(d);`,
                  detail: '获取指定日期为周几'
                },
                {
                  name: 'Cg.DateUtils.getCurrentMonth()',
                  param: [
                  ],
                  return: {
                    type: 'Date',
                    detail: '当前月'
                  },
                  demo: `let d = Cg.DateUtils.getCurrentMonth();\r\nconsole.log(d);`,
                  detail: '获取当前月'
                },
                {
                  name: 'Cg.DateUtils.getPrevMonth()',
                  param: [
                  ],
                  return: {
                    type: 'Date',
                    detail: '上个月份'
                  },
                  demo: `let d = Cg.DateUtils.getPrevMonth();\r\nconsole.log(d);`,
                  detail: '获取上个月份'
                },
                {
                  name: 'Cg.DateUtils.getNextMonth()',
                  param: [
                  ],
                  return: {
                    type: 'Date',
                    detail: '下个月份'
                  },
                  demo: `let d = Cg.DateUtils.getNextMonth();\r\nconsole.log(d);`,
                  detail: '获取下个月份'
                }
              ]
            },
            {
              name: '数字操作',
              child: [
                {
                  name: 'Cg.NumberUtils.percent(mumerator, denominator, num)',
                  param: [
                    {
                      name: 'mumerator',
                      type: 'Number',
                      require: true,
                      detail: '分子'
                    },
                    {
                      name: 'denominator',
                      type: 'Number',
                      require: true,
                      detail: '分母'
                    },
                    {
                      name: 'num',
                      type: 'int',
                      require: false,
                      detail: '小数点后有效位数'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '百分比结果'
                  },
                  demo: `let d = Cg.NumberUtils.percent(1, 3, 1);\r\nconsole.log(d);`,
                  detail: '获取对应的分子/分母，将结果进行百分比转换，同时保留小数点后的有效位数'
                },
                {
                  name: 'Cg.NumberUtils.percentNoSymbol(mumerator, denominator, num)',
                  param: [
                    {
                      name: 'mumerator',
                      type: 'Number',
                      require: true,
                      detail: '分子'
                    },
                    {
                      name: 'denominator',
                      type: 'Number',
                      require: true,
                      detail: '分母'
                    },
                    {
                      name: 'num',
                      type: 'int',
                      require: false,
                      detail: '小数点后有效位数'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '百分比结果'
                  },
                  demo: `let d = Cg.NumberUtils.percentNoSymbol(1, 3, 1);\r\nconsole.log(d);`,
                  detail: '获取对应的分子/分母，将结果进行百分比转换，同时保留小数点后的有效位数，没有百分比符号'
                },
                {
                  name: 'Cg.NumberUtils.numberFormat(number, toFixedNumber)',
                  param: [
                    {
                      name: 'number',
                      type: 'Number',
                      require: true,
                      detail: '数值'
                    },
                    {
                      name: 'toFixedNumber',
                      type: 'int',
                      require: true,
                      detail: '小数点后有效位数'
                    }
                  ],
                  return: {
                    type: 'Number',
                    detail: 'toFixed结果'
                  },
                  demo: `let d = Cg.NumberUtils.numberFormat(1/2, 2);\r\nconsole.log(d);`,
                  detail: 'toFixed功能的完善，去除小数点后不需要的0'
                },
                {
                  name: 'Cg.NumberUtils.moneyFormat(val)',
                  param: [
                    {
                      name: 'val',
                      type: 'Number',
                      require: true,
                      detail: '数值'
                    }
                  ],
                  return: {
                    type: 'Number',
                    detail: '钱格式化结果'
                  },
                  demo: `let d = Cg.NumberUtils.moneyFormat(999999.99);\r\nconsole.log(d);`,
                  detail: '金钱格式化，整数部分，每三位一个","分割'
                },
                {
                  name: 'Cg.NumberUtils.fileSizeFormat(bytes)',
                  param: [
                    {
                      name: 'bytes',
                      type: 'Number',
                      require: true,
                      detail: '字节'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '转成KB,MB等字符串'
                  },
                  demo: `let d = Cg.NumberUtils.fileSizeFormat(1024 * 1024 * 1024);\r\nconsole.log(d);`,
                  detail: '文件大小格式转换，保留两位小数'
                }
              ]
            },
            {
              name: '字符串操作',
              child: [
                {
                  name: 'Cg.StrUtils.trim(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '去除字符串左右空格的结果'
                  },
                  demo: `let d = Cg.StrUtils.trim(" asc ");\r\nconsole.log(d.length);`,
                  detail: '去除字符串左右空格'
                },
                {
                  name: 'Cg.StrUtils.ltrim(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '删除字符串左边空白的结果'
                  },
                  demo: `let d = Cg.StrUtils.ltrim(" asc ");\r\nconsole.log(d.length);`,
                  detail: '删除字符串左边空白'
                },
                {
                  name: 'Cg.StrUtils.rtrim(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '删除字符串右边空白的结果'
                  },
                  demo: `let d = Cg.StrUtils.rtrim(" asc ");\r\nconsole.log(d.length);`,
                  detail: '删除字符串右边空白'
                },
                {
                  name: 'Cg.StrUtils.isBlank(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否空白的结果'
                  },
                  demo: `console.log(Cg.StrUtils.isBlank(" "));\r\nconsole.log(Cg.StrUtils.isBlank("aaa"));`,
                  detail: '是否空白'
                },
                {
                  name: 'Cg.StrUtils.stripTags(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '去除字符串中的html标签的结果'
                  },
                  demo: `console.log(Cg.StrUtils.stripTags("<div>123123</div>"));`,
                  detail: '去除字符串中的html标签'
                },
                {
                  name: 'Cg.StrUtils.startsWith(str, starts)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    },
                    {
                      name: 'starts',
                      type: 'String',
                      require: true,
                      detail: '开头字符串'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否'
                  },
                  demo: `console.log(Cg.StrUtils.startsWith("123", "23"));`,
                  detail: '判断字符串是否以对应的字符串做开头'
                },
                {
                  name: 'Cg.StrUtils.endsWith(str, ends)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    },
                    {
                      name: 'ends',
                      type: 'String',
                      require: true,
                      detail: '结尾字符串'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否'
                  },
                  demo: `console.log(Cg.StrUtils.endsWith("123", "23"));`,
                  detail: '判断字符串是否以对应的字符串做结尾'
                },
                {
                  name: 'Cg.StrUtils.escapeHTML(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'str',
                    detail: '编码后结果'
                  },
                  demo: `console.log(Cg.StrUtils.escapeHTML("<div>123123</div>"));`,
                  detail: '字符串进行html编码用于静态页面输出'
                },
                {
                  name: 'Cg.StrUtils.unescapeHTML(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'str',
                    detail: '解码后结果'
                  },
                  demo: `console.log(Cg.StrUtils.unescapeHTML("&lt;div&gt;123123&lt;/div&gt;"));`,
                  detail: '字符串进行html解码'
                },
                {
                  name: 'Cg.StrUtils.isNum(str)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    }
                  ],
                  return: {
                    type: 'boolean',
                    detail: '是否数字'
                  },
                  demo: `console.log(Cg.StrUtils.isNum("asc"));`,
                  detail: '是否数字'
                },
                {
                  name: 'Cg.StrUtils.replaceAll(str, s1, s2)',
                  param: [
                    {
                      name: 'str',
                      type: 'String',
                      require: true,
                      detail: '字符串'
                    },
                    {
                      name: 's1',
                      type: 'String',
                      require: true,
                      detail: '查找字符串'
                    },
                    {
                      name: 's2',
                      type: 'String',
                      require: true,
                      detail: '替换字符串'
                    }
                  ],
                  return: {
                    type: 'String',
                    detail: '替换结果'
                  },
                  demo: `console.log(Cg.StrUtils.replaceAll("aaaaaa", "aa", "bc"));`,
                  detail: '全部替换字符串'
                }
              ]
            },
            {
              name: '浏览器识别',
              child: [
                {
                  name: 'Cg.BrowseUtils.isIE()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否IE'
                  },
                  demo: `console.log(Cg.BrowseUtils.isIE());`,
                  detail: '是否IE'
                },
                {
                  name: 'Cg.BrowseUtils.isIE9()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否IE9'
                  },
                  demo: `console.log(Cg.BrowseUtils.isIE9());`,
                  detail: '是否IE9'
                },
                {
                  name: 'Cg.BrowseUtils.isEdge()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否Edge'
                  },
                  demo: `console.log(Cg.BrowseUtils.isEdge());`,
                  detail: '是否Edge'
                },
                {
                  name: 'Cg.BrowseUtils.isAndroid()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否安卓浏览器'
                  },
                  demo: `console.log(Cg.BrowseUtils.isAndroid());`,
                  detail: '是否安卓浏览器'
                },
                {
                  name: 'Cg.BrowseUtils.isIOS()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否IOS'
                  },
                  demo: `console.log(Cg.BrowseUtils.isIOS());`,
                  detail: '是否IOS'
                },
                {
                  name: 'Cg.BrowseUtils.isChrome()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否Chrome'
                  },
                  demo: `console.log(Cg.BrowseUtils.isChrome());`,
                  detail: '是否Chrome'
                },
                {
                  name: 'TODO Cg.BrowseUtils.isWechat()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否微信浏览器中'
                  },
                  demo: `console.log(Cg.BrowseUtils.isWechat());`,
                  detail: '是否微信浏览器中'
                },
                {
                  name: 'TODO Cg.BrowseUtils.isWxwork()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否企业微信浏览器中'
                  },
                  demo: `console.log(Cg.BrowseUtils.isWxwork());`,
                  detail: '是否企业微信浏览器中'
                },
                {
                  name: 'TODO Cg.BrowseUtils.isAndroidApp()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否安卓App中'
                  },
                  demo: `console.log(Cg.BrowseUtils.isAndroidApp());`,
                  detail: '是否安卓App中'
                },
                {
                  name: 'TODO Cg.BrowseUtils.isIosApp()',
                  param: [],
                  return: {
                    type: 'Boolean',
                    detail: '是否IosApp中'
                  },
                  demo: `console.log(Cg.BrowseUtils.isIosApp());`,
                  detail: '是否IosApp中'
                }
              ]
            },
            {
              name: '文件操作(结合uploadify使用，如果要单独使用最好拿源码自行修改后使用)',
              child: [
                {
                  name: 'Cg.FileUtils.uploadFile(fileList, result, funcCallback, prefix, [num])',
                  param: [
                    {
                      name: 'fileList',
                      type: 'Array',
                      require: true,
                      detail: '文件数组'
                    },
                    {
                      name: 'result',
                      type: 'Array',
                      require: true,
                      detail: '结果信息，根据fileList生成的，递归中使用，参数的时候空数组即可'
                    },
                    {
                      name: 'funcCallback',
                      type: 'Function',
                      require: true,
                      detail: '回调函数'
                    },
                    {
                      name: 'prefix',
                      type: 'String',
                      require: true,
                      detail: '文件类型对应的前缀，业务属性'
                    },
                    {
                      name: 'num',
                      type: 'Int',
                      require: false,
                      detail: '递归计数器，可以无视'
                    }
                  ],
                  demo: ``,
                  detail: '上传文件，成功以后，调用回调函数，并把上传结果返回'
                },
                {
                  name: 'Cg.FileUtils.createGroupId(fileList, callback)',
                  param: [
                    {
                      name: 'fileList',
                      type: 'Array',
                      require: true,
                      detail: '文件数组'
                    },
                    {
                      name: 'callback',
                      type: 'Function',
                      require: true,
                      detail: '回调函数'
                    }
                  ],
                  demo: ``,
                  detail: '创建文件组，将文件组ID返回'
                },
                {
                  name: 'Cg.FileUtils.getFileList(fileGroupId, callback)',
                  param: [
                    {
                      name: 'fileGroupId',
                      type: 'Array',
                      require: true,
                      detail: '文件组ID'
                    },
                    {
                      name: 'callback',
                      type: 'Function',
                      require: true,
                      detail: '回调函数'
                    }
                  ],
                  demo: ``,
                  detail: '根据文件组获取对应的文件清单以及明细地址'
                },
                {
                  name: 'Cg.FileUtils.getTCloudFile(list, funcCallback, [num])',
                  param: [
                    {
                      name: 'list',
                      type: 'Array',
                      require: true,
                      detail: '文件清单'
                    },
                    {
                      name: 'funcCallback',
                      type: 'Function',
                      require: true,
                      detail: '回调函数'
                    },
                    {
                      name: 'num',
                      type: 'Int',
                      require: true,
                      detail: '递归计数器，可以无视'
                    }
                  ],
                  demo: ``,
                  detail: '根据文件获取对应的文件清单以及明细地址'
                },
                {
                  name: 'Cg.FileUtils.resizeFile(files, maxSize, callback, fileList, i)',
                  param: [
                    {
                      name: 'files',
                      type: 'Array',
                      require: true,
                      detail: '文件清单'
                    },
                    {
                      name: 'maxSize',
                      type: 'int',
                      require: true,
                      detail: '最大字节数'
                    },
                    {
                      name: 'callback',
                      type: 'Function',
                      require: true,
                      detail: '回调函数'
                    },
                    {
                      name: 'fileList',
                      type: 'Array',
                      require: true,
                      detail: '文件转换后的数组，递归中使用可以无视'
                    },
                    {
                      name: 'i',
                      type: 'Int',
                      require: true,
                      detail: '计数器，递归中使用可以无视'
                    }
                  ],
                  demo: ``,
                  detail: '将图片文件按照最大尺寸进行压缩，压缩后的文件小于等于最大尺寸，然后调用回调函数'
                },
                {
                  name: 'Cg.FileUtils.base64ToBlob(base64URL, filetype)',
                  param: [
                    {
                      name: 'base64URL',
                      type: 'String',
                      require: true,
                      detail: 'base64编码'
                    },
                    {
                      name: 'filetype',
                      type: 'String',
                      require: true,
                      detail: '文件类型'
                    }
                  ],
                  demo: ``,
                  detail: 'base64转blob，可以根据blob创建file对象'
                }
              ]
            }
          ]
        },
        {
          name: '视图',
          child: [
            {
              name: 'INPUT',
              child: [
                {
                  name: '<cg-input></cg-input>',
                  param: [
                    {
                      name: 'label',
                      type: 'String',
                      default: '""',
                      detail: '标题'
                    },
                    {
                      name: 'id',
                      type: 'String',
                      default: '""',
                      detail: '唯一标志符'
                    },
                    {
                      name: 'type',
                      type: 'String',
                      default: 'text',
                      detail: '类型(text,textarea,password)'
                    },
                    {
                      name: 'readonly',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否可编辑'
                    },
                    {
                      name: 'size',
                      type: 'String',
                      default: 'default',
                      detail: '尺寸大小'
                    },
                    {
                      name: 'cols',
                      type: 'Number',
                      default: 'null',
                      detail: 'textarea 列数'
                    },
                    {
                      name: 'rows',
                      type: 'Number',
                      default: '2',
                      detail: 'textarea 行数'
                    },
                    {
                      name: 'placeholder',
                      type: 'String',
                      default: '""',
                      detail: 'placeholder'
                    },
                    {
                      name: 'emptyisnull',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否转成NULL值提交'
                    },
                    {
                      name: 'required',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否必填'
                    },
                    {
                      name: 'validparam',
                      type: 'Object',
                      default: '{min: null,max: null,minlength: null,maxlength: null,validFunc: null,errorMsg: null}',
                      detail: '校验规则'
                    },
                    {
                      name: 'value',
                      type: 'String',
                      default: '""',
                      detail: '数值'
                    }
                  ],
                  demo: `{
  label: "input",
  id: "input",
  type: "text",
  readonly: false,
  size: "default",
  cols: null,
  rows: 2,
  placeholder: "",
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
 }`,
                  template: `<cg-input
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
</cg-input>`,
                  detail: 'input组件'
                }
              ]
            },
            {
              name: 'SWITCH',
              child: [
                {
                  name: '<cg-switch></cg-switch>',
                  param: [
                    {
                      name: 'label',
                      type: 'String',
                      default: '""',
                      detail: '标题'
                    },
                    {
                      name: 'id',
                      type: 'String',
                      default: '""',
                      detail: '唯一标志符'
                    },
                    {
                      name: 'readOnly',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否可编辑'
                    },
                    {
                      name: 'value',
                      type: 'Boolean',
                      default: 'false',
                      detail: '数值'
                    }
                  ],
                  demo: `{
  label: "switch",
  readOnly: false
 }`,
                  template: `<cg-switch
  :label = "switch.label"
  :readonly = "switch.readOnly"
>
</cg-switch>`,
                  detail: 'switch组件'
                }
              ]
            },
            {
              name: 'DATE',
              child: []
            },
            {
              name: 'CHECKBOX',
              child: [
                {
                  name: '<cg-checkbox></cg-checkbox>',
                  param: [
                    {
                      name: 'label',
                      type: 'String',
                      default: '""',
                      detail: '标题'
                    },
                    {
                      name: 'id',
                      type: 'String',
                      default: '""',
                      detail: '唯一标志符'
                    },
                    {
                      name: 'readonly',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否可编辑'
                    },
                    {
                      name: 'required',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否必填'
                    },
                    {
                      name: 'emptyisnull',
                      type: 'boolean',
                      default: 'true',
                      detail: '选项为空时转换成null'
                    },
                    {
                      name: 'keyname',
                      type: 'String',
                      default: 'id',
                      detail: '和data配合使用，取data里面对应的keyName的值作为id'
                    },
                    {
                      name: 'showname',
                      type: 'String',
                      default: 'name',
                      detail: '和data配合使用，取data里面对应的showName的值作为显示'
                    },
                    {
                      name: 'showfunc',
                      type: 'Function',
                      default: 'null',
                      detail: '展示的函数，优先级在showName之前，复杂展示方式的时候使用，这里考虑用插槽实现'
                    },
                    {
                      name: 'list',
                      type: 'Array',
                      default: '[]',
                      detail: '候选项'
                    },
                    {
                      name: 'selectnum',
                      type: 'Number',
                      default: '1',
                      detail: '最多选中数量(0:为不限制;1:为单选;)'
                    },
                    {
                      name: 'value',
                      type: 'Anything',
                      default: 'null',
                      detail: '下拉框值'
                    },
                    {
                      name: 'titlestyle',
                      type: 'Int',
                      default: '0',
                      detail: '标题和内容展示方式(0:横向展示;1:竖向展示)'
                    },
                    {
                      name: 'showstyle',
                      type: 'Int',
                      default: '0',
                      detail: '选项展示方式(0:横向展示;1:竖向展示)'
                    }
                  ],
                  demo: `{
  label: "checkbox",
  readOnly: true,
  titleStyle : 0,
  showStyle : 0,
  list: [
    {"id":"id1", "name":"名称1"},
    {"id":"id2", "name":"名称2"}
  ]
 }`,
                  template: `<cg-checkbox
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
</cg-checkbox>`,
                  detail: 'checkbox组件，支持选项展示slot'
                }
              ]
            },
            {
              name: 'SELECT',
              child: [
                {
                  name: '<cg-select></cg-select>',
                  param: [
                    {
                      name: 'label',
                      type: 'String',
                      default: '""',
                      detail: '标题'
                    },
                    {
                      name: 'id',
                      type: 'String',
                      default: '""',
                      detail: '唯一标志符'
                    },
                    {
                      name: 'readonly',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否可编辑'
                    },
                    {
                      name: 'required',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否必填'
                    },
                    {
                      name: 'emptyisnull',
                      type: 'boolean',
                      default: 'true',
                      detail: '选项为空时转换成null'
                    },
                    {
                      name: 'keyname',
                      type: 'String',
                      default: 'id',
                      detail: '和data配合使用，取data里面对应的keyName的值作为id'
                    },
                    {
                      name: 'showname',
                      type: 'String',
                      default: 'name',
                      detail: '和data配合使用，取data里面对应的showName的值作为显示'
                    },
                    {
                      name: 'showfunc',
                      type: 'Function',
                      default: 'null',
                      detail: '展示的函数，优先级在showName之前，复杂展示方式的时候使用，这里考虑用插槽实现'
                    },
                    {
                      name: 'list',
                      type: 'Array',
                      default: '[]',
                      detail: '候选项'
                    },
                    {
                      name: 'selectnum',
                      type: 'Number',
                      default: '1',
                      detail: '最多选中数量(0:为不限制;1:为单选;)'
                    },
                    {
                      name: 'value',
                      type: 'Anything',
                      default: 'null',
                      detail: '下拉框值'
                    },
                    {
                      name: 'titlestyle',
                      type: 'Int',
                      default: '0',
                      detail: '标题和内容展示方式(0:横向展示;1:竖向展示)'
                    },
                    {
                      name: 'filter',
                      type: 'Boolean',
                      default: 'false',
                      detail: '是否显示筛选器'
                    },
                    {
                      name: 'filterignore',
                      type: 'Boolean',
                      default: 'false',
                      detail: '筛选器是否忽略大小写'
                    },
                    {
                      name: 'filterplaceholder',
                      type: 'String',
                      default: '请输入关键字',
                      detail: '筛选器默认文字'
                    },
                    {
                      name: 'emptylabel',
                      type: 'String',
                      default: '请选择',
                      detail: '空选项的时候，默认展示数据'
                    },
                    {
                      name: 'separator',
                      type: 'String',
                      default: ',',
                      detail: '分隔符'
                    },
                  ],
                  demo: `{
  label: "select",
  readOnly: true,
  titleStyle : 0,
  list: [
    {"id":"id1", "name":"名称1"},
    {"id":"id2", "name":"名称2"}
  ]
 }`,
                  template: `<cg-select
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
</cg-select>`,
                  detail: 'select组件，支持选项展示slot'
                }
              ]
            },

            {
              name: 'UPLOADIFY',
              child: [
                {
                  name: '<cg-uploadify></cg-uploadify>',
                  param: [
                    {
                      name: 'type',
                      type: 'String',
                      default: 'file',
                      detail: '展示类型(file文件类型，image图片类型)'
                    },
                    {
                      name: 'id',
                      type: 'String',
                      default: '""',
                      detail: '唯一标志符'
                    },
                    {
                      name: 'prefix',
                      type: 'String',
                      default: 'Test',
                      detail: '文件类型前缀'
                    },
                    {
                      name: 'filenum',
                      type: 'Number',
                      default: '1',
                      detail: '文件数量'
                    },
                    {
                      name: 'maxsize',
                      type: 'Number',
                      default: 'true',
                      detail: '最大KB数(图片类型的时候会压缩，其他类型的会忽略该字段)'
                    },
                    {
                      name: 'errorimage',
                      type: 'String',
                      default: '""',
                      detail: '错误时的图片展示'
                    },
                    {
                      name: 'defaultimage',
                      type: 'String',
                      default: '""',
                      detail: '默认的图片展示'
                    },
                    {
                      name: 'loadingimage',
                      type: 'String',
                      default: '""',
                      detail: '加载图片展示'
                    },
                    {
                      name: 'required',
                      type: 'Boolean',
                      default: 'false',
                      detail: '是否必填'
                    },
                    {
                      name: 'readonly',
                      type: 'Boolean',
                      default: 'false',
                      detail: '不可编辑'
                    },
                    {
                      name: 'candelete',
                      type: 'Boolean',
                      default: 'false',
                      detail: '是否可以删除'
                    },
                    {
                      name: 'emptyisnull',
                      type: 'Boolean',
                      default: 'true',
                      detail: '选项为空时转换成null'
                    }
                  ],
                  demo: `{
  type: "image",
  prefix: "Test",
  fileNum : 0,
  maxSize : 0
 }`,
                  template: `<cg-uploadify
  :type = "uploadify.type"
  :id = "uploadify.id"
  :readonly = "uploadify.readOnly"
  :candelete = "uploadify.canDelete"
  :required = "uploadify.required"
  :emptyisnull = "uploadify.emptyIsNull"
  :prefix = "uploadify.prefix"
  :filenum = "uploadify.fileNum"
  :maxsize = "uploadify.maxSize"
  v-model = "data.uploadify"
>
</cg-uploadify>`,
                  detail: 'uploadify组件'
                }
              ]
            },
            {
              name: 'BUTTON',
              child: [
                {
                  name: '<cg-button></cg-button>',
                  param: [
                    {
                      name: 'label',
                      type: 'String',
                      default: '""',
                      detail: '按钮文字'
                    },
                    {
                      name: 'classname',
                      type: 'String',
                      default: 'cg-button__primary',
                      detail: '颜色样式有cg-button__default/cg-button__primary/cg-button__success/cg-button__info/cg-button__warning/cg-button__danger，圆角样式 round，朴素样式 plain，颜色样式、圆角样式、朴素样式可搭配使用'
                    },
                    {
                      name: 'readonly',
                      type: 'boolean',
                      default: 'false',
                      detail: '是否可点击'
                    },
                    {
                      name: 'buttonclick',
                      type: 'Function',
                      default: 'null',
                      detail: '点击事件'
                    }
                  ],
                  demo: `{
  className: "cg-button__primary"
  label: "button",
  readOnly: false,
  buttonClick : function(){console.log(123);}
 }`,
                  template: `<cg-button
  :classname = "button.className"
  :label = "button.label"
  :readonly = "button.readOnly"
  :buttonclick = "button.buttonClick"
>
</cg-button>`,
                  detail: 'button组件，支持按钮slot'
                }
              ]
            },
            {
              name: 'PAGELIST',
              child: [
                {
                  name: '<cg-pagelist></cg-pagelist>',
                  param: [
                    {
                      name: 'page',
                      type: 'Object',
                      default: '{pageSize: 20, pageNo: 1, totalNum: 0}',
                      detail: '分页信息'
                    },
                    {
                      name: 'initorder',
                      type: 'Object',
                      default: '{keyName: "", orderBy: ""}',
                      detail: '排序展示(keyname:排序的主键;orderBy:asc/desc顺序逆序)'
                    },
                    {
                      name: 'list',
                      type: 'Array',
                      default: '[]',
                      detail: '数据'
                    },
                    {
                      name: 'titleconfig',
                      type: 'Array',
                      default: '[]',
                      detail: '标题配置{orderAble:是否可以排序,label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}'
                    },
                    {
                      name: 'showcheckbox',
                      type: 'Boolean',
                      default: 'true',
                      detail: '是否显示勾选功能'
                    },
                    {
                      name: 'loadfunction',
                      type: 'Function',
                      default: 'null',
                      detail: '数据加载方法(排序，分页等都会触发，返回data,page,order对象)'
                    },
                    {
                      name: 'rowclickfunction',
                      type: 'Function',
                      default: 'null',
                      detail: '行点击事件'
                    }
                  ],
                  demo: `{
  page: {pageSize: 20, pageNo: 1, totalNum: 2},
  initOrder: {keyName: "", orderBy: ""},
  list: [{id:1,name:"名称1"},{id:2,name:"名称2"}],
  titleConfig: [{label:"ID",keyName:"id"},{label:"名称",keyName:"name"}],
  showCheckBox: true,
  loadFunction: function(page, order){console.log(page);console.log(order);},
  rowClickFunction: function(record){console.log(record);},
 }`,
                  template: `<cg-pagelist
  :page = "pagelist.page"
  :initorder = "pagelist.initOrder"
  :list = "pagelist.list"
  :titleconfig = "pagelist.titleConfig"
  :showcheckbox = "pagelist.showCheckBox"
  :loadfunction = "pagelist.loadFunction"
  :rowclickfunction = "pagelist.rowClickFunction"
>
</cg-pagelist>`,
                  detail: 'pageList组件，支持按钮slot'
                }
              ]
            },

            {
              name: 'SCOLLLIST',
              child: [
                {
                  name: '<cg-scolllist></cg-scolllist>',
                  param: [
                    {
                      name: 'list',
                      type: 'Array',
                      default: '[]',
                      detail: '数据'
                    },
                    {
                      name: 'titleconfig',
                      type: 'Array',
                      default: '[]',
                      detail: '标题配置{orderAble:是否可以排序,label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}'
                    },
                    {
                      name: 'loadfunction',
                      type: 'Function',
                      default: 'null',
                      detail: '数据加载方法(排序，分页等都会触发，返回data,page,order对象)'
                    },
                    {
                      name: 'rowclickfunction',
                      type: 'Function',
                      default: 'null',
                      detail: '行点击事件'
                    }
                  ],
                  demo: `{
  list: [{id:1,name:"名称1"},{id:2,name:"名称2"}],
  titleConfig: [{label:"ID",keyName:"id"},{label:"名称",keyName:"name"}],
  loadFunction: function(page, order){console.log(page);console.log(order);},
  rowClickFunction: function(record){console.log(record);},
 }`,
                  template: `<cg-scolllist
  :list = "scolllist.list"
  :titleconfig = "scolllist.titleConfig"
  :loadfunction = "scolllist.loadFunction"
  :rowclickfunction = "scolllist.rowClickFunction"
>
</cg-scolllist>`,
                  detail: 'scolllist组件，支持列表数据slot'
                }
              ]
            },
            {
              name: 'TAB',
              child: [
                {
                  name: '<cg-tab></cg-tab>',
                  param: [
                    {
                      name: 'tabconfig',
                      type: 'Array',
                      default: '[]',
                      detail: '配置信息{id:是唯一标志，name是对应名称}'
                    }
                  ],
                  demo: `{
  tabconfig: [
    { name: 'checkbox',    id: 1 },
    { name: 'select',      id: 2 }
  ]
 }`,
                  template: `
<cg-tab
  :tabconfig="tabconfig"
>
  <template slot-scope="slotProps">
    <span v-if='slotProps.activeTab.id==1'>
      这是第一个
    </span>
    <span v-if='slotProps.activeTab.id==2'>
      这是第二个
    </span>
  </template>
</cg-tab>
`,
                  detail: 'tab组件'
                }
              ]
            },
            {
              name: 'TREE',
              child: [
                {
                  name: '<cg-tree></cg-tree>',
                  param: [
                    {
                      name: 'showname',
                      type: 'String',
                      default: 'name',
                      detail: '和data配合使用，去data里面对应的showName的值作为显示(-做分割进行深层次访问)'
                    },
                    {
                      name: 'childname',
                      type: 'String',
                      default: 'child',
                      detail: '和data配合使用，去data里面对应的childName的值作为子节点列表(-做分割进行深层次访问)'
                    },
                    {
                      name: 'showfunc',
                      type: 'Function',
                      default: 'null',
                      detail: '展示的函数，优先级再showName之前，复杂展示方式的时候使用，这里考虑用插槽实现'
                    },
                    {
                      name: 'list',
                      type: 'Array',
                      default: '[]',
                      detail: '树图所有节点'
                    },
                    {
                      name: 'onselected',
                      type: 'Function',
                      default: 'null',
                      detail: '选中树图节点事件'
                    },
                    {
                      name: 'onextend',
                      type: 'Function',
                      default: 'null',
                      detail: '展开树图节点事件'
                    },
                    {
                      name: 'filter',
                      type: 'Boolean',
                      default: 'false',
                      detail: '是否显示筛选器(在已知的节点范围内进行检索，最好配合list一次性加载，否则只检索已知数据)'
                    },
                    {
                      name: 'filterignore',
                      type: 'Boolean',
                      default: 'true',
                      detail: '是否忽略大小写'
                    },
                    {
                      name: 'filterplaceholder',
                      type: 'String',
                      default: '请选择',
                      detail: '筛选器默认文字'
                    }
                  ],
                  demo: `{
  showName: "name",
  childName: "child",
  list: [{"name":"父一","child":[{"name":"子一"}]}, {"name":"父二"}, {"name":"父三"}],
  onSelected: function(record){console.log(record);},
  onExtend: function(record, showChild){console.log(record);console.log(showChild);},
  filter: true,
  filterIgnore: true,
  filterPlaceholder: "请选择"
 }`,
                  template: `
<cg-tree
  :showname="showName"
  :childname="childName"
  :showfunc="showFunc"
  :list="list"
  :onselected="onSelected"
  :filter="filter"
  :filterignore="filterIgnore"
  :filterplaceholder="filterPlaceholder"
>
</cg-tree>
`,
                  detail: 'tree组件，支持节点数据slot'
                }
              ]
            },
            {
              name: 'FROM',
              child: [
                {
                  name: '<cg-form></cg-form>',
                  param: [
                  ],
                  demo: `// this.$refs["form"].valid();`,
                  template: `
<cg-form ref = "form" >
</cg-form>
`,
                  detail: 'FROM组件'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    tryTest: function (script) {
      eval(script)
    },
    tryTest2: function (type, data) {
      this.show = true
      if (type === 'CHECKBOX') {
        this.showCheckbox = true
        Utils.mergeObject(this.checkbox, eval('(' + data + ')'), 'outer')
      } else if (type === 'SELECT') {
        this.showSelect = true
        Utils.mergeObject(this.select, eval('(' + data + ')'), 'outer')
      } else if (type === 'BUTTON') {
        this.showButton = true
        Utils.mergeObject(this.button, eval('(' + data + ')'), 'outer')
      } else if (type === 'PAGELIST') {
        this.showPagelist = true
        Utils.mergeObject(this.pagelist, eval('(' + data + ')'), 'outer')
      } else if (type === 'SCOLLLIST') {
        this.showScolllist = true
        Utils.mergeObject(this.scolllist, eval('(' + data + ')'), 'outer')
      } else if (type === 'TAB') {
        this.showTab = true
        Utils.mergeObject(this.tab, eval('(' + data + ')'), 'outer')
      } else if (type === 'TREE') {
        this.showTree = true
        Utils.mergeObject(this.tree, eval('(' + data + ')'), 'outer')
      } else if (type === 'UPLOADIFY') {
        this.showUploadify = true
        Utils.mergeObject(this.uploadify, eval('(' + data + ')'), 'outer')
      } else if (type === 'SWITCH') {
        this.showSwitch = true
        Utils.mergeObject(this.switchConfig, eval('(' + data + ')'), 'outer')
      } else if (type === 'INPUT') {
        this.showInput = true
        Utils.mergeObject(this.input, eval('(' + data + ')'), 'outer')
      }
    },
    returnMain: function () {
      this.show = false
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
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

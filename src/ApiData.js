const ApiData = [
  {
    name: '封装方法',
    child: [
      {
        name: '常用操作',
        children: [
          {
            name: 'Cg.Utils.getRecordValue',
            funcUsed: 'Cg.Utils.getRecordValue(record, keyName, [defaultValue])',
            explain: '用于获取record对应的keyname的值，keyname进行"-"分割用于深层次访问，如果没有返回defaultValue。',
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
                detail: '没有查找到返回defaultValue'
              }
            ],
            demo: `let a = {a:1, b:{ a: 1 }};\nlet b = {a:1};\nprintResult(Cg.Utils.getRecordValue(a, "b-a"))`,
            value: ''
          },
          {
            name: 'Cg.Utils.isPlainObject',
            funcUsed: 'Cg.Utils.isPlainObject(object)',
            explain: '是否为object。',
            param: [
              {
                name: 'object',
                type: 'Anything',
                require: true,
                detail: '对象'
              }
            ],
            demo: `let a = {a:1};\nprintResult(Cg.Utils.isPlainObject(a))`,
            value: ''
          },
          {
            name: 'Cg.Utils.isArray',
            funcUsed: 'Cg.Utils.isArray(list)',
            explain: '是否为数组。',
            param: [
              {
                name: 'list',
                type: 'Anything',
                require: true,
                detail: '数组'
              }
            ],
            demo: `let a = [{a:1}];\nprintResult(Cg.Utils.isArray(a))`,
            value: 'true'
          },
          {
            name: 'Cg.Utils.clone',
            funcUsed: 'Cg.Utils.clone(clone)',
            explain: '对象深拷贝。',
            param: [
              {
                name: 'clone',
                type: 'Anything',
                require: true,
                detail: '对象'
              }
            ],
            demo: `let a = {a:1};\nlet b = Cg.Utils.clone(a)\na.a = 2;\nprintResult(b);`,
            value: ''
          },
          {
            name: 'Cg.Utils.mergeObject',
            funcUsed: 'Cg.Utils.mergeObject(to, from, [mergeType])',
            explain: '对象合并，以mergeType为准，其中数组的话，如果有demo数据，根据demo数据进行合并，如果没有demo，则按照right模式合并。',
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
            demo: `let a = {a:1};\nlet b = {a:2,b:3};\nCg.Utils.mergeObject(a, b);\nprintResult(a);`,
            value: ''
          },
          {
            name: 'Cg.Utils.getFromRequest',
            funcUsed: 'Cg.Utils.getFromRequest(key)',
            explain: '获取get请求里面的指定参数。',
            param: [
              {
                name: 'key',
                type: 'String',
                require: true,
                detail: '指定参数'
              }
            ],
            demo: `let name = Cg.Utils.getFromRequest("name");\nprintResult(name);`,
            value: ''
          },
          {
            name: 'Cg.Utils.linkUrl',
            funcUsed: 'Cg.Utils.linkUrl(url, params, [target])',
            explain: '页面跳转，params里面对应的参数进行urlencode，target为"_blank"时在新窗口打开。',
            param: [
              {
                name: 'url',
                type: 'String',
                require: true,
                detail: '目标url'
              },
              {
                name: 'params',
                type: 'Object',
                require: true,
                detail: '传递参数'
              },
              {
                name: 'target',
                type: 'String',
                require: false,
                detail: 'target为"_blank"时在新窗口打开'
              }
            ],
            demo: `Cg.Utils.linkUrl("http://www.baidu.com", {id : "test"})`,
            value: ''
          },
          {
            name: 'Cg.Utils.replaceUrl',
            funcUsed: 'Cg.Utils.replaceUrl(url, params)',
            explain: '页面跳转，params里面对应的参数进行urlencode，逻辑同linkUrl，只是具有历史替换功能',
            param: [
              {
                name: 'url',
                type: 'String',
                require: true,
                detail: '目标url'
              },
              {
                name: 'params',
                type: 'Object',
                require: true,
                detail: '传递参数'
              }
            ],
            demo: `Cg.Utils.replaceUrl("http://www.baidu.com", {id : "test"})`,
            value: ''
          },
          {
            name: 'Cg.Utils.guid',
            funcUsed: 'Cg.Utils.guid()',
            explain: '生成GUID',
            param: [],
            demo: `printResult(Cg.Utils.guid())`,
            value: ''
          }
        ]
      },
      {
        name: '日期操作',
        children: [
          {
            name: 'Cg.DateUtils.strToDate',
            funcUsed: 'Cg.DateUtils.strToDate(str, [dateFormat])',
            explain: '将字符串根据日期格式进行字符串日期转换',
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
            demo: `let d = Cg.DateUtils.strToDate("2018-01-01 11:11:11", "yyyy-MM-dd HH:mm:ss");\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.format',
            funcUsed: 'Cg.DateUtils.format(date, formatStr)',
            explain: '将日期根据日期格式进行字符串转换',
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
            demo: `let d = Cg.DateUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getWeekStartDate',
            funcUsed: 'Cg.DateUtils.getWeekStartDate(srcDate, [n])',
            explain: '获取指定日期过去或未来第n周的周一(n=0为当周)',
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
            demo: `let d = Cg.DateUtils.getWeekStartDate(new Date());\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getWeekEndDate',
            funcUsed: 'Cg.DateUtils.getWeekEndDate(srcDate, [n])',
            explain: '获取指定日期过去或未来第n周的周日(n=0为当周)',
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
            demo: `let d = Cg.DateUtils.getWeekEndDate(new Date());\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getDayOfWeek',
            funcUsed: 'Cg.DateUtils.getDayOfWeek(date, [preStr])',
            explain: '获取指定日期为周几',
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
            demo: `let d = Cg.DateUtils.getDayOfWeek(new Date());\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getCurrentMonth',
            funcUsed: 'Cg.DateUtils.getCurrentMonth()',
            explain: '获取当前月',
            param: [],
            demo: `let d = Cg.DateUtils.getCurrentMonth();\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getPrevMonth',
            funcUsed: 'Cg.DateUtils.getPrevMonth()',
            explain: '获取上个月份',
            param: [],
            demo: `let d = Cg.DateUtils.getPrevMonth();\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.DateUtils.getNextMonth',
            funcUsed: 'Cg.DateUtils.getNextMonth()',
            explain: '获取下个月份',
            param: [],
            demo: `let d = Cg.DateUtils.getNextMonth();\nprintResult(d);`,
            value: ''
          }
        ]
      },
      {
        name: '数字操作',
        children: [
          {
            name: 'Cg.NumberUtils.percent',
            funcUsed: 'Cg.NumberUtils.percent(mumerator, denominator, num)',
            explain: '获取对应的分子/分母，将结果进行百分比转换，同时保留小数点后的有效位数',
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
                require: true,
                detail: '小数点后有效位数'
              }
            ],
            demo: `let d = Cg.NumberUtils.percent(1, 3, 1);\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.NumberUtils.percentNoSymbol',
            funcUsed: 'Cg.NumberUtils.percentNoSymbol(mumerator, denominator, num)',
            explain: '获取对应的分子/分母，将结果进行百分比转换，同时保留小数点后的有效位数，没有百分比符号',
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
                require: true,
                detail: '小数点后有效位数'
              }
            ],
            demo: `let d = Cg.NumberUtils.percentNoSymbol(1, 3, 1);\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.NumberUtils.numberFormat',
            funcUsed: 'Cg.NumberUtils.numberFormat(number, toFixedNumber)',
            explain: 'toFixed功能的完善，去除小数点后不需要的0',
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
            demo: `let d = Cg.NumberUtils.numberFormat(1/2, 2);\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.NumberUtils.moneyFormat',
            funcUsed: 'Cg.NumberUtils.moneyFormat(val)',
            explain: '金钱格式化，整数部分，每三位一个","分割',
            param: [
              {
                name: 'val',
                type: 'Number',
                require: true,
                detail: '数值'
              }
            ],
            demo: `let d = Cg.NumberUtils.moneyFormat(999999.99);\nprintResult(d);`,
            value: ''
          },
          {
            name: 'Cg.NumberUtils.fileSizeFormat',
            funcUsed: 'Cg.NumberUtils.fileSizeFormat(bytes)',
            explain: '文件大小格式转换，保留两位小数',
            param: [
              {
                name: 'bytes',
                type: 'Number',
                require: true,
                detail: '字节'
              }
            ],
            demo: `let d = Cg.NumberUtils.fileSizeFormat(1024 * 1024 * 1024);\nprintResult(d);`,
            value: ''
          }
        ]
      },
      {
        name: '字符串操作',
        children: [
          {
            name: 'Cg.StrUtils.trim',
            funcUsed: 'Cg.StrUtils.trim(str)',
            explain: '去除字符串左右空格',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `let d = Cg.StrUtils.trim(" asc ");\nprintResult(d.length);`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.ltrim',
            funcUsed: 'Cg.StrUtils.ltrim(str)',
            explain: '删除字符串左边空白',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `let d = Cg.StrUtils.ltrim(" asc ");\nprintResult(d.length);`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.rtrim',
            funcUsed: 'Cg.StrUtils.rtrim(str)',
            explain: '删除字符串右边空白',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `let d = Cg.StrUtils.rtrim(" asc ");\nprintResult(d.length);`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.isBlank',
            funcUsed: 'Cg.StrUtils.isBlank(str)',
            explain: '是否空白',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `printResult(Cg.StrUtils.isBlank(" "));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.stripTags',
            funcUsed: 'Cg.StrUtils.stripTags(str)',
            explain: '去除字符串中的html标签',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `printResult(Cg.StrUtils.stripTags("<div>123123</div>"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.startsWith',
            funcUsed: 'Cg.StrUtils.startsWith(str, starts)',
            explain: '判断字符串是否以对应的字符串做开头',
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
            demo: `printResult(Cg.StrUtils.startsWith("123", "23"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.endsWith',
            funcUsed: 'Cg.StrUtils.endsWith(str, ends)',
            explain: '判断字符串是否以对应的字符串做结尾',
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
            demo: `printResult(Cg.StrUtils.endsWith("123", "23"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.escapeHTML',
            funcUsed: 'Cg.StrUtils.escapeHTML(str)',
            explain: '字符串进行html编码用于静态页面输出',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `printResult(Cg.StrUtils.escapeHTML("<div>123123</div>"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.unescapeHTML',
            funcUsed: 'Cg.StrUtils.unescapeHTML(str)',
            explain: '字符串进行html解码',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `printResult(Cg.StrUtils.unescapeHTML("&lt;div&gt;123123&lt;/div&gt;"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.isNum',
            funcUsed: 'Cg.StrUtils.isNum(str)',
            explain: '是否数字',
            param: [
              {
                name: 'str',
                type: 'String',
                require: true,
                detail: '字符串'
              }
            ],
            demo: `printResult(Cg.StrUtils.isNum("asc"));`,
            value: ''
          },
          {
            name: 'Cg.StrUtils.replaceAll',
            funcUsed: 'Cg.StrUtils.replaceAll(str, s1, s2)',
            explain: '全部替换字符串',
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
            demo: `printResult(Cg.StrUtils.replaceAll("aaaaaa", "aa", "bc"));`,
            value: ''
          }
        ]
      },
      {
        name: '浏览器识别操作',
        children: [
          {
            name: 'Cg.BrowseUtils.isIE',
            funcUsed: 'Cg.BrowseUtils.isIE()',
            explain: '是否IE',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isIE());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isIE9',
            funcUsed: 'Cg.BrowseUtils.isIE9()',
            explain: '是否IE9',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isIE9());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isEdge',
            funcUsed: 'Cg.BrowseUtils.isEdge()',
            explain: '是否Edge',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isEdge());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isAndroid',
            funcUsed: 'Cg.BrowseUtils.isAndroid()',
            explain: '是否安卓浏览器',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isAndroid());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isIOS',
            funcUsed: 'Cg.BrowseUtils.isIOS()',
            explain: '是否IOS',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isIOS());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isChrome',
            funcUsed: 'Cg.BrowseUtils.isChrome()',
            explain: '是否Chrome',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isChrome());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isWechat',
            funcUsed: 'Cg.BrowseUtils.isWechat()',
            explain: '是否微信浏览器',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isWechat());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isWxwork',
            funcUsed: 'Cg.BrowseUtils.isWxwork()',
            explain: '是否企业微信浏览器',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isWxwork());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isAndroidApp',
            funcUsed: 'Cg.BrowseUtils.isAndroidApp()',
            explain: '是否安卓App',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isAndroidApp());`,
            value: ''
          },
          {
            name: 'Cg.BrowseUtils.isIosApp',
            funcUsed: 'Cg.BrowseUtils.isIosApp()',
            explain: '是否IosApp',
            param: [],
            demo: `printResult(Cg.BrowseUtils.isIosApp());`,
            value: ''
          }
        ]
      },
      {
        name: '文件操作(结合uploadify使用，如果要单独使用最好拿源码自行修改后使用)',
        children: [
          {
            name: 'Cg.FileUtils.uploadFile',
            funcUsed: 'Cg.FileUtils.uploadFile(fileList, result, funcCallback, prefix, [num])',
            explain: '上传文件，成功以后，调用回调函数，并把上传结果返回',
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
            demo: '',
            value: ''
          },
          {
            name: 'Cg.FileUtils.createGroupId',
            funcUsed: 'Cg.FileUtils.createGroupId(fileList, callback)',
            explain: '创建文件组，将文件组ID返回',
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
            demo: '',
            value: ''
          },
          {
            name: 'Cg.FileUtils.getFileList',
            funcUsed: 'Cg.FileUtils.getFileList(fileGroupId, callback)',
            explain: '根据文件组获取对应的文件清单以及明细地址',
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
            demo: '',
            value: ''
          },
          {
            name: 'Cg.FileUtils.getTCloudFile',
            funcUsed: 'Cg.FileUtils.getTCloudFile(list, funcCallback, [num])',
            explain: '根据文件获取对应的文件清单以及明细地址',
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
            demo: '',
            value: ''
          },
          {
            name: 'Cg.FileUtils.resizeFile',
            funcUsed: 'Cg.FileUtils.resizeFile(files, maxSize, callback, fileList, i)',
            explain: '将图片文件按照最大尺寸进行压缩，压缩后的文件小于等于最大尺寸，然后调用回调函数',
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
            demo: '',
            value: ''
          },
          {
            name: 'Cg.FileUtils.base64ToBlob',
            funcUsed: 'Cg.FileUtils.base64ToBlob(base64URL, filetype)',
            explain: 'base64转blob，可以根据blob创建file对象',
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
            demo: '',
            value: ''
          }
        ]
      }
    ]
  },
  {
    name: '自定义组件',
    child: [
      {
        name: 'INPUT',
        children: [
          {
            name: '<cg-input></cg-input>',
            funcUsed: '<cg-input></cg-input>',
            explain: 'input组件',
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
</cg-input>`
          }
        ]
      },
      {
        name: 'SWITCH',
        children: [
          {
            name: '<cg-switch></cg-switch>',
            funcUsed: '<cg-switch></cg-switch>',
            explain: 'switch组件',
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
</cg-switch>`
          }
        ]
      },
      {
        name: 'CHECKBOX',
        children: [
          {
            name: '<cg-checkbox></cg-checkbox>',
            funcUsed: '<cg-checkbox></cg-checkbox>',
            explain: 'checkbox组件',
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
</cg-switch>`
          }
        ]
      },
      {
        name: 'SELECT',
        children: [
          {
            name: '<cg-select></cg-select>',
            funcUsed: '<cg-select></cg-select>',
            explain: 'select组件',
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
              }
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
</cg-select>`
          }
        ]
      },
      {
        name: 'UPLOADIFY',
        children: [
          {
            name: '<cg-uploadify></cg-uploadify>',
            funcUsed: '<cg-uploadify></cg-uploadify>',
            explain: 'uploadify组件',
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
</cg-uploadify>`
          }
        ]
      },
      {
        name: 'BUTTON',
        children: [
          {
            name: '<cg-button></cg-button>',
            funcUsed: '<cg-button></cg-button>',
            explain: 'button组件',
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
</cg-button>`
          }
        ]
      },
      {
        name: 'PAGELIST',
        children: [
          {
            name: '<cg-pagelist></cg-pagelist>',
            funcUsed: '<cg-pagelist></cg-pagelist>',
            explain: 'pagelist组件',
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
</cg-pagelist>`
          }
        ]
      },
      {
        name: 'SCOLLLIST',
        children: [
          {
            name: '<cg-scolllist></cg-scolllist>',
            funcUsed: '<cg-scolllist></cg-scolllist>',
            explain: 'scolllist组件',
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
</cg-scolllist>`
          }
        ]
      },
      {
        name: 'TAB',
        children: [
          {
            name: '<cg-tab></cg-tab>',
            funcUsed: '<cg-tab></cg-tab>',
            explain: 'tab组件',
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
</cg-tab>`
          }
        ]
      },
      {
        name: 'TREE',
        children: [
          {
            name: '<cg-tree></cg-tree>',
            funcUsed: '<cg-tree></cg-tree>',
            explain: 'tree组件',
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
</cg-tree>`
          }
        ]
      },
      {
        name: 'DATE',
        children: [
          {
            name: '<cg-date></cg-date>',
            funcUsed: '<cg-date></cg-date>',
            explain: 'date组件',
            param: []
          }
        ]
      },
      {
        name: 'FROM',
        children: [
          {
            name: '<cg-from></cg-from>',
            funcUsed: '<cg-from></cg-from>',
            explain: 'from组件',
            param: [
            ],
            demo: `// this.$refs["form"].valid();`,
            template: `
<cg-form ref = "form" >
</cg-form>`
          }
        ]
      }
    ]
  }
]

export default ApiData

<template>
  <div class = 'cg-uploadify__base' >
    <div  v-if='fileList' class = 'cg-uploadify__main'>
      <div v-for='(file, index) in fileList'
           :key='"file" + index'
           @click='remove(file)'
           class = 'cg-uploadify__file'>
        <img v-if='type === "image" ' :src = 'file.errorImg || file.url || loadingImage' @error='onError(file)' width = 100 >
        <div v-else>
          {{ file.filePath }} </br>
          {{ file.url }} </br></br>
        </div>
      </div>
    </div>
    <div  class = 'cg-uploadify__upload'>
      <input v-if='fileNum == 1 && !readOnly && !lock' type = 'file' @change='onUpload' />
      <input v-else-if='!readOnly && !lock' type = 'file' @change='onUpload' multiple='multiple' :size='fileNum' />
    </div>
  </div>
</template>

<script>
import Utils from '../../../utils/Utils.js'
import StrUtils from '../../../utils/StrUtils.js'
import FileUtils from '../../../utils/FileUtils.js'
export default {
  name: 'cg-uploadify',
  props: {
    // 展示类型(file文件类型，image图片类型)
    'type': {
      type: String,
      default: 'file'
    },
    // ID
    'id': {
      type: String,
      default: ''
    },
    // 文件类型前缀
    'prefix': {
      type: String,
      default: 'Test'
    },
    // 文件数量
    'fileNum': {
      type: Number,
      default: 1
    },
    // 最大KB数
    'maxSize': {
      type: Number,
      default: 0
    },
    // TODO 错误时的图片展示
    'errorImage': {
      type: String,
      default: 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png'
    },
    // TODO 默认的图片展示
    'defaultImage': {
      type: String,
      default: 'file'
    },
    // TODO 加载图片展示
    'loadingImage': {
      type: String,
      default: 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3560742891,752665825&fm=85&s=4D91AC50A822FC88CAE60458030080F2'
    },
    // 是否必填
    'required': {
      type: Boolean,
      default: false
    },
    // 不可编辑
    'readOnly': {
      type: Boolean,
      default: false
    },
    // 选项为空时转换成null
    'emptyIsNull': {
      type: Boolean,
      default: true
    },
    // 文件组数值
    'value': {
      default: null
    }
  },
  created: function () {
    if (!StrUtils.isBlank(this.value)) {
      this.reloadFile()
    } else {
      if (this.emptyIsNull) {
        this.$emit('input', null)
      }
    }
  },
  data: function () {
    return {
      fileList: [],
      lock: false,
      errorMsg: ''
    }
  },
  computed: {
  },
  methods: {
    valid: function () {
      if (this.required) {
        if (StrUtils.isBlank(this.value)) {
          this.errorMsg = '不能为空'
          return this.errorMsg
        }
        this.errorMsg = ''
      } else {
        this.errorMsg = ''
      }
      return this.errorMsg
    },
    reloadFile: function () {
      var self = this
      if (!StrUtils.isBlank(self.value)) {
        FileUtils.getFileList(self.value, function (list) {
          let fileList = Utils.clone(self.fileList)
          self.fileList = []
          // 此处通过合并操作可以使用浏览器缓存，降低反复下载图片流量
          for (let i = 0; i < list.length; i++) {
            let flg = false
            for (let k = 0; k < fileList.length; k++) {
              if ((list[i]['filePath'] === fileList[k]['filePath']) && !StrUtils.isBlank(fileList[k]['url'])) {
                self.fileList.push(fileList[k])
                flg = true
                break
              }
            }
            if (!flg) {
              self.fileList.push(list[i])
            }
          }
          // 加锁防止异步错乱
          self.lock = false
        })
      } else {
        self.fileList = []
        // 加锁防止异步错乱
        self.lock = false
      }
    },
    onError: function (file) {
      file.errorImg = this.errorImage
    },
    onUpload: function (e) {
      if (e && e.target && e.target.files) {
        this.lock = true
        let num = e.target.files.length + this.fileList.length
        if (this.fileNum > 1 && num > this.fileNum) {
          // TODO 报错
          alert('选择的文件过多')
          return
        }
        var self = this
        let func = function (result) {
          // merge列表数据
          if (!self.fileList) self.fileList = []
          self.fileList = self.fileList.concat(result)
          self.resizeValue()
        }
        let files = e.target.files
        if (self.type === 'image' && self.maxSize > 0) {
          FileUtils.resizeFile(files, self.maxSize * 1024, function (fileList) {
            if (self.fileNum === 1) {
              FileUtils.uploadFile([fileList[0]], [], func, self.prefix)
            } else {
              FileUtils.uploadFile(fileList, [], func, self.prefix)
            }
          })
        } else {
          if (self.fileNum === 1) {
            FileUtils.uploadFile([files[0]], [], func, self.prefix)
          } else {
            FileUtils.uploadFile(files, [], func, self.prefix)
          }
        }
      }
    },
    remove: function (file) {
      if (this.lock) {
        return
      }
      this.lock = true
      this.fileList.splice(this.fileList.indexOf(file), 1)
      this.resizeValue()
    },
    resizeValue: function () {
      var self = this
      if (!self.fileList || self.fileList.length === 0) {
        self.$emit('input', null)
        return
      }
      let func = function (groupId) {
        self.$emit('input', groupId)
      }
      FileUtils.createGroupId(self.fileList, func)
    }
  },
  watch: {
    value (newValue, oldValue) {
      // 数据发生修改以后重新加载图片或者文件
      this.reloadFile()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

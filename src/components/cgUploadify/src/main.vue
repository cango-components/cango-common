<template>
  <div class = 'cg-uploadify__base' >
    <div v-show="fileList.length==0" class = 'cg-uploadify__upload' @click='openFile()' >
      <input :id="uniqueId" v-if='fileNum == 1 && !lock' type = 'file' @change='onUpload' />
      <input :id="uniqueId" v-else-if='!lock' type = 'file' @change='onUpload' multiple='multiple' :size='fileNum' />
      <p>上传文件</p>
    </div>
    <div v-if="type == 'image'" v-show="fileList.length>0" class='cango-uploadify__showImg' >
      <div class='cango-uploadify__preview' @click='openPreview()'>
        <img src='../../../assets/images/preview.png' id='showImg'/><span>预览</span>
      </div>
      <div class="openbtn"  @click='openFile()'>
       <img :src = 'showFile ? showFile : ""' class='showImg' />
      </div>
    </div>
    <div v-else-if="type == 'file'"  v-show="fileList.length>0" class='cango-uploadify__showfile' @click='openFile()'>
      <ul>
        <li v-for="(file,index) in fileList">
            {{ file.filePath }}&nbsp; <a :href="file.url" target="_blank">下载</a><br/>
        </li>
      </ul>
    </div>
    <div v-if='previewShow' class='cango-uploadify__background'></div>
    <v-touch tag="div"  v-if='previewShow' class = 'cango-uploadify__main'  v-on:swipeleft="prev()" v-on:swiperight="next()">
      <div class='cango-uploadify__main_close' @click='closePreview()'>×</div>
      <div class='cango-uploadify__main_title'>{{previewNum+1}}/{{fileList.length}}</div>
      <i v-if='previewNum>0' class='cango-uploadify__file_iconfont cango-uploadify__file_icon_previous cango-uploadify__file_prev' @click='prev()'></i>
      <i v-if='previewNum<fileList.length-1' class='cango-uploadify__file_iconfont cango-uploadify__file_icon_next cango-uploadify__file_next' @click='next()'></i>
      <div v-for="(file,index) in fileList" :key="index"  :class='index === previewNum? "cango-uploadify__file_active cango-uploadify__file" : "cango-uploadify__file"'>
        <span></span>
        <!-- 背景loading -->
        <img v-if="type == 'image' " :style='getStyle(file)' class="cango-uploadify__file_imgCon" :src = "file.errorImg || file.url " @error="onError(file)" >
        <div v-else>
          {{ file.filePath }} </br> {{ file.url }} </br></br>
        </div>
        <div class="left"  @click='left(file)'><i class='cango-uploadify__file_iconfont  cango-uploadify__file_icon-zuoxuanzhuan'></i>&nbsp;左旋转</div>
        <div v-if='!readOnly && canDelete' class="delete" @click='remove(file)'><i class='cango-uploadify__file_iconfont  cango-uploadify__file_icon-shanchu'></i>&nbsp;删除</div>
        <div class="right" @click='right(file)'><i class='cango-uploadify__file_iconfont  cango-uploadify__file_icon-youxuanzhuan'></i>&nbsp;右旋转</div>
      </div>
    </v-touch>
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
      default: 3
    },
    // 最大KB数
    'maxSize': {
      type: Number,
      default: 0
    },
    // 错误时的图片展示
    'errorImage': {
      type: String,
      default: '/static/images/error.png'
    },
    // 默认的图片展示
    'defaultImage': {
      type: String,
      default: ''
    },
    // 加载图片展示
    'loadingImage': {
      type: String,
      default: '/static/images/loading.gif'
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
    // 可以删除
    'canDelete': {
      type: Boolean,
      default: true
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
      errorMsg: '',
      showFile: this.defaultImage,
      previewShow: false,
      previewNum: 0,
      uniqueId: Utils.guid()
    }
  },
  computed: {
  },
  methods: {
    getStyle: function (file) {
      console.log('-------------------getStyle')
      if (!file['angle']) file['angle'] = 0
      console.log({transform: file['angle']})
      return {transform: 'rotate(' + file['angle'] + 'deg)'}
    },
    left: function (file) {
      if (!file['angle']) file['angle'] = 0
      file['angle'] = (file['angle'] + 90) % 360
      console.log('-------------------left')
      console.log(file['angle'])
    },
    right: function (file) {
      file['angle'] = (file['angle'] + 270) % 360
      console.log('-------------------right')
      console.log(file['angle'])
    },
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
          if (self.fileList && self.fileList.length > 0) {
            self.showFile = self.fileList[self.fileList.length - 1].url
          } else {
            self.showFile = this.defaultImage
          }
          console.log('-----------------------------')
          console.log(self.fileList)
          console.log(self.showFile)
          console.log('-----------------------------')
        })
      } else {
        self.fileList = []
        // 加锁防止异步错乱
        self.lock = false
        self.showFile = this.defaultImage
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
          alert('选择的文件过多');
          return;
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
      if (self.fileList && self.fileList.length > 0) {
        self.showFile = self.fileList[self.fileList.length - 1].url
        if (self.previewNum >= self.fileList.length) {
          self.previewNum = self.fileList.length - 1
        }
      } else {
        self.showFile = self.defaultImage
        self.previewShow = false
        self.previewNum = 0
      }
      if (!self.fileList || self.fileList.length === 0) {
        self.$emit('input', null)
        return
      }
      let func = function (groupId) {
        self.$emit('input', groupId)
      }
      FileUtils.createGroupId(self.fileList, func)
    },
    openFile: function () {
      if (this.readOnly || this.lock) {
        return
      }
      var upload = document.getElementById(this.uniqueId);
      upload.click()
    },
    openPreview: function () {
      let self = this
      if (self.fileList && self.fileList.length > 0) {
        self.previewShow = true
      }
    },
    closePreview: function () {
      let self = this
      self.previewShow = false
    },
    prev: function () {
      var self = this
      self.previewNum = self.previewNum - 1
      if (self.previewNum < 0) {
        self.previewNum = 0
      }
    },
    next: function () {
      var self = this
      self.previewNum = self.previewNum + 1
      if (self.fileList) {
        let totalNum = self.fileList.length
        if (totalNum > 0) {
          if (self.previewNum >= totalNum) {
            self.previewNum = totalNum - 1
          }
        } else {
          self.previewNum = 0
        }
      } else {
        self.previewNum = 0
      }
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

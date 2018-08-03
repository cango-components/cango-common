import Utils from './Utils'
import FileConfig from './FileConfig'
import cookie from './cookie.js'
import axios from 'axios'
var COS = require('cos-js-sdk-v5')
export default {
  uploadFile: function (fileList, result, funcCallback, prefix, num) {
    let self = this
    // 替换成用户的 Bucket
    let Bucket = FileConfig.bucket
    // TODO 这里理论上根据客户端的位置进行切换 替换成用户的 Region
    let Region = FileConfig.region
    if (!num) num = 1
    if (!fileList && fileList.length === 0) {
      funcCallback(result)
      return
    }
    if (num > fileList.length) {
      funcCallback(result)
      return
    }
    let time = new Date().getTime()
    // 增加时间戳和数字用于排序
    let fileName = prefix + '/' + time + '-' + num + '-' + Utils.guid() + fileList[num - 1].name
    // 初始化实例
    var cos = new COS({
      Protocol: 'https:',
      getAuthorization: function (options, callback) {
        axios({
          method: 'post',
          url: FileConfig.authorizationUrl,
          data: {
            method: options.Method.toLowerCase(),
            pathname: '/' + options.Key
          }
        }).then(function (response) {
          callback(response.data.authorization)
        }).catch(function (error) {
          // TODO 失败的操作
          console.log(error)
        })
      }
    })
    cos.putObject({
      Bucket: Bucket,
      Region: Region,
      Key: fileName,
      Body: fileList[num - 1]
    }, function (err, data) {
      if (!err) {
        result[num - 1] = {}
        result[num - 1]['filePath'] = fileName
        result[num - 1]['url'] = ''
        result[num - 1]['angle'] = 0
        result[num - 1]['errorImg'] = ''
        self.uploadFile(fileList, result, funcCallback, prefix, num + 1)
      }
    })
  },
  createGroupId: function (fileList, callback) {
    if (!fileList || fileList.length === 0) {
      return null
    }
    let keyList = []
    for (let i = 0; i < fileList.length; i++) {
      keyList.push({filePath: fileList[i].filePath})
    }
    let sessionId = cookie.readCookie('sessionId')
    let headers = {}
    headers['Content-Type'] = 'application/json'
    if (sessionId) {
      headers['sessionId'] = sessionId
    }
    // 文件打包功能
    axios({
      method: 'post',
      url: FileConfig.createFileGroupUrl,
      headers: headers,
      data: {
        entity: {
          contentUD: keyList
        }
      }
    }).then(function (response) {
      if (response && response.data && response.data.code === 0) {
        callback(response.data.data)
      } else {
        // TODO 失败的操作
        alert(response.data.msg)
      }
    }).catch(function (error) {
      // TODO 失败的操作
      console.log(error)
      alert('操作失败')
    })
  },
  getFileList: function (fileGroupId, callback) {
    let self = this
    let sessionId = cookie.readCookie('sessionId')
    let headers = {}
    headers['Content-Type'] = 'application/json'
    if (sessionId) {
      headers['sessionId'] = sessionId
    }
    axios({
      method: 'post',
      url: FileConfig.findByGroupIdUrl,
      headers: headers,
      data: {
        id: fileGroupId
      }
    }).then(function (response) {
      if (response && response.data && response.data.code === 0) {
        self.getTCloudFile(response.data.data.contentUD, callback)
      } else {
        // TODO 失败的操作
        alert(response.data.msg)
      }
    }).catch(function (error) {
      // TODO 失败的操作
      console.log(error)
      alert('操作失败')
    })
  },
  getTCloudFile: function (list, funcCallback, num) {
    let self = this
    if (!num) num = 1
    if (!list && list.length === 0) {
      funcCallback()
      return
    }
    if (num > list.length) {
      funcCallback(list)
      return
    }
    // 替换成用户的 Bucket
    var Bucket = FileConfig.bucket
    // TODO 这里理论上根据客户端的位置进行切换 替换成用户的 Region
    var Region = FileConfig.region
    // 初始化实例
    var cos = new COS({
      Protocol: 'https:',
      getAuthorization: function (options, callback) {
        axios({
          method: 'post',
          url: FileConfig.authorizationUrl,
          data: {
            method: 'get',
            pathname: '/' + options.Key
          }
        }).then(function (response) {
          callback(response.data.authorization)
        }).catch(function (error) {
          // TODO 失败的操作
          console.log(error)
        })
      }
    })
    cos.getObjectUrl({
      Bucket: Bucket,
      Region: Region,
      Key: list[num - 1]['filePath'],
      Expires: 60
    }, function (err, data) {
      if (!err) {
        list[num - 1]['url'] = data.Url
        list[num - 1]['errorImg'] = ''
        list[num - 1]['angle'] = 0
        self.getTCloudFile(list, funcCallback, num + 1)
      }
    })
  },
  resizeFile: function (files, maxSize, callback, fileList, i) {
    let self = this
    if (!i) i = 0
    if (!fileList) fileList = []
    if (typeof (FileReader) === 'undefined') {
      callback(files)
      return
    }
    if (!files && files.length === 0) {
      callback(files)
      return
    }
    if (maxSize <= 0) {
      callback(files)
      return
    }
    if (i === files.length) {
      callback(fileList)
      return
    }
    let file = files[i]
    if (file.size < maxSize) {
      fileList[i] = file
      i++
      self.resizeFile(files, maxSize, callback, fileList, i)
      return
    }
    let ready = new FileReader()
    ready.readAsDataURL(file)
    ready.onload = function () {
      let self1 = this
      let path = self1.result
      let img = new Image()
      img.src = path
      img.onload = function () {
        let self2 = this
        let w = self2.width
        let h = self2.height
        let quality = maxSize / file.size

        // 生成canvas
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 创建属性节点
        let anw = document.createAttribute('width')
        anw.nodeValue = w
        let anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(self2, 0, 0, w, h)
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality)
        let blob = self.base64ToBlob(base64, file.type)
        let finalFile = new File([blob], file.name, {type: file.type})
        fileList[i] = finalFile
        i++
        self.resizeFile(files, maxSize, callback, fileList, i)
      }
    }
  },
  base64ToBlob: function (base64URL, filetype) {
    var format = filetype
    var base64 = base64URL
    var code = window.atob(base64.split(',')[1])
    var aBuffer = new window.ArrayBuffer(code.length)
    var uBuffer = new window.Uint8Array(aBuffer)
    for (var i = 0; i < code.length; i++) {
      uBuffer[i] = code.charCodeAt(i) & 0xff
    }
    var blob = null
    try {
      blob = new Blob([uBuffer], { type: format })
    } catch (e) {
      window.BlobBuilder = window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder
      if (e.name === 'TypeError' && window.BlobBuilder) {
        var bb = new window.BlobBuilder()
        bb.append(uBuffer.buffer)
        blob = bb.getBlob(filetype)
      } else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {type: format})
      } else {
      }
    }
    return blob
  }
}

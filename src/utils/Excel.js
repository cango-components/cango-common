import Utils from './Utils'
import XLSX from 'XLSX'
export default {
  /**
   * 根据参数进行Excel导出
   * @param fileName 文件名称
   * @param options   参数，可以数组可以对象(sheetName:sheet的名称,titleConfig:标题头,data:数据)
   */
  download: function (fileName, options) {
    if (!options) return
    let sheetConfig = []
    if (!Utils.isArray(options)) {
      sheetConfig.push(options)
    } else {
      sheetConfig = options
    }
    let sheetNames = []
    let sheets = {}
    for (let i = 0; i < sheetConfig.length; i++) {
      let sheetName = 'Sheet' + (i + 1)
      if (sheetConfig[i].sheetName) {
        sheetName = sheetConfig[i].sheetName
      }
      let tmpdata = {}
      let keys = {}
      if (!sheetConfig[i].titleConfig) {
        console.log('titleConfig error')
        return
      }
      let titleNum = 0
      for (let index in sheetConfig[i].titleConfig) {
        keys[index] = titleNum
        tmpdata[this.getCharCol(titleNum) + '1'] = {v: sheetConfig[i].titleConfig[index]}
        titleNum++
      }
      if (sheetConfig[i].data) {
        for (let k = 0; k < sheetConfig[i].data.length; k++) {
          for (let key in keys) {
            let v = Utils.getRecordValue(sheetConfig[i].data[k], key, '')
            tmpdata[this.getCharCol(keys[key]) + (2 + k)] = {v: v}
          }
        }
      }
      sheetNames.push(sheetName)
      let outputPos = Object.keys(tmpdata)
      // 设置填充区域
      let ref = {
        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]
      }
      sheets[sheetName] = Object.assign({}, tmpdata, ref)
    }
    let tmpWB = {
      SheetNames: sheetNames,
      Sheets: sheets
    }
    let tmpDown = new Blob(
      [this.s2ab(XLSX.write(tmpWB, {bookType: 'xlsx', bookSST: false, type: 'binary'}))],
      {type: ''}
    )
    let href = URL.createObjectURL(tmpDown)
    let a = document.createElement('a')
    a.href = href
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    setTimeout(function () { // 延时释放
      document.body.removeChild(a)
      URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 200)
  },
  s2ab: function (s) {
    // 字符串转字符流
    let buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  },
  getCharCol: function (n) {
    let s = ''
    let m = 0
    while (n >= 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },
  read: function (file, callback) {
    let fileReader = new FileReader()
    fileReader.onload = (ev) => {
      try {
        let data = ev.target.result
        let workbook = XLSX.read(data, {
          type: 'binary'
        })
        let sheets = {}
        for (let sheet in workbook.Sheets) {
          // 获得以第一列为键名的sheet数组对象
          let sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          sheets[sheet] = sheetArray
        }
        if (callback) {
          callback(sheets)
        }
      } catch (e) {
        console.log('文件类型不正确！')
      }
    }
    fileReader.readAsBinaryString(file)
  }
}

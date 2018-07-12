
export default {
  authorizationUrl: 'http://172.81.207.83:8661/scf/infc/api/getCOSAuthorization',
  createFileGroupUrl: 'http://10.43.22.82:8888/pinkiepie/mFileSave/createFileGroup',
  findByGroupIdUrl: 'http://10.43.22.82:8888/pinkiepie/mFileSave/findByGroupId',
  bucket: 'image-1256119235',
  region: 'ap-shanghai',
  setConfig: function (option) {
    if (option) {
      this.authorizationUrl = option.authorizationUrl ? option.authorizationUrl : this.authorizationUrl
      this.createFileGroupUrl = option.createFileGroupUrl ? option.createFileGroupUrl : this.createFileGroupUrl
      this.findByGroupIdUrl = option.findByGroupIdUrl ? option.findByGroupIdUrl : this.findByGroupIdUrl
      this.bucket = option.bucket ? option.bucket : this.bucket
      this.region = option.region ? option.region : this.region
    }
  }
}

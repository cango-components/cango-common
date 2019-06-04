
export default {
  // authorizationUrl: 'https://prd-service.999haoche.com/scf/infc/api/getCOSAuthorization',
  authorizationUrl: 'https://backstage.999haoche.com/scf/infc/api/getCOSAuthorization',
  createFileGroupUrl: 'https://test-train-service.999haoche.com:8888/train/cangoFileBase/create',
  findByGroupIdUrl: 'https://test-train-service.999haoche.com:8888/train/cangoFileBase/findById',
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

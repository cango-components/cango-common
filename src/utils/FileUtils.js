function guid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function uploadFile(fileList, result, funcCallback, prefix, num){
	var Bucket = 'image-1256119235'; // 替换成用户的 Bucket
	var Region = 'ap-shanghai';      // TODO 这里理论上根据客户端的位置进行切换 替换成用户的 Region
	
	
	if(!num) num = 1;
	if(!fileList && fileList.length == 0){
		funcCallback(result);
		return;
	}
	if(num > fileList.length){
		funcCallback(result);
		return;
	}
	let fileName  = prefix + '/' + guid() + fileList[num - 1].name;
	// 初始化实例
	var cos = new COS({
		getAuthorization: function (options, callback) {
			axios({
				method  : 'post',
				url     : 'http://172.81.207.83:8661/scf/infc/api/getCOSAuthorization',
				data    : {
					method   : options.Method.toLowerCase(),
					pathname : '/' + options.Key
				}
			}).then(function(response) {
				callback(response.data.authorization);
			}).catch(function (error) {
				// TODO 失败的操作
				console.log(error);
			});
		}
	});
    cos.putObject({
        Bucket: Bucket,
        Region: Region,
        Key:    fileName,
        Body:   fileList[num-1],
    }, function (err, data) {
		if(!err){
			result[num-1] = {};
			result[num - 1]["filePath"] = fileName;
			result[num - 1]["url"]      = "";
			result[num - 1]["errorImg"] = "";
			uploadFile(fileList, result, funcCallback, prefix, num + 1);
		}
    });
	
}
function createGroupId(fileList, callback){
	if(!fileList || fileList.length == 0){
		return null;
	}
	let keyList = [];
	for(let i = 0; i < fileList.length; i++){
		keyList.push(fileList[i].filePath);
	}
	// 文件打包功能
	axios({
	    method  : 'post',
	    url     : 'http://10.43.22.82:8888/pinkiepie/mFileSave/createFileGroup',
		headers : {
			"Content-Type": "application/json"
		},
	    data    : {
			// TODO 用户ID
			userId     : "10000",
			entityList : [{
				key: keyList
			}]
	    }
	}).then(function(response) {
		if(response && response.data && response.data.code == 200){
			if(callback && response.data.result[0]){
				callback(response.data.result[0].groupId);
			}
		}else{
			// TODO 失败的操作
			console.log(response);
		}
	}).catch(function (error) {
		// TODO 失败的操作
		console.log(error);
	});
}


function getFileList(fileGroupId, callback){
	axios({
	    method  : 'post',
	    url     : 'http://10.43.22.82:8888/pinkiepie/mFileSave/findByGroupId',
		headers : {
			"Content-Type": "application/json"
		},
	    data    : {
		    imgIds: [fileGroupId]
	    }
	}).then(function(response) {
		if(response && response.data && response.data.code == 200){
			getTCloudFile(response.data.result, callback);
		}else{
			// TODO 失败的操作
			console.log(response);
		}
	}).catch(function (error) {
		// TODO 失败的操作
		console.log(error);
	});
}

function getTCloudFile(list, funcCallback, num){
	if(!num) num = 1;
	if(!list && list.length == 0){
		funcCallback();
		return;
	}
	if(num > list.length){
		funcCallback(list);
		return;
	}
	var Bucket = 'image-1256119235'; // 替换成用户的 Bucket
	var Region = 'ap-shanghai';      // TODO 这里理论上根据客户端的位置进行切换 替换成用户的 Region
	
	// 初始化实例
	var cos = new COS({
		getAuthorization: function (options, callback) {
			axios({
				method  : 'post',
				url     : 'http://172.81.207.83:8661/scf/infc/api/getCOSAuthorization',
				data    : {
					method: "get",
					pathname : '/' + options.Key
				}
			}).then(function(response) {
				callback(response.data.authorization);
			}).catch(function (error) {
				// TODO 失败的操作
				console.log(error);
			});
		}
	});
	cos.getObjectUrl({
		Bucket  : Bucket,
		Region  : Region,
		Key     : list[num- 1]["filePath"],
		Expires : 60
	}, function (err, data) {
		if(!err){
			list[num - 1]["url"]      = data.Url;
			list[num - 1]["errorImg"] = "";
			getTCloudFile(list, funcCallback, num + 1);
		}
	});
}
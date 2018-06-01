

		
/**
 * 获取record对应的keyname的值，keyname进行"-"分割用于深层次访问，如果没有返回defaultValue
 *
 */
function getRecordValue (record, keyName, defaultValue) {
	if(!defaultValue) defaultValue = "";
	if(record === null || record === undefined){
		return defaultValue;
	}
	if(keyName === null || keyName === undefined){
		return record;
	}
	let keyNameList = keyName.split("-");
	let value = record;
	for(let i = 0; i < keyNameList.length; i++){
		if(value[keyNameList[i]] === null || value[keyNameList[i]] === undefined){
			value = defaultValue;
			break;
		}else{
			value = value[keyNameList[i]];
		}
	}
	
	return value;
}

/* 是否纯粹object */
function isPlainObject(o) {
	if (!o || o === window || o === document || o === document.body) {
		return false;
	}
	return Object.prototype.toString.call(o) === '[object Object]';
}
		
function isArray (list) {
	if(!list) return false;
	return (list instanceof Array);
}

function clone(obj) {
    var o;
    if (typeof obj == "object") {
       if (obj === null) {
           o = null;
       } else {
           if (obj instanceof Array) {
               o = [];
               for (var i = 0, len = obj.length; i < len; i++) {
                   o.push(clone(obj[i]));
               }
           } else {
               o = {};
               for (var j in obj) {
                   o[j] = clone(obj[j]);
               }
           }
       }
    } else {
        o = obj;
    }
    return o;
}

/**
 * TODO 数组处理还要再改下
 * 数据merge类方法
 * to的数据作为默认值将from的数据merge到to里面
 * @param  to   数据本身
 * @param  from 来源数据
 * @param  mergeType 合并方式(支持:left,right,outer,inner;默认left)
 * @return to
 */
function mergeObject (to, from, mergeType) {
	// 默认left，支持大小写
	if (!mergeType) {
		mergeType = "left";
	} else {
		mergeType = mergeType.toLowerCase();
	}
    if (!from) {
		if(mergeType == "outer" || mergeType == "left"){
			return to;
		} else {
			// 设置为null会不会影响到vue组件的功能(指针发生偏移，不确认是否会影响到view的控件渲染，后续持续观察，如果影响会考虑把内部所有变量设置为null来处理)
			to = null;
			return to;
		}
	}
    if (!to) {
		if(mergeType == "left" || mergeType == "inner"){
			return to;
		} else {
			to = {};
		}
	}
    var key, toVal, fromVal;
    var toKeys = Object.keys(to);
    var keys   = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
        key     = keys[i];
		if(toKeys.indexOf(key) >= 0){
			toKeys.splice(toKeys.indexOf(key), 1);
		}
        toVal   = to[key];
        fromVal = from[key];
		if(to[key] == undefined){
			if(mergeType == "left" || mergeType == "inner"){
				continue;
			} else {
				if(from[key] == undefined || from[key] == null){
					continue;
				}else{
				    // 判断是否简单类型，简单类型直接覆盖，非简单类型，递归
					if((typeof from[key]) == "object"){
						if(isArray(from[key])){
							to[key] = [];
							for(var k = 0; k < from[key].length; k++){
								to[key][k] = {};
								// list的时候是不会有默认数据的，所以以right为准
								mergeObject(to[key][k], from[key][k], "right");
							}
						} else {
							to[key] = {};
							mergeObject(to[key], from[key], mergeType);
						}
					} else {
						to[key] = from[key];
					}
				}
			}
		}else{
			if(from[key] == undefined || from[key] == null){
				if(mergeType == "left" || mergeType == "outer"){
					if(to[key] && isArray(to[key])){
						to[key] = [];
					}
					continue;
				}else{
					// 设置为null会不会影响到vue组件的功能(指针发生偏移，不确认是否会影响到view的控件渲染，后续持续观察，如果影响会考虑把内部所有变量设置为null来处理)
					to[key] = null;
				}
			}else{
				// 判断是否简单类型，简单类型直接覆盖，非简单类型，递归
				if((typeof from[key]) == "object"){
					if(isArray(from[key])){
						var hasDemo = false;
						var demo    = null;
						// 针对数组的，我们认为第一个数组是demo
						if(to[key] && to[key][0]){
							demo    = clone(to[key][0]);
							hasDemo = true;
						}
						// 这里可能会有指向问题，需要注意
						to[key] = [];
						for(var k = 0; k < from[key].length; k++){
							to[key][k] = {};
							if(hasDemo){
								to[key][k] = clone(demo);
								// 有demo的时候以demo为准
								mergeObject(to[key][k], from[key][k], mergeType);
							}else{
								// 没有demo时以right为准
								mergeObject(to[key][k], from[key][k], "right");
							}
						}
					} else {
						to[key] = {};
						mergeObject(to[key], from[key], mergeType);
					}
				} else {
					to[key] = from[key];
				}
			}
		}
    }
	for (var i = 0; i < toKeys.length; i++) {
		if(mergeType == "right" || mergeType == "inner"){
			to[toKeys[i]] = null;
		} else {
			if(isArray(to[toKeys[i]])){
				to[toKeys[i]] = [];
			}
		}
	}
    return to
}

/* 从url地址中获取变量 */
function getFromRequest(key) {
	var url = location.search,
		reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	if (url.indexOf("?") != -1) {
		var r = url.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
	}
	return null;
}
		
		
/* 跳转链接 */
function linkUrl(url, params, target) {
	var start = "?";
	if (url.indexOf("?") >= 0) {
		start = "&";
	}
	if (!params) {
		params = {};
	}
	var request = "";
	for (var key in params) {
		if (isArray(params[key])) {
			for (var key1 in params[key]) {
				request += start + encodeURIComponent(key) + "=" + encodeURIComponent(params[key][key1]);
				start = "&";
			}
		} else {
			request += start + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
			start = "&";
		}
	}
	if (target && target == "_blank") {
		window.open(url + request);
	} else {
		window.location = url + request;
	}
}

/* 跳转链接并清空当前访问的url列表(不能前进或后退) */
function replaceUrl(url, params) {
	var start = "?";
	if (url.indexOf("?") >= 0) {
		start = "&";
	}
	if (!params) {
		params = {};
	}
	var request = "";
	for (var key in params) {
		if ($.MosFunc.utils.isArray(params[key])) {
			for (var key1 in params[key]) {
				request += start + encodeURIComponent(key) + "=" + encodeURIComponent(params[key][key1]);
				start = "&";
			}
		} else {
			request += start + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
			start = "&";
		}
	}
	location.replace(url + request);
}


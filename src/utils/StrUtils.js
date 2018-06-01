
    var escapeChars = {
        lt: '<',
        gt: '>',
        quot: '"',
        amp: '&',
        apos: "'"
    };

    var reversedEscapeChars = {};
    for (var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
    reversedEscapeChars["'"] = '#39';
	
	/* 删除字符串两边空白 */
	function trim(str) {
	   if ($.MosFunc.utils.isString(str)) {
		   return str.replace(/^\s+|\s+$/, '');
	   } else {
		   return str;
	   }
	}

	/* 删除字符串左边空白 */
	function ltrim(str) {
		return str.replace(/^\s+/, '');
	}

	/* 删除字符串右边空白 */
	function rtrim(str) {
		return str.replace(/\s+$/, '');
	}

	/* 是否空白 */
	function isBlank(str) {
		if (str == null) return true;
		return (/^\s*$/).test(str);
	}

	/* 去除字符串中的html标签 */
	function stripTags(str) {
		if (str == null) return '';
		return String(str).replace(/<\/?[^>]+>/g, '');
	}

	/* 字符串以什么开头 */
	function startsWith(str, starts) {
		if (starts === '') return true;
		if (str == null || starts == null) return false;
		str = String(str);
		starts = String(starts);
		return str.length >= starts.length && str.slice(0, starts.length) === starts;
	}

	/* 字符串以什么结尾 */
	function endsWith(str, ends) {
		if (ends === '') return true;
		if (str == null || ends == null) return false;
		str = String(str);
		ends = String(ends);
		return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
	}

	/* 字符串进行html编码用于静态页面输出 */
	function escapeHTML(str) {
		if (str == null) return '';
		return String(str).replace(/[&<>"']/g, function (m) {
			return '&' + reversedEscapeChars[m] + ';';
		});
	}

	/* 字符串进行html解码 */
	function unescapeHTML(str) {
		if (str == null) return '';
		return String(str).replace(/\&([^;]+);/g, function (entity, entityCode) {
			var match;

			if (entityCode in escapeChars) {
				return escapeChars[entityCode];
			} else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
				return String.fromCharCode(parseInt(match[1], 16));
			} else if (match = entityCode.match(/^#(\d+)$/)) {
				return String.fromCharCode(~~match[1]);
			} else {
				return entity;
			}
		});
	}

	/* 全部替换 */
	function replaceAll(str, s1, s2) {
		return str.replace(new RegExp(s1, "gm"), s2);
	}

	/* 是否数字，排除NaN */
	function isNum(str) {
		if (str === "" || str === null || str === undefined) {
			return false;
		}
		return (!isNaN(str));
	}

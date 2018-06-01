

	/* 字符串转日期 */
	function strToDate(str, dateFormat) {
		if (!dateFormat) {
			dateFormat = "yyyy-MM-dd HH:mm:ss";
		}
		if (!str) {
			return null;
		}
		let matchs1 = pattern.match(/([yYMdDhHsSm])(\1*)/g);
		let matchs2 = dateString.match(/(\d)+/g);
		if (matchs1.length == matchs2.length) {
			let _date = new Date(1970, 0, 1);
			_date.setHours(0);
			_date.setMinutes(0);
			_date.setSeconds(0);
			for (let i = 0; i < matchs1.length; i++) {
				let _int = parseInt(matchs2[i]);
				let sign = matchs1[i];
				switch (sign.charAt(0)) {
					case 'y': _date.setFullYear(_int); break;
					case 'M': _date.setMonth(_int - 1); break;
					case 'd': _date.setDate(_int); break;
					case 'h': _date.setHours(_int); break;
					case 'm': _date.setMinutes(_int); break;
					case 's': _date.setSeconds(_int); break;
				}
			}
			return _date;
		}
		return null;
	};

	/* 日期格式化 */
	function format(Date, formatStr) {
		if (Date == "Invalid Date" || !Date) {
			return null;
		}
		var str = formatStr;
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str = str.replace(/yyyy|YYYY/, Date.getFullYear());
		str = str.replace(/yy|YY/, (Date.getYear() % 100) > 9 ? (Date.getYear() % 100).toString() : '0' + (Date.getYear() % 100));

		str = str.replace(/MM/, (Date.getMonth() + 1) > 9 ? (Date.getMonth() + 1).toString() : '0' + (Date.getMonth() + 1));
		str = str.replace(/M/g, (Date.getMonth() + 1));

		str = str.replace(/w|W/g, Week[Date.getDay()]);

		str = str.replace(/dd|DD/, Date.getDate() > 9 ? Date.getDate().toString() : '0' + Date.getDate());
		str = str.replace(/d|D/g, Date.getDate());

		str = str.replace(/hh|HH/, Date.getHours() > 9 ? Date.getHours().toString() : '0' + Date.getHours());
		str = str.replace(/h|H/g, Date.getHours());
		str = str.replace(/mm/, Date.getMinutes() > 9 ? Date.getMinutes().toString() : '0' + Date.getMinutes());
		str = str.replace(/m/g, Date.getMinutes());

		str = str.replace(/ss|SS/, Date.getSeconds() > 9 ? Date.getSeconds().toString() : '0' + Date.getSeconds());
		str = str.replace(/s|S/g, Date.getSeconds());
		return str;
	}
	
	
	
	
	/* 获取指定日期过去或未来第n周的周一(n=0为当周) */
	function getWeekStartDate(srcDate, formatStr, n) {
		if (!srcDate) {
			return null;
		}

		if (srcDate == "Invalid Date") {
			return null;
		}

		if (!n) {
			n = 0;
		}

		var dayOfWeek = srcDate.getDay() - 1; //今天当周的第几天（周一为第一天）
		var day = srcDate.getDate(); //当前日
		var month = srcDate.getMonth(); //当前月
		var year = srcDate.getYear(); //当前年
		year += (year < 2000) ? 1900 : 0;
		dayOfWeek += (dayOfWeek < 0) ? 7 : 0;
		var weekStartDate = new Date(year, month, day - dayOfWeek - (n * 7));

		return format(weekStartDate, formatStr);
	}

	/* 获取指定日期所在周的周日 */
	function getWeekEndDate(srcDate, formatStr) {
		if (!srcDate) {
			return null;
		}

		if (srcDate == "Invalid Date") {
			return null;
		}

		var dayOfWeek = srcDate.getDay() - 1; //今天当周的第几天（周一为第一天）
		var day = srcDate.getDate(); //当前日
		var month = srcDate.getMonth(); //当前月
		var year = srcDate.getYear(); //当前年
		year += (year < 2000) ? 1900 : 0;
		var weekStartDate = new Date(year, month, day - dayOfWeek + 6);

		return format(weekStartDate, formatStr);
	}

	/* 获取指定日期为周几 */
	function getDayOfWeek(str, preStr) {
		if (!preStr) {
			preStr = "周";
		}
		var date = $.MosFunc.base.strToDate(str);
		return preStr + "日一二三四五六".split("")[date.getDay()];
	}


	/* 校验两个字符串日期是否属于同一周 */
	function checkWeek(newDate, oldDate) {

		var newDays = Date.parse(newDate) / (1000 * 60 * 60 * 24);
		var oldDays = Date.parse(oldDate) / (1000 * 60 * 60 * 24);

		return Math.floor((newDays + 4) / 7) == Math.floor((oldDays + 4) / 7);
	}
		
		
		
	/* TODO 获取当前月份 */
	function getCurrentMonth() {
		return $.MosFunc.base.format(new Date(), $.MosBase.Constant.monthFormatDay);
	}

	/* TODO 获取上个月份 */
	function getPrevMonth(format) {
		var now = new Date();
		now.setDate(1);
		var prevMonth = new Date(now.setMonth(now.getMonth() - 1));
		format = format || $.MosBase.Constant.monthFormatDay;
		return $.MosFunc.base.format(prevMonth, format);
	}

	/* TODO 获取下个月份 */
	function getNextMonth(format) {
		var now = new Date();
		now.setDate(1);
		var nextMonth = new Date(now.setMonth(now.getMonth() + 1));
		format = format || $.MosBase.Constant.monthFormatDay;
		return $.MosFunc.base.format(nextMonth, format);
	}
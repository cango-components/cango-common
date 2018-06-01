<template>
	<div class = "cg-tree__base" >
		<div v-if="filter" class = "cg-tree__filter" >
			<input type = "text" v-model="filterText" v-bind:placeholder = "filterPlaceholder">
		</div>
		<div  class = "cg-tree__main">
			<div v-for="node in getList" @click="treeNodeSelect(node)" class = "cg-tree__node">
				{{ node.level }} {{ showRecordName(node.record) }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : "cg-tree",
    props: {
		// 和data配合使用，去data里面对应的showName的值作为显示(-做分割进行深层次访问)
		'showName'      : {
			type    : String,
			default : "name"
		},
		// 和data配合使用，去data里面对应的childName的值作为子节点列表(-做分割进行深层次访问)
		'childName'      : {
			type    : String,
			default : "child"
		},
		// 展示的函数，优先级再showName之前，复杂展示方式的时候使用，这里考虑用插槽实现
		'showFunc'      : {
			type    : Function
		},
		// 候选项
		'list'          : {
			type    : Array,
			default : function(){
				return [];
			}
		},
		// 选中事件
		'onSelected'    : {
			type    : Function
		},
		// 是否显示筛选器(在已知的节点范围内进行检索，最好配合list一次性加载，否则只检索已知数据)
		'filter'        : {
			type    : Boolean,
			default : false
		},
		// 是否忽略大小写
		'filterIgnore' : {
			type    : Boolean,
			default : true
		},
		// 筛选器默认文字
		'filterPlaceholder' : {
			type    : String,
			default : "请选择"
		},
	},
	created : function(){
		// 刷新树图
		this.recordList = this.resizeRecordList(this.list, 1, false);
	},
	data : function(){
		return {
			recordList  : [],
			filterText  : ""
		};
	},
	computed: {
		getList  : function(){
			let finalList = [];
			if(this.recordList){
				let preLevel     = 0;
				let preShowChild = true;
				for(let i = 0; i < this.recordList.length; i++){
					if(this.recordList[i].level > preLevel){
						if(!preShowChild){
							continue;
						}
						finalList.push(this.recordList[i]);
					}else{
						finalList.push(this.recordList[i]);
					}
					preLevel     = this.recordList[i].level;
					preShowChild = this.recordList[i].showChild;
				}
			}
			return finalList;
		},
	},
	methods : {
		filterLike : function(record){
			if(this.filterText == "") return true;
			let filterText = this.filterText + "";
			let text       = this.showRecordName(record) + "";
			if(this.filterIgnore){
				filterText = filterText.toLowerCase();
				text       = text.toLowerCase();
			}
			if(text.indexOf(filterText) >= 0){
				return true;
			}else{
				return false;
			}
		},
		
		showRecordName : function(record){
			if(this.showFunc){
				return this.showFunc(record);
			}else{
				return record[this.showName];
			}
		},
		treeNodeSelect : function(record){
			record.showChild = !record.showChild;
			if(this.onSelected){
				this.onSelected(record.record, record.showChild);
			}
		},
		resizeRecordList : function(list, level, parentIsOk){
			let result = [];
			if(!level) level = 1;
			if(this.list){
				for(let i = 0; i < list.length; i++){
					if(parentIsOk || this.filterLike(list[i])){
						result.push({record : list[i], level : level, showChild : this.searchShowChild(list[i])});
						if(list[i][this.childName]){
							let res = this.resizeRecordList(list[i][this.childName], level + 1, true);
							if(res != null && res.length > 0){
								result = result.concat(res);
							}
						}
					}else{
						if(list[i][this.childName]){
							let res = this.resizeRecordList(list[i][this.childName], level + 1, false);
							if(res != null && res.length > 0){
								result.push({record : list[i], level : level, showChild : true});
								result = result.concat(res);
							}
						}else{
							continue;
						}
					}
				}
			}
			return result;
		},
		resetRecordList : function(list, level, parentIsOk){
			let result = [];
			if(!level) level = 1;
			if(this.list){
				for(let i = 0; i < list.length; i++){
					if(parentIsOk || this.filterLike(list[i])){
						result.push({record : list[i], level : level, showChild : false});
						if(list[i][this.childName]){
							let res = this.resetRecordList(list[i][this.childName], level + 1, true);
							if(res != null && res.length > 0){
								result = result.concat(res);
							}
						}
					}else{
						if(list[i][this.childName]){
							let res = this.resetRecordList(list[i][this.childName], level + 1, false);
							if(res != null && res.length > 0){
								result.push({record : list[i], level : level, showChild : true});
								result = result.concat(res);
							}
						}else{
							continue;
						}
					}
				}
			}
			return result;
		},
		searchShowChild : function(record){
			for(let i = 0; i < this.recordList.length; i++){
				if(this.recordList[i].record == record){
					return this.recordList[i].showChild;
				}
			}
			return false;
		}
	},
	watch : {
		list: {
			handler: function (val, oldVal) {
				// 刷新树图
				this.recordList = this.resizeRecordList(this.list, 1, false);
			},
			deep: true
		},
		filterText(oldValue, newValue){
			// 刷新树图
			this.recordList = this.resetRecordList(this.list, 1, false);
		},
	},
}
</script>

<style lang="less" scoped>
</style>

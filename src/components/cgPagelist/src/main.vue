<template>
	<div class = "cg-pageList__base" >
		<div class = "cg-pageList__title" >
			<div class = "cg-pageList__label" >
				<div class = "cg-pageList__checkall" @click="checkall()" ></div>
			</div>
			
			<div v-for="title in titleConfig" @click="orderClick(title)" v-bind:class="getOrderClass(title)" class = "cg-pageList__label">
				{{ title.label }}
			</div>
		</div>
		<div class = "cg-pageList__data">
			<div v-for="record in list" class = "cg-pageList__content">
				<div class = "cg-pageList__check" >
					<!--
					<div class = "cg-pageList__checkbox" @click="check(record)" :class="isChecked(record) ? 'cg-pageList__checkbox-checked' : ''"  >
					-->
					<input type="checkbox" @click="check(record)" :checked = "isChecked(record)">
					<!--
					</div>
					-->
				</div>
				<div class = "cg-pageList__record" @click="rowClick(record)" >
					<template v-for="title in titleConfig" >
						{{ showRecordName(record, title) }}
					</template>
				</div>
			</div>
		</div>
		<div class = "cg-pageList__page">
			一共 {{ this.page.totalNum }} 条记录,
			当前 {{ this.page.pageNo }} 页
			<!--UI定义以后进行分页功能的封装-->
		</div>
	</div>
</template>

<script>
export default {
	name : "cg-pagelist",
    props: {
		// 分页信息
		'page'         : {
			default : {
				pageSize : 20,
				pageNo   : 1,
				totalNum : 0
			}
		},
		// 排序展示(keyname:排序的主键;orderBy:asc/desc顺序逆序)
		'initOrder'    : {
			default : {
				keyName : "",
				orderBy : ""
			}
		},
		// 数据
		'list'         : {
			type    : Array,
			default : []
		},
		// 标题配置{orderAble:是否可以排序,label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}
		"titleConfig"  : {
			type    : Array,
			default : []
		},
		// 是否显示勾选功能
		"showCheckBox"  : {
			type    : Boolean,
			default : true
		},
		// 选中的记录
		'value'     : {
			default : null
		},
		// 数据加载方法(排序，分页等都会触发，返回data,page,order对象)
		"loadFunction" : {
			type : Function
		},
		// 行点击事件
		"rowClickFunction" : {
			type : Function
		},
	},
	created : function(){
	},
	data : function(){
		return {
			order : {
				keyName : this.initOrder.keyName,
				orderBy : this.initOrder.orderBy
			},
		};
	},
	computed: {

	},
	methods : {
		checkall   : function(){
			let value = [];
			if(this.list){
				for(let i = 0; i < this.list.length; i++){
					value.push(this.list[i]);
				}
			}
			this.resizeValue(value);
		},
		check      : function(record){
			let value = [];
			if(this.value){
				for(let i = 0; i < this.value.length; i++){
					value.push(this.value[i]);
				}
			}
			for(let k = 0; k < value.length; k++){
				if(record == value[k]){
					value.splice(k, 1);
					this.resizeValue(value);
					return;
				}
			}
			value.push(record);
			this.resizeValue(value);
		},
		resizeValue : function(value){
			this.$emit('input', value);
		},
		rowClick   : function(record){
			if(this.rowClickFunction){
				this.rowClickFunction(record);
			}
		},
		orderClick : function(title){
			if(this.loadFunction && title.orderAble){
				let order = clone(this.order);
				let page = clone(this.page);
				if(title.keyName == order.keyName){
					if(order.orderBy == "desc"){
						order.orderBy == "asc";
					}else{
						order.orderBy == "desc";
					}
				}else{
					order.keyName = title.keyName;
					order.orderBy = "asc";
				}
				this.loadFunction(page, order);
			}
		},
		showRecordName : function(record, title){
			let keyName      = title.keyName;
			let showFunction = title.showFunction;
			if(showFunction){
				return showFunction(record);
			}else{
				return getRecordValue(record, keyName);
			}
		},
		getOrderClass : function(title){
			let className = "";
			if(title.keyName == this.order.keyName){
				className = "cg-pageList__" + this.order.orderBy;
			}
			return className;
		},
		toPage : function(pageNo){
			if(this.loadFunction){
				let page = clone(this.page);
				page.pageNo = pageNo;
				this.loadFunction(page, this.order);
			}
		},
		isChecked : function(record){
			if(this.value){
				for(let i = 0; i < this.value.length; i++){
					if(record == this.value[i]){
						return true;
					}
				}
			}
			return false;
		},
	},
	watch : {
		list(oldValue, newValue){
			this.resizeValue([]);
		}
	},
}
</script>

<style lang="less" scoped>
</style>

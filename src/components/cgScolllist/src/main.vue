<template>
	<div class = "cg-scollList__base" >
		<div class = "cg-scollList__title" >
			<div v-for="title in titleConfig"  class = "cg-scollList__label">
				{{ title.label }}
			</div>
		</div>
		<div class = "cg-scollList__data">
			<div v-for="record in list" class = "cg-scollList__content">
				<div class = "cg-scollList__record" @click="rowClick(record)" >
					<template v-for="title in titleConfig" >
						{{ showRecordName(record, title) }}
					</template>
				</div>
			</div>
		</div>
		<div v-if="hasMore" class = "cg-scollList__page" @click="showMore()" >
			点击显示更多
		</div>
	</div>
</template>

<script>
export default {
	name : "cg-scolllist",
    props: {
		// 数据
		'list'         : {
			type    : Array,
			default : []
		},
		// 标题配置{label:标题名称,keyName:对应的内容(-分割进行深层次访问),showFunction:自定义内容}
		"titleConfig"  : {
			type    : Array,
			default : []
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
		if(this.list && this.list.length > 0){
			this.hasMore = true;
		}else{
			this.hasMore = false;
		}
	},
	data : function(){
		return {
			hasMore : true,
		};
	},
	computed: {

	},
	methods : {
		rowClick   : function(record){
			if(this.rowClickFunction){
				this.rowClickFunction(record);
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
		showMore : function(){
			if(this.loadFunction){
				let data = [];
				if(this.list){
					this.loadFunction(this.list[this.list.length - 1]);
				}else{
					this.loadFunction(null);
				}
				this.hasMore = false;
			}
		},
	},
	watch : {
		list(oldValue, newValue){
			if(newValue && newValue.length > 0){
				this.hasMore = true;
			}else{
				this.hasMore = false;
			}
		}
	},
}
</script>

<style lang="less" scoped>
</style>

<template>
	<div class = "cg-tab__base" >
		<div class = "cg-tab__title" >
			<div v-for="tab in tabConfig" @click="active(tab)" v-bind:class="isActive(tab) ? 'cg-tab__active' : ''" class = "cg-tab__label">
				{{ tab.name }}
			</div>
		</div>
		<div class = "cg-tab__activetab">
			<slot v-bind:active-tab="activeTab"></slot>
		</div>
		
	</div>
</template>

<script>
export default {
	name : "cg-tab",
    props: {
		// 配置信息{id:是唯一标志，name是对应名称}
		'tabConfig'    : {
			type    : Array,
			default : []
		}
	},
	created : function(){
		this.resize();
	},
	data : function(){
		return {
			activeTab : null
		};
	},
	computed: {
	},
	methods : {
		resize : function(){
			let activeTab = null;
			if(this.tabConfig && this.tabConfig.length > 0){
				activeTab = this.tabConfig[0];
			}
			this.activeTab = activeTab;
		},
		active : function(tab){
			this.activeTab = tab;
		},
		isActive : function(tab){
			return tab == this.activeTab;
		}
	},
	watch : {
		value(newValue, oldValue){
			this.resize();
		}
	},
}
</script>

<style lang="less" scoped>
</style>

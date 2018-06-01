<template>
	<div class = "cg-form__base" >
		<slot></slot>
	</div>
</template>

<script>
export default {
	name : "cg-form",
	props: {
	},
	created : function(){
	},
	computed: {
	},
	methods : {
		valid : function(){
			let errorMsgList = [];
			if(this.$children && this.$children.length > 0){
				for(let i = 0; i < this.$children.length; i++){
					if(this.$children[i].valid){
						let errorMsg = this.$children[i].valid();
						if(!isBlank(errorMsg)){
							errorMsgList.push({id : this.$children[i].id, errorMsg : errorMsg});
						}
					}
				}
			}
			return errorMsgList;
		},
	},
	watch : {
	},
}
</script>

<style lang="less" scoped>
</style>

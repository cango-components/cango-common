<template>
  <div class = "cg-button__base" @click="click()" v-bind:class=" readOnly ? 'cango-button__readOnly' : ''" >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'cg-button',
  props: {
    // 下拉框标题
    'label'         : {
      type    : String,
      default : ""
    },
    // 是否readonly
    'readOnly'      : {
      type    : Boolean,
      default : false
    },
    // 下拉框最多选中数量(0:为不限制;1:为单选;)
    'buttonClick'     : {
      type    : Function
    },
  },
  computed: {
  },
  methods : {
    click : function(){
      if(!this.readOnly && this.buttonClick){
        this.buttonClick();
      }
    },
  }
}
</script>

<style lang="less" scoped>
</style>

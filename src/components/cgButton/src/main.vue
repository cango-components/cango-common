<template>
  <div
    :class = 'getClassName()'
    @click= 'click()'
  >
    <slot> {{ label }} </slot>
  </div>
</template>

<script>
export default {
  name: 'cg-button',
  props: {
    // 按钮文字
    'className': {
      type: String,
      default: 'cg-button__base'
    },
    // 按钮文字
    'label': {
      type: String,
      default: ''
    },
    // 是否readonly
    'readOnly': {
      type: Boolean,
      default: false
    },
    // 点击事件
    'buttonClick': {
      type: Function
    }
  },
  computed: {
  },
  methods: {
    click: function () {
      if (!this.readOnly && this.buttonClick) {
        this.buttonClick()
      }
    },
    getClassName: function () {
      let clsName = this.className
      if (this.readOnly) {
        clsName += ' ' + 'cango-button__readOnly'
      }
      return clsName
    }
  }
}
</script>

<style lang="less" scoped>
</style>

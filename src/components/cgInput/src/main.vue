<template>
  <div class="cg-input">
    <input class="cg-input__content" />
  </div>
</template>

<script>
export default {
  name: 'cg-input',
  prop: {
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      defalut: 'default'
    }
  }
}
</script>

<style lang="less" scoped>

</style>

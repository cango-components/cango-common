<template>
  <div class="cg-switch__base">
    <div v-if='label' class = 'cg-switch__label'>
      {{ label }}
      <div class="title-tips">
        <span>?</span>
        <div class="title-tips-content">werwerwerwwwwcvxcv你好多市第十六届房东岁的方</div>
      </div>
    </div>
    <div class='cg-switch' :class='switchClass' @click='clickHandle' >
      <div :class='label ? "cg-switch__btn cg-switch__have_label" : "cg-switch__btn"'></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'cg-switch',
  props: {
    // 标题
    'label': {
      type: String,
      default: ''
    },
    // ID
    'id': {
      type: String,
      default: ''
    },
    // 是否readonly
    'readonly': {
      type: Boolean,
      default: false
    },
    // 开关(true/false)
    value: {
      type: Boolean,
      default: false
    },
    // 提示信息
    'tip': {
      default: null
    }
  },
  data: function () {
    return {}
  },
  computed: {
    switchClass () {
      return [this.value ? 'selected' : '', this.readonly ? 'readonly' : '']
    }
  },
  methods: {
    clickHandle () {
      if (!this.readonly) {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

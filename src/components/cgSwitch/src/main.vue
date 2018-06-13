<template>
  <div class='cg-switch' :class='switchClass' @click='clickHandle' >
    <div v-if='label' class = 'cg-switch__label'>
      {{ label }}
    </div>
    <div :class='label ? "cg-switch__btn cg-switch__have_label" : "cg-switch__btn"'></div>
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
    'readOnly': {
      type: Boolean,
      default: false
    },
    // 开关(true/false)
    value: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {}
  },
  computed: {
    switchClass () {
      return [this.value ? 'selected' : '', this.readOnly ? 'readonly' : '']
    }
  },
  methods: {
    clickHandle () {
      if (!this.readOnly) {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

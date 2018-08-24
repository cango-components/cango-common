<template>
  <div class="cg-switch__base">
    <div v-if='label' class = 'cg-switch__label'>
      <div class="label">
       {{ label }}
      </div>
      <div v-if='tip' class="title-tips">
        <span>?</span>
        <div class="title-tips-content">{{ tip }}</div>
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
    return {
      valuein: this.value
    }
  },
  computed: {
    switchClass () {
      return [this.valuein ? 'selected' : '', this.readonly ? 'readonly' : '']
    }
  },
  methods: {
    clickHandle () {
      if (!this.readonly) {
        this.valuein = !this.valuein
        console.log(this.valuein)
        this.$emit('input', this.valuein)
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (this.valuein !== newValue) {
        this.valuein = newValue
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

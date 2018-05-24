<template>
  <div class="cg-switch" :class="switchClass" @click="clickHandle">
    <div class="cg-switch__btn"></div>
  </div>
</template>

<script>
export default {
  name: 'cg-switch',
  data () {
    return {
      selected: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.selected = this.value || false
  },
  computed: {
    switchClass () {
      return [this.selected ? 'selected' : '']
    }
  },
  methods: {
    clickHandle () {
      this.selected = !this.selected
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

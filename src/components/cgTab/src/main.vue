<template>
  <div class = 'cg-tab__base' >
    <div class = 'cg-tab__title' >
      <div v-for='(tab, index) in tabconfig'
           :key="index"
           @click='active(tab)'
           :class='isActive(tab) ? "cg-tab__active" : ""'
           class = 'cg-tab__label'>
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
  name: 'cg-tab',
  props: {
    // 配置信息{id:是唯一标志，name是对应名称}
    'tabconfig': {
      type: Array,
      default: []
    }
  },
  created: function () {
    this.resize()
  },
  data: function () {
    return {
      activeTab: null
    }
  },
  computed: {
  },
  methods: {
    resize: function () {
      let activeTab = null
      if (this.tabconfig && this.tabconfig.length > 0) {
        activeTab = this.tabconfig[0]
      }
      this.activeTab = activeTab
    },
    active: function (tab) {
      this.activeTab = tab
    },
    isActive: function (tab) {
      return tab === this.activeTab
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.resize()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

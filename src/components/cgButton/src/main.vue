<template>
  <div v-if="stop"
    :class = 'getClassName()' class="cg-button"
    @click.stop = "click"
  >
    <slot> {{ label }} </slot>
  </div>
  <div v-else
       :class = 'getClassName()' class="cg-button"
       @click = 'click'
  >
    <slot> {{ label }} </slot>
  </div>
</template>

<script>
export default {
  name: 'cg-button',
  props: {
    // 按钮文字
    'classname': {
      type: String,
      default: ''
    },
    // 按钮文字
    'label': {
      type: String,
      default: ''
    },
    // 是否readonly
    'readonly': {
      type: Boolean,
      default: false
    },
    // 是否组织冒泡
    'stop': {
      type: Boolean,
      default: true
    },
    // 点击事件
    'buttonclick': {
      type: Function
    }
  },
  data: function () {
    return {
      lastClickTime: 0
    }
  },
  computed: {
  },
  methods: {
    click: function () {
      if (!this.readonly && this.buttonclick) {
        let now = new Date().getTime()
        // 半秒内连续点击只生效一次
        if (now > this.lastClickTime + 500) {
          this.lastClickTime = now
          this.buttonclick()
        }
      }
    },
    getClassName: function () {
      let clsName = this.classname
      if (this.readonly) {
        clsName += ' ' + 'cango-button__readOnly'
      }
      return clsName
    }
  }
}
</script>

<style lang="less" scoped>
  .cg-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
  }
  .cg-button__default{}
  .cg-button__primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .cg-button__success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
  .cg-button__info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
  }
  .cg-button__warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  .cg-button__danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
  .round{
    border-radius: 20px;
    padding: 12px 23px;
  }
  .cg-button__primary.plain {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .cg-button__success.plain {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  .cg-button__info.plain {
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6;
  }
  .cg-button__warning.plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  .cg-button__danger.plain {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
</style>

<template>
  <div>
    <div v-if="type==='text'" class="cg-input" :class="inputClass">
      <input v-if="disabled" class="cg-input__content" disabled />
      <input v-else class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="maxlength" />
      <i v-if="clearable" class="cg-base-icon cg-icon__del" @click="del"></i>
    </div>
    <div v-if="type==='textarea'" class="cg-textarea">
      <textarea :cols="cols" :rows="rows" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="maxlength"></textarea>
    </div>
    <div v-if="type==='password'" class="cg-input" :class="inputClass">
      <input type="password" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="maxlength" />
      <i v-if="clearable" class="cg-base-icon cg-icon__del" @click="del"></i>
    </div>
  </div>
</template>

<script>
import { COMPONENT_SIZE, INPUT_CLEARABLE } from '../../../Constants.js'
export default {
  name: 'cg-input',
  data () {
    return {
      inpVal: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: { // 输入框的type类型
      type: String,
      default: 'text'
    },
    clearable: { // 是否有清空按钮
      type: Boolean,
      default: INPUT_CLEARABLE
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    size: { // 尺寸大小
      type: String,
      default: COMPONENT_SIZE
    },
    maxlength: { // 最大长度
      type: [String, Number]
    },
    cols: { // textarea 列数
      type: [String, Number]
    },
    rows: { // textarea 行数
      type: [String, Number],
      default: 2
    }
  },
  computed: {
    inputClass () {
      let base = 'cg-component-size__'
      return [`${base}${this.size}`, this.disabled ? 'cg-input--disabled' : '', this.clearable ? 'cg-input--clearable' : '']
    }
  },
  methods: {
    del () {
      this.inpVal = ''
    },
    inpHandle (e) {
      this.$emit('input', this.inpVal)
    }
  }
}
</script>

<style lang="less" scoped>
.base_box {
  display: box;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: -ms-box;
  align-items: center;
}
.base_flex {
  flex: 1;
  margin-left: 5px;
}
.cg-input {
  width: 100px;
  .base_box;
}
.cg-icon__del {
  .base_flex;
}
</style>

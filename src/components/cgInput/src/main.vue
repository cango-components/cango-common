<template>
  <div>
    <div v-if="label" class="cg-input__label" >
      {{ label }}
    </div>
    <div v-if="type==='text'" :class="inputClass" >
      <input @blur="blur" class="cg-input__content" :class="inputErrorClass" :placeholder="placeholder" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" />
      <i v-if="!readonly && clearable" class="cg-base-icon cg-icon__del" @click="del"></i>
    </div>
    <div v-if="type==='textarea'" :class="inputTextAreaClass" >
      <textarea @blur="blur" :cols="cols" :rows="rows" :class="inputErrorClass" :placeholder="placeholder" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" ></textarea>
    </div>
    <div v-if="type==='password'" :class="inputClass" >
      <input @blur="blur" type="password" :class="inputErrorClass" :placeholder="placeholder" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" />
      <i v-if="!readonly && clearable" class="cg-base-icon cg-icon__del" @click="del"></i>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'cg-input',
  props: {
    // 输入框的type类型
    type: {
      type: String,
      default: 'text'
    },
    // 是否有清空按钮
    clearable: {
      type: Boolean,
      default: false
    },
    // 尺寸大小
    size: {
      type: String,
      default: 'default'
    },
    // textarea 列数
    cols: {
      type: [String, Number]
    },
    // textarea 行数
    rows: {
      type: [String, Number],
      default: 2
    },
    // 是否可以编辑
    readonly: {
      type: Boolean,
      default: false
    },
    // 标题
    label: {
      type: String,
      default: ''
    },
    // placeholder
    placeholder: {
      type: String,
      default: ''
    },
    // 是否转成NULL值提交
    emptyisnull: {
      type: Boolean,
      default: false
    },
    // 是否必填
    required: {
      type: Boolean,
      default: false
    },
    // 校验规则
    validparam: {
      type: Object,
      default: function () {
        return {
          min: null,
          max: null,
          minlength: null,
          maxlength: null,
          validFunc: null,
          errorMsg: ''
        }
      }
    },
    // 数值
    value: {
      type: [String, Number]
    }
  },
  data: function () {
    return {
      inpVal: '',
      errorMsg: ''
    }
  },
  mounted: function () {
    this.refreshValue()
  },
  watch: {
    value () {
      this.refreshValue()
    }
  },
  computed: {
    inputErrorClass () {
      let errorClass = ''
      if (this.errorMsg) {
        errorClass = 'cg-input--error'
      }
      return [errorClass]
    },
    inputClass () {
      let baseClass = 'cg-input-no-label'
      if (this.label) {
        baseClass = 'cg-input-has-label'
      }
      let base = 'cg-component-size__'
      return [`${base}${this.size}`, this.clearable ? 'cg-input--clearable' : '', baseClass]
    },
    inputTextAreaClass () {
      let baseClass = 'cg-textarea-no-label'
      if (this.label) {
        baseClass = 'cg-textarea-has-label'
      }
      return [baseClass]
    }
  },
  methods: {
    blur: function () {
      this.valid()
    },
    refreshValue: function () {
      if (this.value === undefined || this.value === null) {
        this.inpVal = ''
      } else {
        this.inpVal = this.value
      }
    },
    putValue: function () {
      if (this.inpVal === '') {
        if (this.emptyisnull) {
          this.$emit('input', null)
        } else {
          this.$emit('input', this.inpVal)
        }
      } else {
        this.$emit('input', this.inpVal)
      }
    },
    del: function () {
      this.inpVal = ''
      this.putValue()
    },
    inpHandle: function (e) {
      this.putValue()
    },
    // 校验方法
    valid: function () {
      this.errorMsg = ''
      if (this.required) {
        if (this.inpVal === '') {
          // 错误信息，后续考虑规范报错方式
          this.errorMsg = '不能为空'
          return this.errorMsg
        }
      }
      if (this.validparam) {
        let defaultMsg = this.validparam.errorMsg ? this.validparam.errorMsg : ''
        if (this.validparam.min !== undefined && this.validparam.min !== null) {
          if (this.value < this.validparam.min) {
            this.errorMsg = defaultMsg ? defaultMsg : '数值不能小于' + this.validparam.min
            return this.errorMsg
          }
        }
        if (this.validparam.max !== undefined && this.validparam.max !== null) {
          if (this.value > this.validparam.max) {
            this.errorMsg = defaultMsg ? defaultMsg : '数值不能大于' + this.validparam.max
            return this.errorMsg
          }
        }
        if (this.validparam.minlength !== undefined && this.validparam.minlength !== null) {
          if (this.value.length < this.validparam.minlength) {
            this.errorMsg = defaultMsg ? defaultMsg : '最小长度为' + this.validparam.minlength
            return this.errorMsg
          }
        }
        if (this.validparam.maxlength !== undefined && this.validparam.maxlength !== null) {
          if (this.value.length > this.validparam.maxlength) {
            this.errorMsg = defaultMsg ? defaultMsg : '最大长度为' + this.validparam.maxlength
            return this.errorMsg
          }
        }
        if (this.validparam.validFunc) {
          this.errorMsg = this.validParam.validFunc(this.value)
          if (this.errorMsg) {
            return this.errorMsg
          }
        }
      }
      return this.errorMsg
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../themes/base/base.less";
.cg-input__content {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size:1.2rem;
  line-height:@lineHeight;
  outline: none;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  width: 100%;
}
.box-content{
  line-height:@lineHeight;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
 }
.cg-input--error{
  outline: none;
  border-radius: 4px;
  border: solid 1px !important;
  border-color: #f70505 !important;
}
.cg-input__content:focus{
  outline: none;
  border-color: #409eff;
}
.base_flex {
  flex: 1;
  margin-left: 5px;
}
.cg-input__label{
  width:20%;
  float:left;
  padding-right:2%;
  text-align:right;
  font-size:1.2rem;
  line-height:@lineHeight;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cg-input-has-label,.cg-textarea-has-label{
  padding-left:0;
  border:none;
  width:80%;
  float:left;
  .box-content;
}
.cg-input-no-label,.cg-textarea-no-label{
  padding-left:0;
  border:none;
  width:100%;
  float:left;
  .box-content;
}
.cg-icon__del {
  .base_flex;
}
</style>

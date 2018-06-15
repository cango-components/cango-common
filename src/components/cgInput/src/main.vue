<template>
  <div>
    <div v-if="label" class="cg-input__label" >
      {{ label }}
    </div>
    <div v-if="type==='text'" class="cg-input" :class="inputClass">
      <input class="cg-input__content" :placeholder="placeholder" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" />
      <i v-if="!readonly && clearable" class="cg-base-icon cg-icon__del" @click="del"></i>
    </div>
    <div v-if="type==='textarea'" class="cg-textarea">
      <textarea :cols="cols" :rows="rows" :placeholder="placeholder" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" ></textarea>
    </div>
    <div v-if="type==='password'" class="cg-input" :class="inputClass">
      <input type="password" :placeholder="placeholder" class="cg-input__content" @input="inpHandle" v-model="inpVal" :maxlength="(validparam && validparam.maxlength) ? validparam.maxlength : ''" :readonly="readonly" />
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
      type: String
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
    inputClass () {
      let base = 'cg-component-size__'
      return [`${base}${this.size}`, this.clearable ? 'cg-input--clearable' : '']
    }
  },
  methods: {
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
    // TODO 校验方法
    valid: function () {
      if (this.required) {
        if (this.inpVal === '') {
          // TODO 错误信息，后续考虑规范报错方式
          this.errorMsg = '不能为空'
          return this.errorMsg
        }
      }
      // TODO 其他数据校验
      return this.errorMsg
    }
  }
}
</script>

<style lang="less" scoped>
.cg-input__content {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;

  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 3.3rem;
  line-height: 3.3rem;
  outline: none;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  width: 100%;
}
.box-content{

  height: 40px;
  line-height: 40px;

  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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
  line-height:3.3rem;
}
.cg-input {
  padding-left:0;
  border:none;
  width:80%;
  float:left;
  .box-content;
}
.cg-icon__del {
  .base_flex;
}
</style>

<template>
  <div class="edit_container">
    <div class="readOnly" v-if="readOnly"></div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  export default {
    name: 'cg-editor',
    components: {
      quillEditor
    },
    data() {
      return {
        content:'',
        editorOption: {}
      }
    },
    props:['editContent','readOnly'],
    mounted(){
       this.content = this.editContent;
    },
    methods: {
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){}, // 获得焦点事件
      onEditorChange(){
        this.$emit('changeEdit',this.content)
      }, // 内容改变事件
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    }
  }
</script>

<style lang="less" scoped>
  .edit_container{
    position:relative;
    .readOnly{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: 5;
      background:rgba(255,255,255,0.6)
    }
  }
</style>

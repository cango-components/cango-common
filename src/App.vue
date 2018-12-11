<template>
  <div>
    <cg-form ref = "form" >
      <cg-button
        :className = "button.className"
        :label = "button.label"
        :readonly = "button.readOnly"
        :buttonclick = "button.buttonClick"
      >
      </cg-button>
      <cg-tree
        :showname="tree.showName"
        :childname="tree.childName"
        :showfunc="tree.showFunc"
        :list="tree.list"
        :onselected="tree.onSelected"
        :onextend="tree.onExtend"
        :filter="tree.filter"
        :filterignore="tree.filterIgnore"
        :filterplaceholder="tree.filterPlaceholder"
      >
      </cg-tree>
      <cg-select
        :label = "select.label"
        :id = "select.id"
        :readonly = "select.readOnly"
        :required = "select.required"
        :emptyisnull = "select.emptyIsNull"
        :keyname = "select.keyName"
        :showname = "select.showName"
        :list = "select.list"
        :showfunc = "select.showFunc"
        :filter = "select.filter"
        :filterignore = "select.filterIgnore"
        :filterplaceholder = "select.filterPlaceholder"
        :emptylabel = "select.emptyLabel"
        :selectnum = "select.selectNum"
        :separator = "select.separator"
        :titlestyle = "select.titleStyle"
        v-model = "data.select"
      >
      </cg-select>
      <cg-uploadify
        :type = "uploadify.type"
        :id = "uploadify.id"
        :readonly = "uploadify.readOnly"
        :candelete = "uploadify.canDelete"
        :required = "uploadify.required"
        :emptyisnull = "uploadify.emptyIsNull"
        :prefix = "uploadify.prefix"
        :filenum = "uploadify.fileNum"
        :maxsize = "uploadify.maxSize"
        :errorimage = "uploadify.errorImage"
        :defaultimage = "uploadify.defaultImage"
        :loadingimage = "uploadify.loadingImage"
        v-model = "data.uploadify"
      >
      </cg-uploadify>
      <cg-editor
        editContent="<b>你好</b><b>你好</b><b>你好</b><b>你好"
        :readOnly="true"
        @changeEdit="changeEdit"
      ></cg-editor>
    </cg-form>

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      button: {
        className: '',
        label: 'button',
        readOnly: false,
        buttonClick: null
      },
      select: {
        id: 'select',
        label: '',
        readOnly: false,
        required: false,
        emptyIsNull: true,
        keyName: 'id',
        showName: 'name',
        showFunc: null,
        list: [{"id":"id1", "name":"名称1"},
          {"id":"id2", "name":"名称2"}],
        filter: true,
        filterIgnore: true,
        filterPlaceholder: '请输入关键字',
        emptyLabel: '请选择',
        separator: ',',
        selectNum: 1,
        titleStyle: 0
      },
      tree: {
        showName: 'name',
        childName: 'child',
        showFunc: null,
        list: [{"name":"父一","child":[{"name":"子一"}]}, {"name":"父二"}, {"name":"父三"}],
        onSelected: null,
        onExtend: null,
        filter: false,
        filterIgnore: true,
        filterPlaceholder: '请选择'
      },
      data:{
        select:null
      },
      uploadify: {
        id: 'uploadifyId',
        label: 'uploadify',
        type: 'image',
        prefix: 'Test',
        fileNum: 0,
        maxSize: 0,
        required: false,
        readOnly: false,
        canDelete: true,
        emptyIsNull: true
      },
    }
  },
  methods: {
    submit: function () {
      let error = this.$refs['form'].valid()
      console.log(error)
    },
    changeEdit(data){

    }
  }
}
</script>

<style lang="sass" scoped>

</style>

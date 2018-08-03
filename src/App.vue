<template>
  <div>
    <cg-form ref = "form" >
      <cg-uploadify
        id       = "id"
        type     = "image"
        label    = ""
        :required = "true"
        prefix   = "TEST"
        v-model = "val"
      >
      </cg-uploadify>
    </cg-form>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      updateTime: null,
      val: ''
    }
  },
  methods: {
    submit: function () {
      let error = this.$refs['form'].valid()
      console.log(error)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

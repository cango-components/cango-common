<template>
  <div>
    <cg-form ref = "form" >
      <cg-datepicker
        showtype = "daterange"
        v-model = 'updateTime'
      >
      </cg-datepicker>
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

<template>
  <div>
    <cg-input v-model="val" maxlength="4"></cg-input>
    <cg-switch v-model="switchVal"></cg-switch>{{switchVal?'开':'关'}}
    <cg-custom></cg-custom>
    <cg-date-picker></cg-date-picker>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      val: '',
      switchVal: true
    }
  },
  watch: {
    val (newVal, oldVal) {
      console.log(newVal)
    },
    switchVal (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

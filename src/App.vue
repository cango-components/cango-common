<template>
  <div>
    <cg-input v-model="val" maxlength="4"></cg-input>
    <cg-switch v-model="switchVal"></cg-switch>{{switchVal?'开':'关'}}
    <cg-custom></cg-custom>
    <cg-date-picker v-model="date"></cg-date-picker>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      val: '',
      switchVal: true,
      date: '2018/1/2'
    }
  },
  watch: {
    val (newVal, oldVal) {
      console.log(newVal)
    },
    switchVal (newVal, oldVal) {
      console.log(newVal)
    },
    date (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

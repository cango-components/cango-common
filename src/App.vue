<template>
  <div>
    <cg-input v-model="val" maxlength="4"></cg-input>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      val: ''
    }
  },
  watch: {
    val (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

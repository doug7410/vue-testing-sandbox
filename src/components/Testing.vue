<template>
  <div>
    <button @click="promise" class="click-promise">Promise</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
  methods: {
    ...mapActions(['promiseAction']),
    promise(){
      const vm = this
      vm.$router.push('/some/route')
      return vm.promiseAction().then(function (response) {
        vm.$router.push('/some/other/route')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>

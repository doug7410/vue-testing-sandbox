<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="login" class="click-me">Login</button>
    <button @click="foo" class="click-foo">Foo</button>
    <button @click="promise" class="click-promise">Promise</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
  name: 'hello',
  created () {
    this.fakeAction('1234')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions(['fakeAction', 'loginAction', 'fooAction', 'promiseAction']),
    login(){
      this.loginAction()
      this.msg = 'I have been clicked'
    },
    foo(){
      this.msg = this.fooAction()
    },
    spiedOn () {

    },
    promise(){
      const vm = this
      this.spiedOn()
      vm.$router.push('/some/route')
      return this.promiseAction().then(function (response) {
        console.log('pushing to route')
        vm.$router.push('/some/routessss')
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

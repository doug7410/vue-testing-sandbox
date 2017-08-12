import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
Vue.use(Vuex)
Vue.use(VueRouter)

let div

beforeEach(() => {
  // create a dom element for the component to mount to
  div = document.createElement('div')
  document.body.appendChild(div)
})

afterEach(() => {
  // clean up the document nodes after each test
  Array.prototype.forEach.call(document.querySelectorAll('body *:not([type="text/javascript"])'), node => {
    node.parentNode.removeChild(node)
  })
})

// stub out a store config object
const storeConfig = {
  actions: {}
}

/**
 * Set up a function that will attach the mock store to the component
 * and mount the component to the test div element
 *
 * Use like this:
 * const mount = componentHelper(YourComponent)
 * do some setup
 * call mount() to instantiate the mocked component
 *
 * @param component
 * @returns {function()}
 */
window.componentHelper = function (component) {
    return () => {
    // 1. attaches the stubbed store and router to the component
    component.store = new Vuex.Store(storeConfig)
    component.router =  new VueRouter({})
    // 2. mounts the component to the dom element
    // 3. returns the vue instance
    return new Vue(component).$mount(div)
  }
}

/**
 * Creates an action to be added to the fake store
 * returns a sinon stub which can be asserted against
 * @param actionName
 */
window.stubAction = (actionName) => {
  // 1. create a stub
  const stub = sinon.stub()
  // 2. create the action function that will be placed in the store and add it to the store
  storeConfig.actions[actionName] = function (context, ...args) {
    // 3. when this action is called it will call the stub
    // return the stub so you can assert against the stubbed return value
    // example: stubAction('fakeAction').returns('xyz')
    return stub(...args)
    }
  // 4. return the stub that was placed in the return of the action for assertions
  return stub
}

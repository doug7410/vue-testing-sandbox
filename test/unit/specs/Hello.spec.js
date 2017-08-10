import Vue from 'vue'
import Hello from '@/components/Hello'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Hello.vue', () => {
  const createInstance = componentHelper(Hello)

  beforeEach(() => {
    stubAction('fakeAction')
  })

  it('should render correct contents - tested with jquery-chai', () => {
    createInstance()

    expect($('.hello h1').text()).to.equal('Welcome to Your Vue.js App')
  })

  it('should render correct contents when the button is clicked', () => {
    createInstance()

    expect($('.hello h1').text()).to.equal('Welcome to Your Vue.js App')
    $('button').click()
    return Vue.nextTick().then(() => {
        expect($('.hello h1').text()).to.equal("I have been clicked")
    })
  })

  it('should dispatch a vuex action on create', () => {
    const fakeAction = stubAction('fakeAction')
    createInstance()

    expect(fakeAction).to.have.been.calledWith('1234')
  })

  it('should dispatch the login action when login is clicked', () => {
    stubAction('fakeAction')
    const login = stubAction('login')
    // createInstance()

    // $('.login').click()
    //
    // expect(login).to.have.been.calledOnce
  })
})

var _component

function componentHelper(component) {
  _component = component
  let mountOnto
  beforeEach(() => {
    mountOnto = document.createElement('div')
    document.body.appendChild(mountOnto)
  })
  afterEach(() => {
    Array.prototype.forEach.call(document.querySelectorAll('body *:not([type="text/javascript"])'), node => {
      node.parentNode.removeChild(node)
    })
  })



  return () => {
    const vm = new Vue(component).$mount(mountOnto)
  }
}

function stubAction(actionName) {
  const testModule = { modules: {}}
  const spy = sinon.stub()
  _component.store = new Vuex.Store({})
  testModule.modules[actionName] = {
    actions: {
      [actionName] (context, ...args) {
        return spy(...args)
      }
    }
  }
  _component.store.registerModule('unitTest', testModule)
  return spy
}
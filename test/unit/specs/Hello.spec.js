import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  const mount = componentHelper(Hello)

  beforeEach(() => {
    stubAction('fooAction')
    stubAction('fakeAction')
  })

  it('should dispatch the login action when login is clicked', () => {
    const fakeAction = stubAction('fakeAction')
    const loginAction = stubAction('loginAction')
    const vm = mount()

    expect($('.hello h1')).to.contain('Welcome to Your Vue.js App')
    expect(fakeAction).to.have.been.calledOnce.and.calledWith('1234')

    $('.click-me').click()
    return vm.$nextTick().then(() => {
      expect($('.hello h1')).to.contain('I have been clicked')
      expect(loginAction).to.have.been.calledOnce
    })
  })

  it('should be able to return a value from a stubbed action', () => {
    const fooAction = stubAction('fooAction').returns('foo')
    const vm = mount()

    $('.click-foo').click()

    expect(fooAction).to.have.been.calledOnce

    return vm.$nextTick().then(() => {
      expect($('.hello h1')).to.contain('foo')
    })
  })

  // it('should dispatch the login action when login is clicked', () => {
  //   Vue.use(Vuex)
  //   const storeObject = {
  //     actions: {}
  //   }
  //
  //   const stubAction = (actionName) => {
  //     // create a stub
  //     const stub = sinon.stub()
  //     // create the action function that will be placed in the store
  //     const action = function () {
  //       return function (context, ...args) {
  //         // have that function return the stub
  //         return stub(...args)
  //       }
  //     }
  //     // add it to the store
  //     storeObject.actions[actionName] = action()
  //     // return the stub that was placed in the return of the action
  //     return stub
  //   }
  //
  //   const fakeAction = stubAction('fakeAction')
  //   const loginAction = stubAction('loginAction')
  //
  //
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //   Hello.store = new Vuex.Store(storeObject)
  //   new Vue(Hello).$mount(div)
  //
  //   expect($('.hello h1')).to.contain('Welcome to Your Vue.js App')
  //   expect(fakeAction).to.have.been.calledOnce.and.calledWith('1234')
  //
  //   $('.click-me').click()
  //   return Vue.nextTick().then(() => {
  //     expect($('.hello h1')).to.contain('I have been clicked')
  //     expect(loginAction).to.have.been.calledOnce
  //   })
  //
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('body *:not([type="text/javascript"])'), node => {
  //     node.parentNode.removeChild(node)
  //   })
  // })

  //this works
  // it('should dispatch the login action when login is clicked', () => {
  //   Vue.use(Vuex)
  //   const fakeAction = sinon.stub()
  //
  //   const fakeStore = new Vuex.Store({
  //     actions: {
  //       fakeAction: function (context, ...args) {
  //         return fakeAction(...args)
  //       }
  //     }
  //   })
  //
  //
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //   Hello.store = fakeStore
  //   new Vue(Hello).$mount(div)
  //
  //   expect($('.hello h1')).to.contain('Welcome to Your Vue.js App')
  //   expect(fakeAction).to.have.been.calledOnce.and.calledWith('1234')
  //
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('body *:not([type="text/javascript"])'), node => {
  //     node.parentNode.removeChild(node)
  //   })
  // })


  // this works for spying on a single action
  // it('should dispatch the login action when login is clicked', () => {
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //
  //   const testModule = { modules: {}}
  //   const fakeAction = sinon.stub()
  //
  //
  //   testModule.modules['fakeAction'] = {
  //     actions: {
  //       fakeAction: function (context, ...args) {
  //         return fakeAction(...args)
  //       }
  //     }
  //   }
  //
  //   Vue.use(Vuex)
  //   Hello.store = new Vuex.Store({})
  //   Hello.store.registerModule('unitTest', testModule)
  //   new Vue(Hello).$mount(div)
  //
  //   expect(fakeAction).to.have.been.calledOnce.and.calledWith('1234')
  //
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('body *:not([type="text/javascript"])'), node => {
  //     node.parentNode.removeChild(node)
  //   })
  // })
})


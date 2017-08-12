  import Testing from '@/components/Testing'

  describe('Testing.vue', () => {
    const mount = componentHelper(Testing)

    it('assert something in a promise returned from an action', () => {
      const promise = new Promise(resolve => resolve('success'))
      const promiseAction = stubAction('promiseAction').returns(promise)
      const vm = mount()
      const routerPush = sinon.spy(vm.$router, 'push')
      const test = vm.promise()

      // test that the pre-async actions occurred
      expect(promiseAction).to.have.been.called
      expect(routerPush).to.have.been.calledWith('/some/route')

      // test the post-async action occurred
      return test.then(() => {
        expect(routerPush).to.have.been.calledWith('/some/other/route')
      })
    })
  })


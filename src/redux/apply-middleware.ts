import { CreateStore } from './create-store'

function compose(...fns: Function[]) {
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((result, curr) => {
    return (...args: any[]) => result(curr(...args))
  })
}

type Params = Parameters<CreateStore>

const applyMiddleware = (...middlewares: Function[]) => {
  return (createStore: CreateStore) => {
    return (reducer: Params[0], initialState: Params[1]) => {
      const { store, Provider } = createStore(reducer, initialState)

      let dispatch = (...args: any[]) => {
        throw new Error('xxxx')
      }

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args: any[]) => dispatch(...args),
      }

      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)
      store.dispatch = dispatch

      return {
        store,
        Provider,
      }
    }
  }
}

export default applyMiddleware

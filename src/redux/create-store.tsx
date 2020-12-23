import React, {
  createContext,
  useReducer,
  Reducer,
  FC,
  useEffect,
  Dispatch,
} from 'react'

type StoreEnhancer = {}
type Store<A> = {
  getState: () => any
  dispatch: Dispatch<A>
}
export const ReduxContext = createContext({} as Store<{}>)

const createStore = <S, A>(
  reducer: Reducer<S, A>,
  initialState: any,
  enhancer?: StoreEnhancer,
) => {
  let store: Store<A> = {
    getState: () => null as S,
    dispatch: () => null as Dispatch<A>,
  }

  const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    store.getState = () => state
    store.dispatch = dispatch

    useEffect(() => {
      store = { ...store, getState: () => state }
    }, [state])

    return (
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    )
  }

  return {
    Provider,
    store,
  }
}

export default createStore

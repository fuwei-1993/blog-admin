import React, {
  createContext,
  useReducer,
  Reducer,
  FC,
  Dispatch,
  useMemo,
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
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initialState)
  }

  let store: Store<A> = {
    getState: () => null as S,
    dispatch: () => null as Dispatch<A>,
  }

  const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    store = useMemo(
      () => ({
        getState: () => state,
        dispatch,
      }),
      [state],
    )

    return (
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    )
  }

  return {
    Provider,
    store,
  }
}

export type CreateStore = typeof createStore

export default createStore

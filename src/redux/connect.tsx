import React, { FC, useContext, useEffect } from 'react'
import { ReduxContext } from './create-store'
// interface OwnProps {}

// type MapStateToProps {
//   (state: any):
// }

const connect = (mapStateToProps: any, mapDispatchToProps: any) => {
  return (Component: FC): FC => {
    return props => {
      const store = useContext(ReduxContext)
      const state = mapStateToProps(store.getState(), props)
      const actions = mapDispatchToProps(store.dispatch, props)

      return (
        <Component
          {...props}
          {...state}
          {...actions}
          dispatch={store.dispatch}
        />
      )
    }
  }
}

export default connect

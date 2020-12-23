import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/index'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './app.less'
import { createStore } from './redux'

const INCREMENT = 'INCREMENT'

const increment = (
  state: {
    number: number
  },
  action: {
    type: string
  },
) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, number: state.number + 1 }
    default:
      return state
  }
}

const renderRouter = (Router: FC) => {
  const App = () => {
    const { Provider } = createStore(increment, { number: 0 })

    return (
      <AppContainer>
        <BrowserRouter basename="/">
          <Provider>
            <Router />
          </Provider>
        </BrowserRouter>
      </AppContainer>
    )
  }

  ReactDOM.render(<App />, document.getElementById('app'))
}

if (module?.hot) {
  module.hot.accept('./router', () => {
    renderRouter(require('./router/index').default)
  })
}

renderRouter(Router)

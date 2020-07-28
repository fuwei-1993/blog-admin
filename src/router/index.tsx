import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import Home from '@/pages/Home'
// import Count from '@/pages/Count'
import { axios } from '@/utils/utils'
import { Count } from '@/pages/Count'
axios.get(Home)
const Router = () => (
  <div className="layout">
    <header>
      <Link to="/">to home</Link>
      <Link to="/count">to count</Link>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/count" exact component={Count} />
      </Switch>
    </main>
  </div>
)

export default Router

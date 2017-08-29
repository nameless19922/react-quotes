import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import Quote from './Quote'
import Leaders from './Leaders'
import NotFound from './NotFound'
import { history } from '../store'

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={ history }>
        <Switch>
          <Route path="/leaders/:to?" exact component={ Leaders } />
          <Route path="/quote/:classcode/:securcode" component={ Quote } />
          <Route component={ NotFound } />
        </Switch>
      </ConnectedRouter>
    );
  }
}
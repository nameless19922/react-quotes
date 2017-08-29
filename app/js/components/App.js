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
          <Route path="/" exact component={ Leaders } />
          <Route path="/leaders/:to" component={ Leaders } />
          <Route path="/item" component={ Quote } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </ConnectedRouter>
    );
  }
}
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Quote from './Quote';
import Leaders from './Leaders';
import NotFound from './NotFound';
import { history } from '../store';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={ history }>
        <Switch>
          <Route path="/" exact render={ () => ( <Redirect to="/leaders/up" /> ) } />
          <Route path="/leaders" exact render={ () => ( <Redirect to="/leaders/up" /> ) } />
          <Route path="/leaders/:to" exact component={ Leaders } />
          <Route path="/quote/:classcode/:securcode/:period" component={ Quote } />
          <Route component={ NotFound } />
        </Switch>
      </ConnectedRouter>
    );
  }
}
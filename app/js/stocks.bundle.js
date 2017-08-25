import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import Quote from './components/Quote'
import App from './components/App'

render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path='/' component={ App }>
          <Route path="/item" component={ Quote } />
          <Route path="/thanks" component={ Quote } />

        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);

store.subscribe(() => console.log(store.getState()));
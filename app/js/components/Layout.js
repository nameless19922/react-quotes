import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import Quote from './Quote';
import Leaders from './Leaders';
import NotFound from './NotFound';
import Nav from './Nav';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <div className="layout__header">
          <header className="header">
            <div className="header__wrapper layout__wrapper">
              <Link to="/" className="header__logo">
                <img src="/img/logo.svg" />
              </Link>
              <Nav />
            </div>
          </header>
        </div>
        <div className="layout__body">
          <Switch>
            <Route path="/" exact render={ () => ( <Redirect to="/leaders/up" /> ) } />
            <Route path="/leaders" exact render={ () => ( <Redirect to="/leaders/up" /> ) } />
            <Route path="/leaders/:to" exact component={ Leaders } />
            <Route path="/quote/:classcode/:securcode/:period" component={ Quote } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}
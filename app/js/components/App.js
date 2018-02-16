import React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import Layout from './Layout';
import { history } from '../store';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={ history }>
        <Layout />
      </ConnectedRouter>
    );
  }
}
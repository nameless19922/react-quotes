import React, { Component } from 'react'
import { QuotesTabsContainer } from '../containers/QuotesTabsContainer'
import { QuotesTableContainer } from '../containers/QuotesTableContainer'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="stocks">
          <div className="layout__wrapper">
            <QuotesTabsContainer />
            <QuotesTableContainer />
          </div>
        </section>
    );
  }
}
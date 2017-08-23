import React, { Component } from 'react'
import QuotesTabs from '../containers/quotesTabs'
import { QuotesTableContainer } from '../containers/quotesTableContainer'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="stocks">
          <div className="layout__wrapper">
            <QuotesTabs />
            <QuotesTableContainer />
          </div>
        </section>
    );
  }
}
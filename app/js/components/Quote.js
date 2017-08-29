import React from 'react'

import QuoteContainer from '../containers/QuoteContainer'

export default class Quote extends React.Component {
  render() {
    return (
      <div className="stocks-item">
        <div className="layout__wrapper">
          <QuoteContainer />
        </div>
      </div>
    );
  }
}
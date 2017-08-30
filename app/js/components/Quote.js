import React from 'react';
import { Link } from 'react-router-dom';

import QuoteContainer from '../containers/QuoteContainer';

export default class Quote extends React.Component {
  render() {
    return (
      <div className="stocks-item">
        <div className="layout__wrapper">
          <div className="stocks-item__leaders">
            <Link to="/leaders/up" className="stocks-item__leaders-link">Лидеры роста / падения</Link>
          </div>
          <QuoteContainer />
        </div>
      </div>
    );
  }
}
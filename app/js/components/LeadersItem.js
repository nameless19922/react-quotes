import React from 'react';
import { Link } from 'react-router-dom';

import { formatValue, formatDate } from '../utils';
import { getHistory } from '../actions/leaders';

export default class QuotesItem extends React.Component {
  constructor(props) {
    super(props);
  }

  minMax() {
    const history = this.props.item.history;

    return {
      max: Math.max(...history),
      min: Math.min(...history)
    }
  }

  render() {
    const item = this.props.item;
    const minMax = this.minMax();

    return (
      <Link to={ `/quote/${item.class.toLowerCase()}/${item.secur.toLowerCase()}/1y` } className="stocks__table-tr">
        <div className="stocks__table-td _title">
          <div className="stocks__table-leader">
            <div className="stocks__table-name">{ item.name }</div>
            <div className="stocks__table-date">{ formatDate(item.t) }</div>
          </div>
        </div>
        <div className="stocks__table-td _cprice">
          <div className="stocks__table-value">{ formatValue(item.close, item.scale) }</div>
        </div>
        <div className="stocks__table-td _change">
          <div className={ 'stocks__table-value ' + (item.profit > 0 ? '_green' : '_red') }>{ item.profit > 0 ? '+' : '' }{ formatValue(item.profit * 100, 2) }</div>
        </div>
        <div className="stocks__table-td _price">
          <div className="stocks__table-box">
            <div className="stocks__table-value _range">{ formatValue(minMax.min, item.scale) }</div>
            <div className="stocks__table-value _range">{ formatValue(minMax.max, item.scale) }</div>
          </div>
          <div className="stocks__table-range">
            <input readOnly="" className="ui-custom-range" type="range" step="0.0001" min={ minMax.min } max={ minMax.max } value={ item.close } />
          </div>
        </div>
      </Link>
    )
  }
}
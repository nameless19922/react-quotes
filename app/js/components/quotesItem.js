import React, { Component } from 'react'

export default class QuotesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const format = wNumb({
      mark: ',',
      thousand: ' ',
      decimals: 2
    });

    const formatDate = date => {
      var tmpDate = new Date(date * 1000),
          getNumString = function (num) {
            return (num < 10) ? '0' + num : num;
          };

      return [
        getNumString(tmpDate.getUTCDate()),
        getNumString(tmpDate.getUTCMonth() + 1),
        tmpDate.getUTCFullYear()
      ].join('.') + ' ' + [
        getNumString(tmpDate.getUTCHours()),
        getNumString(tmpDate.getUTCMinutes())
      ].join(':');
    }

    return (
      <div className="stocks__table-tr js-stocks-leaders-item">
        <div className="stocks__table-td _title">
          <div className="stocks__table-leader">
            <div className="stocks__table-name">{ this.props.item.name }</div>
            <div className="stocks__table-date">{ formatDate(this.props.item.t) }</div>
          </div>
        </div>
        <div className="stocks__table-td _cprice">
          <div className="stocks__table-value">{ this.props.item.close }</div>
        </div>
        <div className="stocks__table-td _change">
          <div className="stocks__table-value">{ format.to(this.props.item.profit * 100) }</div>
        </div>
        <div className="stocks__table-td _price">
          <div className="stocks__table-box">
            <div className="stocks__table-value _range">5,1100</div>
            <div className="stocks__table-value _range">6,7395</div>
          </div>
          <div className="stocks__table-range">
            <input disabled="" className="ui-custom-range" type="range" step="0.0001" min="5.11" max="6.7395" />
          </div>
        </div>
      </div>
    )
  }
}
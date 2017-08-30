import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { formatValue } from '../utils'
import Preloader from '../components/Preloader'
import Chart from '../components/Chart'
import { getQuote } from '../actions/quote'

const chartOptions = {
  chart: {
    defaultSeriesType: 'areaspline',
    margin: 0
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  navigator: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  xAxis: {
    gridLineColor: 'transparent',
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    labels: {
      formatter: function () {

      },
      align: 'center',
      y: -20,
      style: {
        color: '#b3b4b6',
        fontWeight: 500
      }
    },
    tickLength: 0,
    type: 'datetime',
    minPadding: 0,
    maxPadding: 0
  },
  yAxis: {
    endOnTick: false,
    gridLineColor: '#f2f2f2',
    gridLineWidth: 1,
    opposite: true,
    title: {
      text: null
    },
    labels: {
      formatter: function() {
        return this.isFirst ? '' : this.value;
      },
      align: 'right',
      x: -20,
      y: -10,
      style: {
        color: '#b3b4b6',
        fontWeight: 500
      }
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, 'rgba(208, 244, 215, 0.5)'],
          [1, 'rgba(208, 244, 215, 0.5)']
        ]
      },
      lineColor: '#4fd669',
      marker: {
        enabled: false
      },
      lineWidth: 1,
      threshold: null,
      turboThreshold: 0
    }
  },
  tooltip: {
    headerFormat: null,
    useHtml: true,
    pointFormatter: function () {

    }
  },
  series: [{
    type: 'area',
    color: '#4fd669'
  }]
};

class Quote extends React.Component {
  componentDidMount() {
    const { classCode, securCode, period, getQuote } = this.props;

    getQuote(classCode, securCode, period);
  }

  render() {
    const { data, isRequest } = this.props;
    const delay = 200;

    if (!Object.keys(data).length) {
      return <Redirect to="/leaders/up" />
    }

    const result = (
      <div className="stocks-item__box-left">
        <div className="stocks-item__box-title">{ data.name }</div>
        <div className="stocks-item__box-value">
          <span>{ formatValue(data.close, data.scale) }</span><span className={ (data.profit > 0 ? '_green' : '_red') }>{ formatValue(data.change, data.scale) }{ data.profit > 0 ? '+' : '' } ({ formatValue(data.profit * 100, 2) })</span>
        </div>
        <div className="stocks-item__box-period">
          <button className="stocks-item__box-filter" type="button">1д</button>
          <button className="stocks-item__box-filter" type="button">1м</button>
          <button className="stocks-item__box-filter" type="button">3м</button>
          <button className="stocks-item__box-filter" type="button">1г</button>
          <button className="stocks-item__box-filter" type="button">5л</button>
          <button className="stocks-item__box-filter" type="button">max</button>
        </div>
        <Chart container="stocks-chart" options={ chartOptions } data={ data.chart } />
      </div>
    );

    return (
      <div className="stocks-item__box">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ delay }
          transitionLeaveTimeout={ delay }
        >
          { isRequest ? <Preloader /> : result }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(
  (state, ownProps) => {
    const params = ownProps.match.params;
    return {
      data: state.quote.data,
      isRequest: state.quote.isRequest,
      isFailure: state.quote.isFailure,
      classCode: params.classcode,
      securCode: params.securcode
    }
  },
  dispatch => {
    return {
      getQuote: (securCode, classCode, period) => dispatch(getQuote(securCode, classCode, period))
    }
  }
)(Quote));
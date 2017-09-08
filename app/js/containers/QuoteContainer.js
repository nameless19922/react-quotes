import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Preloader from '../components/Preloader';
import Chart from '../components/Chart';
import DataMessage from '../components/DataMessage';
import { formatValue } from '../utils';
import { getQuote } from '../actions/quote';
import { history } from '../store';

let current = {
  scale: null,
  period: null
};

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
        let date = new Date(this.value),
            period = current.period;

        if (period === '1d') {
          let h = (date.getUTCHours() < 10) ? '0' + date.getUTCHours() : date.getUTCHours(),
              m = (date.getUTCMinutes() < 10) ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
          return h + ':' + m;
        } else if (period === '1m' || period === '3m') {
          return date.getUTCDate() + ' ' + date.toLocaleDateString('ru-RU', {month: 'short'});
        } else if (period === '1y' || period === '5y' || period === 'max') {
          return date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
        }
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
      let dataHTML = '',
          dataDate = new Date(this.x),

        fix = function (number) {
          return (number < 10) ? '0' + number : number;
        };

      dataHTML +=
        '<div>' + fix(dataDate.getUTCDate()) + '.' + fix(dataDate.getUTCMonth() + 1) + '.' + dataDate.getUTCFullYear() +
        ', ' + fix(dataDate.getUTCHours()) + ':' + fix(dataDate.getUTCMinutes()) + '</div><br>' +
        '<div style="font-weight:600">' + formatValue(this.y, current.scale) + '</div>';

      return dataHTML;
    }
  }
};

const links = [
  { param: '1d',  name: '1д' },
  { param: '1m',  name: '1м' },
  { param: '3m',  name: '3м' },
  { param: '1y',  name: '1г' },
  { param: '5y',  name: '5л' },
  { param: 'max', name: 'max' }
];

class Quote extends React.Component {
  componentDidMount() {
    const { classCode, securCode, period, getQuote } = this.props;

    getQuote(classCode, securCode, period);
  }

  componentWillReceiveProps(nextProps) {
    const { classCode, securCode, period, getQuote } = this.props;

    if (nextProps.period !== period) {
      getQuote(classCode, securCode, nextProps.period);
    }
  }

  render() {
    const { data, isRequest, isFailure, period } = this.props;
    const delay = 200;
    const url = `/quote/${this.props.classCode}/${this.props.securCode}`;
    const isData = Object.keys(data).length;

    if (isData) {
      current.scale = data.scale;
      current.period = period;
    }

    const result = (
      <div className="stocks-item__box-left">
        <div className="stocks-item__box-title">{ data.name }</div>
        <div className="stocks-item__box-value">
          <span>{ formatValue(data.close, data.scale) }</span>
          <span className={ (data.profit > 0 ? '_green' : '_red') }>
            { formatValue(data.change, data.scale) } { isData ? (data.profit > 0 ? '(+' : '(') : '' }{ isData ? formatValue(data.profit * 100, 2) + '%)' : '' }
          </span>
        </div>
        <div className="stocks-item__box-period">
          { links.map((item, index) => (
            <NavLink to={ url + '/' +  item.param } className="stocks-item__box-filter" activeClassName="_current" key={ index }>{ item.name }</NavLink>
          )) }
        </div>
      </div>
    );

    return (
      <div className="stocks-item__box">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ delay }
          transitionLeaveTimeout={ delay }
        >
          { isRequest &&  <Preloader /> }
        </ReactCSSTransitionGroup>
        {  result }
        { isFailure && <DataMessage message="Данные отсутствуют. <br>Пожалуйста, попробуйте позже." /> }
        { !isRequest && <Chart container="stocks-chart" options={ chartOptions } data={ data.chart } /> }
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
      securCode: params.securcode,
      period: params.period
    }
  },
  dispatch => {
    return {
      getQuote(securCode, classCode, period) {
        if (links.find(item => item.param === period)) {
          dispatch(getQuote(securCode, classCode, period));
        } else {
          history.push(`/quote/${classCode}/${securCode}/1y`);
        }
      }
    }
  }
)(Quote));

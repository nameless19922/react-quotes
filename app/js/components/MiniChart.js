import React from 'react';

const chartOptions = {
  chart: {
    defaultSeriesType: 'areaspline',
    margin: 0,
    backgroundColor:'transparent'
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
  legend: {
    enabled: false
  },
  xAxis: {
    gridLineColor: 'transparent',
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    tickLength: 0,
    minPadding: 0,
    maxPadding: 0
  },
  tooltip: {
    enabled: false
  },
  yAxis: {
    gridLineColor: 'transparent',
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    tickLength: 0,
    minPadding: 0,
    maxPadding: 0,
    labels: {
      enabled: false
    }
  }
};

export default class MiniChart extends React.Component {
  constructor(props) {
    super(props);
  }

  setChartOptions() {
    this.chart = Highcharts.stockChart(
      this.props.container,
      chartOptions
    );
  }

  updateYAxis({ min, max }) {
    this.chart.yAxis[0].update({ min, max });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.container !== this.props.container) {
      const { color, data, minMax } = nextProps;

      this.updateYAxis(minMax);

      this.chart.series[0].update({ color, data });
    }
  }

  componentDidMount() {
    const { color, data, minMax } = this.props;

    this.setChartOptions();

    this.updateYAxis(minMax);

    this.chart.addSeries({
      type: 'area',
      color,
      data,
      enableMouseTracking: false
    });
  }

  render() {
    return (
      <div className="stocks__minichart">
        <div className="stocks__minichart-box" id={ this.props.container }></div>
      </div>
    );
  }
}
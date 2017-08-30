import React from 'react'

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = Highcharts.stockChart(
      this.props.container,
      this.props.options
    );
  }

  render() {
    return (
      <div className="stocks-item__box-chart">
        <div id={ this.props.container }></div>
      </div>
    );
  }
}
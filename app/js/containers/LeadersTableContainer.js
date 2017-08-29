import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import QuotesItem from '../components/LeadersItem'
import Preloader from '../components/Preloader'
import { getLeaders } from '../actions'

class LeadersTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLeaders(this.props.type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      this.props.getLeaders(nextProps.type);
    }
}

  render() {
    const delay = 200;

    let result = this.props.data.map((item, index) => (
      <QuotesItem key={ index } item={ item } />
    ));

    return (
      <div className="stocks__table">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ delay }
          transitionLeaveTimeout={ delay }
        >
          { this.props.isRequest && <Preloader /> }
        </ReactCSSTransitionGroup>
        <div className="stocks__table-thr">
          <div className="stocks__table-th _title">Наименование</div>
          <div className="stocks__table-th _cprice">Цена</div>
          <div className="stocks__table-th _change">Изменение, %</div>
          <div className="stocks__table-th _price">Min/max цена, день</div>
        </div>
        { result }
      </div>
    );
  }
}

export default withRouter(connect(
  (state, ownProps) => {
    const params = ownProps.match.params;

    return {
      data: state.quotes.data,
      isRequest: state.quotes.isRequest,
      isFailure: state.quotes.isFailure,
      type: typeof params.to !== 'undefined' ? params.to : 'up'
    }
  },
  dispatch => {
    return {
      getLeaders: type => dispatch(getLeaders(type))
    }
  }
)(LeadersTable));
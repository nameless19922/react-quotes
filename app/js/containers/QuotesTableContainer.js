import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuotesItem from '../components/QuotesItem'
import Preloader from '../components/Preloader'
import { getLeaders } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class QuotesTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLeaders('up');
  }

  render() {
    let result = this.props.data.map((item, index) => (
      <QuotesItem key={ index } item={ item } />
    ));

    const delay = 1000;

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
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ delay }
          transitionLeaveTimeout={ delay }
        >
          { !this.props.isRequest && result }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      data: state.data,
      isRequest: state.isRequest,
      isFailure: state.isFailure
    }
  },
  dispatch => {
    return {
      getLeaders: type => dispatch(getLeaders(type))
    }
  }
)(QuotesTable);
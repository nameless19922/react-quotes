import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'
import QuotesItem from '../components/QuotesItem'
import Preloader from '../components/Preloader'
import { getLeaders } from '../actions'

class QuotesTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLeaders('up');
  }

  render() {
    let result = null;

    if (this.props.isRequest) {
      result = <Preloader />;
    } else {
      result = this.props.data.map((item, index) => (
        <QuotesItem key={ index } item={ item } />
      ));
    }

    return (
      <div className="stocks__table">
        <div className="stocks__table-thr">
          <div className="stocks__table-th _title">Наименование</div>
          <div className="stocks__table-th _cprice">Цена</div>
          <div className="stocks__table-th _change">Изменение, %</div>
          <div className="stocks__table-th _price">Min/max цена, день</div>
        </div>
        <ReactCSSTransitionGroup
          transitionName="leaders"
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 150 }
        >
          { result }
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
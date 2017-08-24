import React, { Component } from 'react'
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
    if (this.props.isRequest) {
      return <Preloader />;
    }

    return (
      <div className="stocks__table">
        <div className="stocks__table-thr">
          <div className="stocks__table-th _title">Наименование</div>
          <div className="stocks__table-th _cprice">Цена</div>
          <div className="stocks__table-th _change">Изменение, %</div>
          <div className="stocks__table-th _price">Min/max цена, день</div>
        </div>
        { this.props.data.map((item, index) => (
          <QuotesItem key={ index } item={ item } />
        )) }
      </div>
    );
  }
}

export const QuotesTableContainer = connect(
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
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import QuotesItem from '../components/LeadersItem';
import Preloader from '../components/Preloader';
import { getLeaders, leadersSort } from '../actions/leaders';
import { history } from '../store';

class LeadersTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getLeaders, type } = this.props;

    getLeaders(type);
  }

  componentWillReceiveProps(nextProps) {
    const { getLeaders, type } = this.props;

    if (nextProps.type !== type) {
      getLeaders(nextProps.type);
    }
  }

  render() {
    const delay = 200;
    const ths = [
      {
        prop: 'name',
        value: 'Наименование'
      },
      {
        prop: 'close',
        value: 'Цена'
      },
      {
        prop: 'profit',
        value: 'Изменение, %'
      },
    ]

    let { data, isRequest, leadersSort, prop, direction } = this.props;

    let result = data.map((item, index) => (
      <QuotesItem key={ index } item={ item } />
    ));

    if (direction.length) {
      direction = direction === 'up' ? 'down' : 'up';
    } else {
      direction = 'up';
    }

    return (
      <div className="stocks__table">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={ delay }
          transitionLeaveTimeout={ delay }
        >
          { isRequest && <Preloader /> }
        </ReactCSSTransitionGroup>
        <div className="stocks__table-thr">
          { ths.map((item, index) => (
            <div key={ index } className={ 'stocks__table-th _' + item.prop }>
              <a href="javascript:;" className={ prop === item.prop ? `_${direction}` : '' } onClick={ () => leadersSort(item.prop, prop === item.prop ? direction : 'up') }>{ item.value }</a>
            </div>
          )) }
          <div className="stocks__table-th _price">Min/max цена, день</div>
        </div>
        <div>
          { result }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  (state, ownProps) => {
    const params = ownProps.match.params;

    return {
      data: state.leaders.data,
      isRequest: state.leaders.isRequest,
      isFailure: state.leaders.isFailure,
      prop: state.leaders.sort.prop,
      direction: state.leaders.sort.direction,
      type: typeof params.to !== 'undefined' ? params.to : 'up'
    }
  },
  dispatch => {
    return {
      getLeaders(type) {
        if (type === 'up' || type === 'down') {
          dispatch(getLeaders(type))
        } else {
          history.push('/leaders/up');
        }
      },

      leadersSort(prop, direction) {
        dispatch(leadersSort(prop, direction));
      }
    }
  }
)(LeadersTable));

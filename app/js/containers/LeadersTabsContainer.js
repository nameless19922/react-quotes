import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getLeaders } from '../actions'

class LeadersTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'up'
    }
  }

  render() {
    return (
      <div className="stocks__top">
        <div className="stocks__filter">
          <div className="stocks__filter-title">Лидеры</div>
          <div className="stocks__filter-items">
            <Link to="/leaders/up">Роста</Link>
            <Link to="/leaders/down">Падения</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => {
    return {
      getLeaders: type => dispatch(getLeaders(type))
    }
  }
)(LeadersTabs);
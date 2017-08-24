import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLeaders } from '../actions'

class QuotesTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'up'
    }
  }

  onChangeType(e) {
    const type = e.currentTarget.value;

    this.setState({
      type
    });

    this.props.getLeaders(type);
  }

  render() {
    return (
      <div className="stocks__top">
        <div className="stocks__filter">
          <div className="stocks__filter-title">Лидеры</div>
          <div className="stocks__filter-items">
            <div className="btn-selector _group">
              <label className="btn-selector__label">
                <input
                  className="btn-selector__input"
                  type="radio"
                  name="leaders"
                  value="up"
                  onChange={ e => this.onChangeType(e) }
                  checked={this.state.type === 'up'}
                />
                <span className="btn-selector__text">Роста</span>
              </label>
              <label className="btn-selector__label">
                <input
                  className="btn-selector__input"
                  type="radio"
                  name="leaders"
                  value="down"
                  onChange={ e => this.onChangeType(e) }
                  checked={this.state.type === 'down'}
                />
                <span className="btn-selector__text">Падения</span>
              </label>
            </div>
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
)(QuotesTabs);
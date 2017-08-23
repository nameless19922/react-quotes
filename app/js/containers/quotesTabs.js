import React, { Component } from 'react'

export default class QuotesTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stocks__top">
        <div className="stocks__filter">
          <div className="stocks__filter-title">Лидеры</div>
          <div className="stocks__filter-items">
            <div className="btn-selector _group">
              <label className="btn-selector__label">
                <input className="btn-selector__input" type="radio" name="leaders" value="leadersup" />
                <span className="btn-selector__text">Роста</span>
              </label>
              <label className="btn-selector__label">
                <input className="btn-selector__input" type="radio" name="leaders" value="leadersdown" />
                <span className="btn-selector__text">Падения</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
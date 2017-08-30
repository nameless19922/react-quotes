import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeadersTabs extends React.Component {
  render() {
    return (
      <div className="stocks__top">
        <div className="stocks__filter">
          <div className="stocks__filter-title">Лидеры</div>
          <div className="stocks__filter-items">
            <NavLink activeClassName="_active" to="/leaders/up">Роста</NavLink>
            <NavLink activeClassName="_active" to="/leaders/down">Падения</NavLink>
          </div>
        </div>
      </div>
    )
  }
}
import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { url: '/leaders/up', name: 'Лидеры роста / падения' }
];

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="header__nav">
        { navItems.map((item, index) => (
            <Link to={ item.url } className="header__nav-item" key={ index }>{ item.name }</Link>
        )) }
      </nav>
    );
  }
}
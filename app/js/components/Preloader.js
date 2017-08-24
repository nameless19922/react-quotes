import React, { Component } from 'react'

export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader">
        <div className="preloader__wrapper">
          <div className="preloader__spinner"></div>
        </div>
      </div>
    );
  }
}


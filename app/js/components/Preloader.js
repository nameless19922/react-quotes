import React from 'react'

export default class Preloader extends React.Component {
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


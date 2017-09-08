import React from 'react';

export default class DataMessage extends React.Component {
  createMessageHtml(message) {
    return {
      __html: message
    }
  }

  render() {
    return (
      <div className="data-message">
        <span className="data-message__text" dangerouslySetInnerHTML={ this.createMessageHtml(this.props.message) } />
      </div>
    );
  }
}
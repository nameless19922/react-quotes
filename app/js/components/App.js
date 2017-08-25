import React, { Component } from 'react'
import LeadersTabsContainer from '../containers/LeadersTabsContainer'
import LeadersTableContainer from '../containers/LeadersTableContainer'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="stocks">
          <div className="layout__wrapper">
            <LeadersTabsContainer />
            <LeadersTableContainer />
          </div>
        </section>
    );
  }
}
import React, { Component } from 'react'
import LeadersTabs from './LeadersTabs'
import LeadersTableContainer from '../containers/LeadersTableContainer'

export default class Leaders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="stocks">
          <div className="layout__wrapper">
            <LeadersTabs />
            <LeadersTableContainer />
          </div>
        </section>
    );
  }
}
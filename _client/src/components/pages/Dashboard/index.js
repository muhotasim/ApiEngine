import React from 'react';
import { Header } from '../../general/Common.Comp';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <Header title="Dashboard" />
      </div>
    );
  }
}

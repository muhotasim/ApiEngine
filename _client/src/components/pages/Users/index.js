import React from 'react';
import { Header } from '../../general/Common.Comp';
import Datatable from '../../general/Datatable';
const columns = [
  { label: 'Title', column: 'id', type: 'data' },
  { label: 'Content', column: 'name', type: 'data' },
];

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    ['_onParamsChange'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }
  componentDidMount() {
    this.Datatable._processTableData([
      { id: 4, name: 'fuad 4' },
      { id: 5, name: 'fuad 5' },
      { id: 6, name: 'fuad 6' },
      { id: 4, name: 'fuad 4' },
      { id: 5, name: 'fuad 5' },
      { id: 6, name: 'fuad 6' },
      { id: 4, name: 'fuad 4' },
      { id: 5, name: 'fuad 5' },
      { id: 6, name: 'fuad 6' },
      { id: 6, name: 'fuad 6' },
      { id: 4, name: 'fuad 4' },
      { id: 5, name: 'fuad 5' },
      { id: 6, name: 'fuad 6' },
    ]);
    console.log(this.Datatable);
  }

  _onParamsChange(data, id) {
    console.log(data, id);
  }
  render() {
    return (
      <div className="page">
        <Header title="Users" />
        <Datatable
          ref={(elm) => {
            this.Datatable = elm;
          }}
          columns={columns}
          onParamsChange={this._onParamsChange}
          totalPage={1}
        />
      </div>
    );
  }
}

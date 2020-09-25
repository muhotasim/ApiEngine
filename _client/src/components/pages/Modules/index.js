import React from 'react';
import { Header } from '../../general/Common.Comp';
import ApiList from './ApiList';
import './index.css';
import Input from '../../general/Input';
import Filter from './Filter';
import Datatable from '../../general/Datatable';
const columns = [
  { label: 'Title', column: 'id', type: 'data' },
  { label: 'Content', column: 'name', type: 'data' },
];

export default class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchModule: '',
      slmodule: null,
      selectedFilters: [],
      filterOptions: [],
      filterItems: [],
    };
    [
      '_onChange',
      '_addMoreFilter',
      '_removeFilter',
      '_onParamsChange',
      '_getAndProcessData',
    ].forEach((fn) => (this[fn] = this[fn].bind(this)));
  }
  _onParamsChange(data, id) {
    console.log(data, id);
  }
  _onChange(v, k) {
    this.setState({ [k]: v });
  }
  _addMoreFilter() {
    let filters = this.state.filterItems;
    filters.push({
      field: '',
      conditionType: '',
      value: '',
    });
    this.setState({ filterItems: filters });
  }
  _removeFilter(index) {
    let filters = this.state.filterItems;
    filters.splice(index, 1);
    this.setState({ filterItems: filters });
  }
  componentDidMount() {}

  _getAndProcessData() {
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
  }
  render() {
    const {
      searchModule,
      slmodule,
      selectedFilters,
      filterOptions,
      filterItems,
    } = this.state;
    return (
      <div className="page">
        <Header title="Modules " />
        <div className="row">
          <div className="col-md-3">
            <Input
              type="text"
              label="Search Module"
              value={searchModule}
              onChange={(v) => {
                this._onChange(v, 'searchModule');
                this._getAndProcessData();
              }}
            />
            <ApiList
              onSelect={(v) => {
                this._onChange(v, 'slmodule');
              }}
              apis={[
                { label: 'module 1 ' },
                { label: 'module 2 ' },
                { label: 'module 3 ' },
                { label: 'module 4 ' },
                { label: 'module 5 ' },
                { label: 'module 6 ' },
              ]}
            />
          </div>
          <div className="col-md-9">
            {slmodule && (
              <div>
                <Filter
                  moduleName={slmodule.label}
                  selectedFilters={selectedFilters}
                  filterOptions={filterOptions}
                  filterItems={filterItems}
                  addFilter={this._addMoreFilter}
                  removeFilter={this._removeFilter}
                />
                <Datatable
                  ref={(elm) => {
                    this.Datatable = elm;
                  }}
                  columns={columns}
                  onParamsChange={this._onParamsChange}
                  totalPage={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

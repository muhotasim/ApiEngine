import React from 'react';
import { uuid } from '../../general/Common.Comp';
import Input from '../../general/Input';
const searchType = [
  { label: '=', value: '=' },
  { label: 'like', value: 'like' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
  { label: '!=', value: '!=' },
];
const Filter = (props) => {
  const key = uuid();
  return (
    <div>
      <Input
        readonly
        type={'text'}
        value={props.moduleName}
        onChange={() => {}}
      />
      <Input
        label={'Filters'}
        isMulti
        type={'select'}
        value={props.selectedFilters}
        options={props.filterOptions}
        onChange={() => {}}
      />
      <div>
        <button
          onClick={props.addFilter}
          className="btn btn-project-default float-right btn-sm"
        >
          Add More Filter
        </button>
        <p className="clearfix"></p>
      </div>

      {props.filterItems.map((filter, index) => {
        return (
          <div>
            <div className="row">
              <div className="col-md-3">
                <Input
                  type={'select'}
                  value={props.selectedFilters}
                  options={props.filterOptions}
                  onChange={() => {}}
                />
              </div>

              <div className="col-md-2">
                <Input
                  type={'select'}
                  value={props.selectedFilters}
                  options={searchType}
                  onChange={() => {}}
                />
              </div>

              <div className="col-md-3">
                <Input type={'text'} value={''} onChange={() => {}} />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-md btn-default"
                  onClick={() => {
                    props.removeFilter(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <button className="btn btn-project-default float-right btn-md">
          Search
        </button>
        <p className="clearfix"></p>
      </div>
    </div>
  );
};
export default Filter;

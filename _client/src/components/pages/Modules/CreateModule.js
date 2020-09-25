import React from 'react';
import { uuid, Header } from '../../general/Common.Comp';
import Input from '../../general/Input';

class CreateModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: '',
      descriptions: '',
      fields: [],
    };
    ['onChange', '_onRemove', '_addField'].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }
  onChange(v, k) {
    this.setState({ [k]: v });
  }
  _onRemove(index) {
    let fields = this.state.fields;
    fields.splice(index, 1);
    this.setState({ fields: fields });
  }
  _addField() {
    let fields = this.state.fields;
    fields.push({
      fieldName: '',
      type: '',
      length: '',
    });
    this.setState({ fields: fields });
  }
  render() {
    const { moduleName, descriptions, fields } = this.state;
    return (
      <div className="page">
        <Header title="Create Module" />
        <div className="row">
          <div className="col-md-4">
            <Input
              label="Module Name"
              type="text"
              value={moduleName}
              onChange={(v) => {
                this.onChange(v, 'moduleName');
              }}
            />
            <Input
              label="System Generated Table Name"
              type="text"
              readonly
              value={''}
              onChange={(v) => {}}
            />
            <Input
              label="Module Descriptions"
              type="textarea"
              value={descriptions}
              onChange={(v) => {
                this.onChange(v, 'descriptions');
              }}
            />
          </div>
          <div className="col-md-8">
            <ModuleFields
              fields={fields}
              onRemove={this._onRemove}
              addField={this._addField}
            />
          </div>
        </div>
      </div>
    );
  }
}
const ModuleFields = (props) => {
  return (
    <div>
      <div>
        <button
          onClick={props.addField}
          className="btn btn-project-default float-right btn-sm"
        >
          add field
        </button>
        <p className="clearfix"></p>
      </div>
      {props.fields.map((field, index) => {
        return (
          <div className="row">
            <div className="col-md-3">
              <Input type={'text'} value={''} onChange={() => {}} />
            </div>
            <div className="col-md-3">
              <Input
                type={'select'}
                value={null}
                options={[]}
                onChange={() => {}}
              />
            </div>
            <div className="col-md-3">
              <Input type={'number'} value={''} onChange={() => {}} />
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-md btn-default"
                onClick={() => {
                  props.onRemove(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CreateModule;

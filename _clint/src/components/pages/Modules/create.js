import React from 'react';
import { Header, Input, Button, Loader } from '../../../general/General';
import Select from 'react-select';
import config from '../../../constents/settings';
const dataTypes = [
  { value: 'VARCHAR', label: 'String' },
  { value: 'INT', label: 'Integer' },
  { value: 'FLOAT', label: 'Float' },
  { value: 'TEXT', label: 'Text' },
  { value: 'JSON', label: 'Json' },
  { value: 'FILE', label: 'File' },
  { value: 'TIMESTAMP', label: 'DateTime' },
  { value: 'BOOLEAN', label: 'Boolean' },
];
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: '',
      displayName: '',
      fields: [],
      loading: false,
    };
    [
      '_onChange',
      '_onClick',
      '_removeField',
      '_createOrUpdateTable',
      '_validateFields',
    ].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  _validateFields() {
    const fields = this.state.fields;
    let isValid = true;
    for (const field of fields) {
      if (!field.name || !field.type || !field.length) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }
  _onChange(e, k) {
    this.setState({ [k]: e.target.value });
  }

  _onChangeFields(v, i, k) {
    const { fields } = this.state;
    let tempFields = fields;
    tempFields[i][k] = v;
    this.setState({ fields: tempFields });
  }

  _onClick(e, value) {
    const { fields } = this.state;
    let tempFields = fields;
    tempFields.push({
      name: '',
      type: '',
      length: '',
    });
    this.setState({ fields: tempFields });
  }
  _createOrUpdateTable() {
    const { moduleName, displayName, fields } = this.state;

    if (!moduleName || !displayName) {
      notify('Please enter module name and display', 3000);
      return;
    }
    if (this._validateFields() == false) {
      notify('Please enter valid fields', 3000);
      return;
    }
    const _this = this;
    var tempFields = [];
    _this.setState({ loading: true });

    fields.forEach((v) => {
      tempFields.push({
        name: v.name,
        type: v.type.value,
        length: v.length,
      });
    });

    $.ajax({
      type: 'POST',
      url: config.origin + 'system/create-table',
      data: {
        tableName: moduleName,
        displayName: displayName,
        query: JSON.stringify(tempFields),
      },
      success: (returnData) => {
        if (returnData.status == 'success') {
          _this.setState({ loading: false });
          notify('module has been created successfully.', 2000);
        } else {
          _this.setState({ loading: false });
          notify('failed to create module.', 2000);
        }
      },
    });
  }

  _removeField(index) {
    const { fields } = this.state;
    let tempFields = fields;
    tempFields.splice(index, 1);
    this.setState({ fields: tempFields });
  }

  render() {
    const { moduleName, displayName, fields, loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Header HeaderTitle={'Create Module'} />

        <div className="col-md-4 offset-md-4">
          <Input
            value={moduleName}
            inputlabel="Module Name"
            onChange={(e) => {
              this._onChange(e, 'moduleName');
            }}
            className="form-control"
          />
          <Input
            value={displayName}
            inputlabel="Display Name"
            onChange={(e) => {
              this._onChange(e, 'displayName');
            }}
            className="form-control"
          />
        </div>
        <div className="col-md-8 offset-md-2 col-sm-12 offset-sm-0">
          <div>
            <Button
              className="btn btn-sm btn-primary float-right"
              onClick={this._onClick}
            >
              Add Field
            </Button>
          </div>
          <p className="clearfix"></p>
          <div>
            {fields.map((v, i) => {
              return (
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-3">
                    <Input
                      value={v.name}
                      className="form-control"
                      placeholder="Field Name"
                      onChange={(e) => {
                        this._onChangeFields(e.target.value, i, 'name');
                      }}
                    />
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <Select
                      options={dataTypes}
                      value={v.type}
                      onChange={(v) => {
                        this._onChangeFields(v, i, 'type');
                      }}
                      placeholder="Type"
                    />
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <Input
                      value={v.length}
                      className="form-control"
                      placeholder="Length"
                      onChange={(e) => {
                        this._onChangeFields(e.target.value, i, 'length');
                      }}
                    />
                  </div>
                  <div className="col-md-1 col-sm-1 col-xs-1">
                    <button
                      className="btn btn-xs btn-danger"
                      onClick={() => {
                        this._removeField(i);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={this._createOrUpdateTable}
            className="btn btn-md btn-primary float-right"
          >
            Create Table
          </Button>
        </div>
      </div>
    );
  }
}

export default Create;

import React, { Fragment } from 'react';
import { uuid } from '../Common.Comp';
import Pager from './Pager';
import PropType from 'prop-types';
import './index.css';
class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      datas: [],
    };
    [
      '_processTableData',
      '_showLoader',
      '_onParamsChange',
      '_exportData',
    ].forEach((v, i) => {
      this[v] = this[v].bind(this);
    });
  }

  _processTableData(datas) {
    this.setState({ datas: datas, loading: false });
  }

  _showLoader(d = true) {
    this.setState({ loading: d });
  }

  _onParamsChange(value, type) {
    this.props.onParamsChange(type, value);
  }

  _exportData() {
    const { datas } = this.state;
    let arrData = [];
    let tempData = '';
    tempData += this.props.ExportFields.join(',');
    tempData += '\n';
    arrData.push(tempData);
    datas.forEach((v) => {
      let tempRow = [];
      let tempData = v;
      this.props.ExportFieldsId.forEach((field) => {
        tempRow.push(tempData[field]);
      });
      tempRow = tempRow.join(',');
      tempRow += '\n';
      arrData.push(tempRow);
    });
    const file = new File(arrData, 'export', { type: 'csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'exported_datatable.csv';
    a.click();
  }

  render() {
    const { columns, totalPage, widths, exports } = this.props;
    const { loading, datas } = this.state;
    let key = uuid();
    return (
      <div className="custom-datatable-holder ">
        {exports == true ? (
          <div>
            <button
              style={{
                backgroundColor: 'lightgray',
                color: 'black',
                border: '1px solid darkgray',
                fontWeight: '700',
              }}
              onClick={this._exportData}
              className={'btn btn-sm btn-default pull-right mt-2 mr-2'}
            >
              Export
            </button>
          </div>
        ) : null}
        <table className="table table-striped custom-datatable table-bordered table-sm">
          <thead>
            <tr>
              {columns.map((cl, index) => {
                return (
                  <th key={key + index} style={widths ? widths[index] : {}}>
                    {cl.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody style={{ position: 'relative' }}>
            <TableBody
              _onParamsChange={this._onParamsChange}
              datas={datas}
              loading={loading}
              columns={columns}
            />
          </tbody>
        </table>
        <p className="clearfix"></p>
        <Pager pageCount={totalPage} _onParamsChange={this._onParamsChange} />
      </div>
    );
  }
}

const TableBody = (props) => {
  const { loading, columns, datas, _onParamsChange } = props;
  let key = uuid();
  if (loading) {
    return (
      <Fragment>
        <tr
          className={'text-center'}
          style={{
            position: 'absolute',
            right: '0',
            left: '0',
            fontSize: '13px',
          }}
        >
          <td
            style={{ border: 'none', fontSize: '16px' }}
            className="fa fa-refresh fa-spin"
          ></td>
        </tr>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {datas.map((data, index) => {
        return (
          <TrComp
            key={key + index}
            columns={columns}
            _onParamsChange={_onParamsChange}
            data={data}
          />
        );
      })}
    </Fragment>
  );
};

const TrComp = (props) => {
  const { columns, data, _onParamsChange } = props;
  let key = uuid();
  return (
    <tr
      key={uuid()}
      onClick={() => {
        _onParamsChange(data, 'row');
      }}
    >
      {columns.map((cl, index) => {
        if (cl.type == 'data') {
          return <td key={key + index}>{data[cl.column]}</td>;
        } else if (cl.type == 'node') {
          return (
            <td>
              {data[cl.column].map((v, i) => {
                return (
                  <span
                    key={key + index}
                    className={v.className}
                    onClick={(e) => {
                      e.stopPropagation();
                      _onParamsChange(v.data, v.id);
                    }}
                    dangerouslySetInnerHTML={{ __html: v.label }}
                  ></span>
                );
              })}
            </td>
          );
        } else {
          return null;
        }
      })}
    </tr>
  );
};
Datatable.propTypes = {
  columns: PropType.array.isRequired,
  onParamsChange: PropType.func.isRequired,
  totalPage: PropType.number.isRequired,
  exports: PropType.bool,
};
export default Datatable;

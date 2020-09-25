import React from 'react';
import fmGroup from '../../../constents/cssConstents';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { uuid } from '../Common.Comp';
import Toggle from 'react-toggle';
const Label = (props) => {
  return props.label ? <label>{props.label}</label> : null;
};

const Input = (props) => {
  let uid = uuid();
  switch (props.type) {
    case 'text':
    case 'number':
      return (
        <div
          className={
            fmGroup.fmGroup +
            (props.error
              ? fmGroup.hasError
              : '' + props.success
              ? fmGroup.hasSuccess
              : '')
          }
        >
          <Label label={props.label} />
          <input
            type={props.type}
            className={fmGroup.fmControl}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readonly}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
        </div>
      );
      break;
    case 'toggle':
      return (
        <Toggle
          value={props.value}
          onChange={(v) => {
            props.onChange(v);
          }}
        />
      );
      break;
    case 'password':
      return (
        <div
          className={
            fmGroup.fmGroup +
            (props.error
              ? fmGroup.hasError
              : '' + props.success
              ? fmGroup.hasSuccess
              : '')
          }
        >
          <Label label={props.label} />
          <input
            type={props.type}
            className={fmGroup.fmControl}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readonly}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
        </div>
      );
      break;
    case 'textarea':
      return (
        <div
          className={
            fmGroup.fmGroup +
            (props.error
              ? fmGroup.hasError
              : '' + props.success
              ? fmGroup.hasSuccess
              : '')
          }
        >
          <Label label={props.label} />
          <textarea
            rows={5 || props.rows}
            type={props.type}
            className={fmGroup.fmControl}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readonly}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
        </div>
      );
      break;

    case 'checkbox':
      if (props.isMulti) {
        return (
          <div
            className={
              fmGroup.fmGroup +
              (props.error
                ? fmGroup.hasError
                : '' + props.success
                ? fmGroup.hasSuccess
                : '')
            }
          >
            {props.options.map((option, index) => {
              let isChecked =
                props.value.findIndex((d) => {
                  return d.value == option.value;
                }) == -1
                  ? false
                  : true;
              return (
                <label key={uid + index} style={{ padding: '.5rem' }}>
                  <input
                    type={props.type}
                    checked={isChecked}
                    value={option.value}
                    onClick={(e) => {
                      let slvalues = props.value;
                      let valueIndex = slvalues.findIndex((d) => {
                        return d.value == option.value;
                      });
                      if (valueIndex == -1) {
                        slvalues.push({
                          label: option.label,
                          value: option.value,
                        });
                      } else {
                        slvalues.splice(valueIndex, 1);
                      }
                      props.onChange(slvalues);
                    }}
                  />{' '}
                  {option.label}
                </label>
              );
            })}
          </div>
        );
      } else {
        return (
          <div
            className={
              fmGroup.fmGroup +
              (props.error
                ? fmGroup.hasError
                : '' + props.success
                ? fmGroup.hasSuccess
                : '')
            }
          >
            <label>
              <input
                type={props.type}
                checked={props.checked}
                value={props.value}
                disabled={props.disabled}
                readOnly={props.readonly}
                onClick={(e) => {
                  props.onChange(!props.checked);
                }}
              />{' '}
              {props.label}
            </label>
          </div>
        );
      }
      break;

    case 'select':
      return (
        <div
          className={
            fmGroup.fmGroup +
            (props.error
              ? fmGroup.hasError
              : '' + props.success
              ? fmGroup.hasSuccess
              : '')
          }
        >
          <Label label={props.label} />
          <Select
            isMulti={props.isMulti}
            options={props.options}
            value={props.value}
            onChange={(v) => {
              props.onChange(v);
            }}
          />
        </div>
      );
      break;
    case 'radio':
      return (
        <div
          className={
            fmGroup.fmGroup +
            (props.error
              ? fmGroup.hasError
              : '' + props.success
              ? fmGroup.hasSuccess
              : '')
          }
        >
          {props.options.map((option, index) => {
            console.log(props.value, option.value);
            return (
              <label key={uid + index} style={{ padding: '.5rem' }}>
                <input
                  type={props.type}
                  checked={
                    props.value
                      ? props.value.value == option.value
                        ? true
                        : false
                      : false
                  }
                  onChange={(e) => {
                    props.onChange({
                      label: option.label,
                      value: option.value,
                    });
                  }}
                />{' '}
                {option.label}
              </label>
            );
          })}
        </div>
      );
      break;

    case 'file':
      if (props.isMulti) {
        const files = props.value;
        return (
          <div
            className="multi-file-upload-holder"
            className={
              fmGroup.fmGroup +
              (props.error
                ? fmGroup.hasError
                : '' + props.success
                ? fmGroup.hasSuccess
                : '')
            }
          >
            <div
              className="row"
              style={
                files.length
                  ? {
                      border: '1px solid lightgray',
                      marginTop: '13px',
                    }
                  : {}
              }
            >
              {files.map((file, index) => {
                const fileType = file.type;
                const fileName = file.name;
                let FileView = null;
                const fileURL =
                  typeof file.file == 'object'
                    ? URL.createObjectURL(file.file)
                    : file.file;
                if (/.(jpeg|jpg|png|gif|raw)/.test(fileType)) {
                  FileView = <img src={fileURL} height="auto" width="100%" />;
                } else if (fileType == 'application/pdf' || fileType == 'pdf') {
                  FileView = (
                    <object data={fileURL} height="auto" width="100%" />
                  );
                } else {
                  FileView = (
                    <div
                      style={{
                        backgroundColor: 'rgba(0,0,0,1)',
                        color: 'white',
                        marginBottom: '-15px',
                        textAlign: 'center',
                        height: '10rem',
                        paddingTop: '3rem',
                      }}
                    >
                      <p>Can't preview</p>
                    </div>
                  );
                }
                return (
                  <div className="col-md-3" key={uid + index}>
                    <div className="multiple-file-single-holder">
                      <span
                        onClick={() => {
                          let tempFiles = files;
                          tempFiles.splice(index, 1);
                          props.onChange(tempFiles);
                        }}
                        className="close"
                      >
                        &times;
                      </span>
                      {FileView}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="input-group mb-3">
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  let tempFiles = files;
                  const f = e.target.files[0];
                  tempFiles.push({
                    type: f.type,
                    name: f.name,
                    file: f,
                  });

                  props.onChange(tempFiles);
                }}
              />
              <input type="text" readOnly={true} className="form-control" />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={(e) => {
                    const parentComp = e.target.parentNode.parentNode;
                    const file = parentComp.querySelector("input[type='file']");
                    file.click();
                  }}
                >
                  BROWSE
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        let fileType = props.value ? props.value.type : '';
        let fileName = '';
        let file = props.value
          ? typeof props.value == 'string'
            ? props.value
            : URL.createObjectURL(props.value)
          : '';
        let FileView = null;
        if (typeof props.value == 'object') {
          fileName = props.value ? props.value.name : '';
          if (/.(jpeg|jpg|png|gif|raw)/.test(fileType)) {
            FileView = <img src={file} height="auto" width="100%" />;
          } else if (fileType == 'application/pdf') {
            FileView = <object data={file} height="auto" width="100%" />;
          } else {
            FileView = (
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,1)',
                  color: 'white',
                  marginBottom: '-15px',
                  textAlign: 'center',
                  height: '10rem',
                  paddingTop: '3rem',
                }}
              >
                <p>Can't preview</p>
              </div>
            );
          }
        } else {
          let fileSpliter = props.value.split('.');
          fileName = props.value
            ? props.value.split('\\')[props.value.split('\\').length - 1]
            : '';
          fileType = fileSpliter.length
            ? fileSpliter[fileSpliter.length - 1]
            : '';
          if (/.(jpeg|jpg|png|gif|raw)/.test(fileType)) {
            FileView = <img src={file} height="100px" width="200px" />;
          } else if (fileType == 'pdf') {
            FileView = <object data={file} height="100px" width="200px" />;
          } else {
            FileView = (
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,1)',
                  color: 'white',
                  marginBottom: '-15px',
                  textAlign: 'center',
                  height: '10rem',
                  paddingTop: '3rem',
                }}
              >
                <p>Can't preview</p>
              </div>
            );
          }
        }
        return (
          <div
            className={
              fmGroup.fmGroup +
              (props.error
                ? fmGroup.hasError
                : '' + props.success
                ? fmGroup.hasSuccess
                : '')
            }
          >
            <Label label={props.label} />
            {props.value ? FileView : null}
            <div className="input-group mb-3">
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  props.onChange(e.target.files[0]);
                }}
              />
              <input
                type="text"
                value={fileName}
                readOnly={true}
                className="form-control"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={(e) => {
                    const parentComp = e.target.parentNode.parentNode;
                    const file = parentComp.querySelector("input[type='file']");
                    file.click();
                  }}
                >
                  BROWSE
                </span>
              </div>
            </div>
          </div>
        );
      }

      break;
  }
};
export default Input;
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  file: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  rows: PropTypes.number,
};
Label.propTypes = {
  label: PropTypes.string.isRequired,
};

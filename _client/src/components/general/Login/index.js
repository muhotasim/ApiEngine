import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import LoginApi from '../../../apiHandaler/LoginApi';
import Input from '../Input';
import { PopUpModal, Header } from '../Common.Comp';
import { uuid } from '../Common.Comp';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.loginModelId = uuid();
    ['_onChange', '_onLogin'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }
  _onChange(v, k) {
    this.setState({ [k]: v });
  }
  _onLogin() {
    const { email, password } = this.state;
    LoginApi.login(email, password, (returnData) => {
      //call action after login
    });
  }

  componentDidMount() {
    $('#' + this.loginModelId).modal('show');
  }
  componentWillUnmount() {
    $('#' + this.loginModelId).modal('hide');
  }

  render() {
    return (
      <Fragment>
        <div>
          <div
            className="modal fade"
            id={this.loginModelId}
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="model-body">
                  <div className="login-model-content">
                    <Header title={'Login'} />
                    <Input
                      label="User Email"
                      type="text"
                      onChange={(v) => {
                        this._onChange(v, 'email');
                      }}
                    />

                    <Input
                      label="Password"
                      type="text"
                      onChange={(v) => {
                        this._onChange(v, 'password');
                      }}
                    />
                    <button
                      className="btn btn-md btn-primary mt-2"
                      onClick={this._onLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Login;

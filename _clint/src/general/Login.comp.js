import React from 'react';
import {Button, Input} from './General';
import config from '../constents/settings';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            error:false,
        };
        this._onChange = this._onChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount() {
    }

    UNSAFE_componentWillMount() {
    }

    _onChange(e, name) {
        this.setState({[name]: e.target.value});
    }

    onLogin(n,p){
        const _this=this;
        
        _this.setState({error:false});
        $.ajax({
            type:"POST",
            url:config.origin+"apis/login",
            data:{
                email:n,
                password:p
            },
            success:(returnData)=>{
                if(returnData.status=="success"){
                    
                    _this.setState({error:false});
                  _this.props.onClickLogin(returnData.data[0]);
                }else{
                    _this.setState({error:true});
                }
            }
        })
    }
    render() {
        const {name, password} = this.state;
        
        return (
            <div>
                <div className="container">
                    <div style={{marginTop:"20%"}}>
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <div className="login-panel">
                                    {this.state.error&&(
                                        <p className="alert alert-danger alert-sm">Please enter valid cordintial.</p>
                                    )}
                                <Input inputlabel={"Your Name"} type="text" className="form-control" value={name}
                                        onChange={(e) => {
                                            this._onChange(e, 'name')
                                        }}/>
                                    <Input inputlabel={"Your Password"} type="password" className="form-control"
                                        value={password} onChange={(e) => {
                                        this._onChange(e, 'password')
                                    }}/>
                                    <Button className="btn btn-sm btn-dark float-right" onClick={() => {
                                       this.onLogin(name, password)
                                    }}>Login</Button>
                                    <p className="clearfix"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}


export default Login;

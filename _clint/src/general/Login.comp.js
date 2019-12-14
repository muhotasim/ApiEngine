import React from 'react';
import {Button, Input} from './General';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
    }

    UNSAFE_componentWillMount() {
    }

    _onChange(e, name) {
        this.setState({[name]: e.target.value});
    }

    render() {
        const {name, password} = this.state;
        const {onClickLogin} = this.props;
        return (
            <div>

                <div className="text-center">
                    <div className="jumbotron" style={{background: "#333"}}>
                    </div>
                </div>

                <div className="container">
                    <div>
                        <DemoLoginAccess/>
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <Input inputlabel={"Your Name"} type="text" className="form-control" value={name}
                                       onChange={(e) => {
                                           this._onChange(e, 'name')
                                       }}/>
                                <Input inputlabel={"Your Password"} type="password" className="form-control"
                                       value={password} onChange={(e) => {
                                    this._onChange(e, 'password')
                                }}/>
                                <Button className="btn btn-sm btn-dark float-right" onClick={() => {
                                    onClickLogin(name, password)
                                }}>Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

const DemoLoginAccess = () => {
    return (<div className="text-center mb-5">
        <h3>Administrator Area</h3>
        <p>(login: bit-bucket@x-cart.com, password: master)</p>
    </div>);
};

export default Login;

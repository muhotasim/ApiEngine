import React from 'react';
import {connect} from 'react-redux';
import Login from '../general/Login.comp';
import {logout, setLoginData} from '../actions/User.action';
import {setSettings} from '../actions/Setting.action';
import {getCookie, tokenDencoder} from '../utils/common.func';
import {HashRouter, Route} from 'react-router-dom';
import mainmenu from '../constents/mainmenu';

import Topmenu from '../general/Topmenu';


import Dashboard from './pages/Dashboard';
import Modules from "./pages/Modules";
import ModuleCreate from "./pages/Modules/create";
import ModuleEdit from "./pages/Modules/edit";
import ModuleShow from "./pages/Modules/show";

import { hot } from 'react-hot-loader';

//------------- end import pages ---------------

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this._sidebarToggle = this._sidebarToggle.bind(this);
    }

    UNSAFE_componentWillMount() {
        const {_setSetting} = this.props;
        if (getCookie("tokenData") != null) {
            const data = JSON.parse(tokenDencoder(getCookie("tokenData")));
            _setSetting(data);
        } else {

        }
    }

    componentDidMount() {

    }

    _sidebarToggle() {
        const {sidebarOpen} = this.state;
        this.setState({sidebarOpen: !sidebarOpen});
    }

    render() {
        const {_login, userStore} = this.props;
        const {_sidebarToggle} = this;
        const {sidebarOpen} = this.state;

        if (userStore.loginData == null) {
            return <Login onClickLogin={_login}/>
        } else {
            return (<div>
                <HashRouter>
                    <div>
                        <Topmenu sidebarToggle={_sidebarToggle} menus={mainmenu}/>
                        <div className="app-holder">
                                <div className="container" style={{paddingTop:"50px"}}>
                                   
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route exact path="/Modules" component={Modules}/>
                                    <Route exact path="/Module/Create" component={ModuleCreate}/>
                                    <Route exact path="/Module/Edit/:id" component={ModuleEdit}/>
                                    <Route exact path="/Module/Show/:id" component={ModuleShow}/>
                                    
                                </div>
                        </div>
                    </div>
                </HashRouter>
            </div>);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userStore: state.UserStore
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        _login: (u, p) => dispatch(setLoginData(u, p)),
        _setSetting: (d) => dispatch(setSettings(d)),
        _logout: () => dispatch(logout())
    }
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));

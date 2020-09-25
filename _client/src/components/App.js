import React from 'react';
import TopMenu from './general/TopMenu';
import Input from './general/Input';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// ---- pages -------
import Login from './general/Login';
import Users from './pages/Users';
import Settings from './pages/Settings';
import UserCreate from './pages/Users/UserCreate';
import Modules from './pages/Modules';
import CreateModule from './pages/Modules/CreateModule';

// end pages
import menu from '../constents/menu';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      val: '',
      showLoginModel: false,
    };
    [].forEach((fn) => (this[fn] = this[fn].bind(this)));
  }
  componentDidMount() {}

  render() {
    const { showLoginModel } = this.state;
    if (showLoginModel) return <Login />;
    return (
      <HashRouter>
        <Switch>
          <div>
            <div>
              <TopMenu menus={menu} />
            </div>
            <div>
              <Route exact component={Dashboard} path="/" />
              <Route exact component={Dashboard} path="/Dashboard" />
              <Route exact component={Users} path="/Users" />
              <Route exact component={Settings} path="/Settings" />
              <Route exact component={UserCreate} path="/UserCreate" />
              <Route exact component={Modules} path="/Modules" />
              <Route exact component={CreateModule} path="/CreateModule" />
            </div>
          </div>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

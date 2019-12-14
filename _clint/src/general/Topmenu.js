import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {uuid} from '../utils/common.func';
import {connect} from 'react-redux';
import {logout} from '../actions/User.action';

class Topmenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.menuRef = uuid();
    }

    render() {
        const {menus, sidebarToggle, _logout} = this.props;
        return (<Fragment>
            <nav className="app-top-bar navbar navbar-expand-lg navbar-light bg-light">
             
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target={"#" + this.menuRef}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id={this.menuRef}>
                    <ul className="navbar-nav mr-auto">
                        {menus.map((menu, index) => {
                            return <MenuItem key={uuid()} menu={menu}/>;
                        })}
                    </ul>
                </div>
            </nav>
            <p className="clearfix"></p></Fragment>);
    }
}

const MenuItem = (props) => {
    const {menu} = props;
    if (menu.menus.length == 0) {
        return (<li className="nav-item active" key={uuid()}>
            <Link className="nav-link" to={menu.link}>{menu.label}</Link>
        </li>);
    } else {
        return <li className="nav-item dropdown" key={uuid()}>
            <a className="nav-link dropdown-toggle" href="javascript:void(0)"
               data-toggle="dropdown">
                {menu.label}
            </a>
            <div className="dropdown-menu">
                {menu.menus.map((sub_menu, index) => {
                    return <Link className="dropdown-item" to={sub_menu.link}>{sub_menu.label}</Link>;
                })}
            </div>
        </li>
    }
};
const mapStateToProps = (state) => {
    return {
        userStore: state.UserStore
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        _logout: () => dispatch(logout())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Topmenu);

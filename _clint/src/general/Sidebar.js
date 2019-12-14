import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {uuid} from '../utils/common.func';

class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {menus, isOpen, _logout} = this.props;
        return (<Fragment>
            <div className="sidebar-left" style={{marginLeft: isOpen ? "0px" : "-200px"}}>
                <div>
                    {menus.map((menu, index) => {
                        return <MenuItem key={uuid()} menu={menu}/>
                    })}
                </div>
            </div>
        </Fragment>);
    }
}

const MenuItem = (props) => {
    const {menu} = props;
    if (menu.menus.length == 0) {
        return (<div key={uuid()} className="sidebar-main-menu" key={uuid()}>
            <Link className="nav-sidebar-link" to={menu.link}><i className={menu.icon}></i> {menu.label} </Link>
        </div>);
    } else {
        return <SubMenu menu={menu}/>
    }
};

const SubMenu = (props) => {
    const [open, setOpen] = useState(false);
    const {menu} = props;
    return <div className="sidebar-main-menu" key={uuid()}>
        <a onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
        }}>
            <i className={menu.icon}></i> {menu.label} {open ?
            <span className={"sidebar-expender"}><i className={"fa fa-chevron-down float-right"}></i></span> :
            <span className={"sidebar-expender"}><i className={"fa fa-chevron-left float-right"}></i></span>}
        </a>
        {open ?
            <div className="sidebar-sub-menu">
                {menu.menus.map((sub_menu, index) => {
                    return <div className="nav-sidebar-link" key={uuid()}><Link to={sub_menu.link}><i
                        className={sub_menu.icon}></i>{sub_menu.label}</Link></div>;
                })}
            </div> : null}
    </div>;
};

export default Sidebar;
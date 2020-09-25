import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNavigation: true,
    };
    ['toggleNavigation'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  toggleNavigation() {
    this.setState({ openNavigation: !this.state.openNavigation });
  }

  render() {
    const { openNavigation } = this.state;
    const { brandName, showBrand, menus } = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue">
          {this.props.showBrand && (
            <a className="navbar-brand" href="#">
              {this.props.brandName}
            </a>
          )}
          <button className="navbar-toggler" onClick={this.toggleNavigation}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {openNavigation && (
            <div className=" navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {menus.map((menu, index) => {
                  if (menu.menus.length == 0) {
                    return (
                      <li className="nav-item active" key={index}>
                        <Link className="nav-link" to={menu.link}>
                          {menu.label}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li className="nav-item dropdown " key={index}>
                        <a
                          className="nav-link dropdown-toggle"
                          onClick={(e) => {
                            let dropDown = e.target.parentNode.querySelector(
                              '.dropdown-menu '
                            );
                            if (
                              dropDown.style.display == '' ||
                              dropDown.style.display == 'none'
                            ) {
                              dropDown.style.display = 'block';
                            } else {
                              dropDown.style.display = 'none';
                            }
                          }}
                        >
                          {menu.label}
                        </a>
                        <div className="dropdown-menu bg-dark-blue">
                          {menu.menus.map((submenu, subIndex) => {
                            return (
                              <Link
                                className="dropdown-item"
                                to={submenu.link}
                                key={index + '-' + subIndex}
                              >
                                {submenu.label}
                              </Link>
                            );
                          })}
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </nav>
      </Fragment>
    );
  }
}
export default TopMenu;

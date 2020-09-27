import React,{ useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const Navigation = props =>{
    return(<>
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
    <ul className="navbar-nav">
    {props.menus.map((v,i)=>{
        return (<li className="nav-item active" key={i}>
        <Link  className="nav-link" to={v.link}>{v.label}</Link>
        </li>)
    })}
  </ul>
</nav>
</>);
}
export default Navigation;
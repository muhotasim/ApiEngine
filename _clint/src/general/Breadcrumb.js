import React from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        const _this = this;

        return (<div className={"breadcrumb"}>
            <ul>
                {window.location.hash.replace("#/", "").split("/").map(v => {
                    return <li><b>/</b> <Link to={v}>{v}</Link></li>
                })}
            </ul>
        </div>)
    }

}

export default Breadcrumb;
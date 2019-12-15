import React from 'react';

export const Input = (props) => {
    return (<React.Fragment>
        <div className="form-group">
            {props.inputlabel ? <label> {props.inputlabel} </label> : null}
            <input {...props}/>
        </div>
    </React.Fragment>);
};

export const Button = (props) => {
    return (<React.Fragment>
        <button {...props}> {props.children} </button>
    </React.Fragment>);
};

export const Header = (props) => {
    return <div className="header-holder">
        <h3 className="header-title">{props.HeaderTitle}</h3>
        <p className="header-content">{props.HeaderContent}</p>
    </div>
};

export const Loader = (props) => {
    return <div className="text-center">
        <i className="fa fa-refresh fa-spin"></i> <span>Please Wait</span>
    </div>
};

export const uuid = (i = 0) => {
    return "x" + i + rendomString() + new Date().getTime() + rendomString() + rendomString()
};
const rendomString = () => {
    return Math.random().toString(36).substring(7);
};

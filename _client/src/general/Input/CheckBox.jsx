import React from "react";
const CheckBox = props =>{
    return <><input type="checkbox" checked={props.checked} style={props.style} onChange={ (e)=>{props.onChange(!props.checked);} }/></>;
}

export default CheckBox;
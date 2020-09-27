import React from "react";
const NumberInput = props =>{
    return <><input className="form-control" type="text" value={props.value} style={props.style} onChange={ (e)=>{props.onChange(e.target.value);} }/></>;
}

export default NumberInput;
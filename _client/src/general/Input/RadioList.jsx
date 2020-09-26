import React from "react";
import {getGuid} from "./utils";
const RadioList = props =>{
    const name = getGuid();
    return <>
        <div>
        {props.options.map((v,i)=>{
            return  <label> <input name={name} onClick={e=>{props.onChange(v)}} checked={props.value?props.value.value==v.value:false} value={v.value} type="radio"/> {v.label}</label>
        })}
        </div>
    </>
}

export default RadioList;
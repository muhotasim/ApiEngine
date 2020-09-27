import React from "react";
const NumberInput = props =>{
    return <><input className="form-control" type="number" style={props.style}  onChange={(e) => {
        var keyCode = e.which ? e.which : e.keyCode;
        const regexp = /^[0-9\b]+$/;
        if (!regexp.test(String.fromCharCode(keyCode))) {
          e.preventDefault();
          return;
        }
      }} value={props.value} onChange={e=>{ let val = e.target.value;
        if (!val) {
          props.onChange(val);
          return;
        }
        const regexp = /^[0-9\b]+$/;
        if (regexp.test(val)) {
          props.onChange(val);
        } else {
          e.preventDefault();
          return;
        }}}/>
        </>;
}



export default NumberInput;
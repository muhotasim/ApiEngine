import React from "react";
const FileInput = props =>{
    return <>
    <div className="input-group">
        <input type="file" onChange={e=>{
            if(e.target.files.length){
                props.onChange(e.target.files[0]);
            }else{
                props.onChange(null);
            }
        }} style={{display:"none"}}/>
        
        {props.preview&&<div>
            <object data={props.value&& typeof props.value=="object"?URL.createObjectURL(props.value):props.value} style={{height:"100px",width:"100px"}}/></div>}
        <button style={props.style} onClick={e=>{
            let fileContainer = e.target.parentNode;
            let fileInput = fileContainer.querySelector("input[type='file']");
            fileInput.click();
        }}>{props.children}</button>
    </div>
    </>;
}

export default FileInput;
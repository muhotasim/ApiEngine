import React,{useState} from "react";
const CheckBox = props =>{
const [slOptions, setslOptions] = useState([]);
return <>{props.options.map((v,i)=>{
    return <><label><input type="checkbox" key={i} checked={props.value?props.options.find(v=>{return v.value==props.value;}):false} style={props.style} onChange={ (e)=>{
        let option = props.options[i];
        let index = slOptions.findIndex(v=>{return v.value==option.value;});
        let newOptions = slOptions;
        
        if(index==-1){
            newOptions.push(option);
        }else{
            newOptions.splice(index,1);
        }
        setslOptions(newOptions);
        props.onChange(slOptions);
    } }/> {v.label}</label></>
})}</>;
}

export default CheckBox;
import React from "react";
import Checkbox from "./CheckBox";
import CheckBoxList from "./CheckBoxList";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import RadioList from "./RadioList";
import Select from "./Select";
import FileInput from "./FileInput";
import FileList from "./FileList";
const InputHolder = props =>{
   switch(props.type){
    case "text":
        return <TextInput {...props} />;
        break;
    case "number":
        return <NumberInput {...props} />;
        break;
    case "checkbox":
        return <Checkbox {...props} />;
        break;
    case "checkboxlist":
        return <CheckBoxList {...props} />;
    break;
    case "select":
        return <Select {...props} />;
    break;
    case "radiolist":
        return <RadioList {...props} />;
    break;
    case "filelist":
        return <FileList {...props} />;
    break;
    case "fileinput":
        return <FileInput {...props} />;
    break;
    default:
        return <></>;
   }
}



export default InputHolder;
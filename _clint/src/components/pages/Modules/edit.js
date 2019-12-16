import React from 'react';
import {Header,Input,Button,Loader} from '../../../general/General';
import Select from "react-select";
const dataTypes = [
    {value:"VARCHAR",label:"string"},
    {value:"INT",label:"integer"},
    {value:"FLOAT",label:"float"},
    {value:"TEXT",label:"text"},
    {value:"JSON",label:"json"},
    {value:"FILE",label:"File"},
    {value:"TIMESTAMP",label:"DateTime"},
    {value:"BOOLEAN",label:"Boolean"}
];
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleName: "",
            displayName: "",
            fields:[],
            loading:false,
            id:null,
            editData:{
                name:"",
                type:"",
                length:""
            },
            addField:false
        };
        ["_onChange", "_onClick","_removeField","_createOrUpdateTable", "_getData", "_onAddChangeFields","_addField"].forEach(fn=>{this[fn]=this[fn].bind(this);});
    }

    componentDidMount(){
        const id =this.props.match.params.id;
        this.setState({id:id})
        this._getData(id);

    }
    _getData(id){
        const _this = this;
        $.ajax({
            type:"GET",
            url:"http://localhost:9080/edit-table/"+id,
            data:{},
            success:(returnData)=>{
                if(returnData.status=="success"){

                    let tempFelds = [];
                    const fields =JSON.parse(returnData.data.fields);

                    fields.forEach(d=>{
                        tempFelds.push({
                            name:d.name,
                            length:d.length,
                            type:dataTypes.find(t=>{return t.value==d.type})
                        });
                    });
                    _this.setState({
                        id:returnData.data.id,
                        moduleName:returnData.data.tableName,
                        displayName:returnData.data.displayName,
                        fields:tempFelds});
                 
                }else{
                    
                }
            }
        });
    }
    _addField(){
        const  {editData,moduleName,tableName}= this.state;
    }
    _onChange(e, k){
        this.setState({[k]:e.target.value});
    }

    _onChangeFields(v,i, k){
        const {fields} =this.state;
        let tempFields = fields;
        tempFields[i][k]=v;
        this.setState({fields:tempFields});
    }

    _onClick(){
      
        this.setState({addField:true});
    }
    _createOrUpdateTable(){
        const {moduleName,displayName,fields} =this.state;
        const _this = this;
        var tempFields = [];
        _this.setState({loading:true});

        fields.forEach(v=>{
            tempFields.push({
                name:v.name,
                type:v.type.value,
                length:v.length
            });
        });

        $.ajax({
            type:"POST",
            url:"http://localhost:9080/update-table",
            data:{
                tableName:moduleName,
                displayName:displayName,
                query:JSON.stringify(tempFields)
            },
            success:(returnData)=>{
                if(returnData.status=="success"){
                    _this.setState({loading:false});
                    notify("module has been created successfully.",2000);
                }else{
                    _this.setState({loading:false});
                    notify("failed to create module.",2000);
                }
            }
        });
    }
    _onAddChangeFields(e,k){

        var editData = this.state.editData;
        if(k=="type"){
        editData[k]=e;
        }else{
            editData[k]=e.target.value;
        }
        this.setState({editData:editData});
    }
    _removeField(fieldName,index){
        const {moduleName} =this.state;
        // let tempFields = fields;
        // tempFields.splice(index,1);
        // this.setState({fields:tempFields});
        var _this =this;
        $.ajax({
            type:"POST",
            url:"http://localhost:9080/remove-column",
            data:{
                tableName:moduleName, columnName:fieldName
            },
            success:(returnData)=>{
                if(returnData.status=="success"){
                    _this.setState({loading:false});
                    notify("field removed",2000);
                    _this._getData(_this.state.id);
                }else{
                    _this.setState({loading:false});
                    notify("failed to create module.",2000);
                }
            }
        });
    }

    render() {
        const  {moduleName,displayName,fields,loading,editData,addField} = this.state;

        if(loading){
            return <Loader/>;
        }
        return (<div>
            <Header HeaderTitle={"Modules"}/>
            
            <div className="col-md-4 offset-md-4">
                <Input value={moduleName} disabled={true} inputlabel="Module Name" onChange={(e)=>{this._onChange(e,"moduleName");}} className="form-control"/>
                <Input value={displayName} disabled={true} inputlabel="Display Name" onChange={(e)=>{this._onChange(e,"displayName");}} className="form-control"/>
            </div>
            <div className="col-md-8 offset-md-2 col-sm-12 offset-sm-0">
                <div>
                   {!addField?<Button className="btn btn-sm btn-primary float-right" onClick={this._onClick}><i className="fa fa-plus"></i></Button>:
                   <div>
                       <Button className="btn btn-md btn-primary float-right" onClick={()=>{this.setState({addField:false})}}><i className="fa fa-trash"></i></Button>
                       <Button className="btn btn-md btn-primary float-right" onClick={this._addField}>Add Field</Button>
                       
                       </div>}
               {addField?<div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <Input value={editData.name} className="form-control"   onChange={(e)=>{this._onAddChangeFields(e.target.value,"name")}}/>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <Select options={dataTypes} value={editData.type}  onChange={(v)=>{this._onAddChangeFields(v,"type")}} />
                        {/* <Input value={v.type} className="form-control" onChange={(v)=>{this._onChangeFields(e, i,"type")}}/> */}
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <Input value={editData.length} className="form-control"   onChange={(e)=>{this._onAddChangeFields(e.target.value,"length")}}/>
                    </div>
                </div>:null}
                </div>
                <p className="clearfix"></p>
                <div>
                {
                    fields.map((v,i)=>{
                        return <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-3">
                                <Input value={v.name} className="form-control" disabled={true}  onChange={(e)=>{this._onChangeFields(e.target.value, i,"name")}}/>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                                <Select options={dataTypes} value={v.type} isDisabled={true} onChange={(v)=>{this._onChangeFields(v, i,"type")}} />
                                {/* <Input value={v.type} className="form-control" onChange={(v)=>{this._onChangeFields(e, i,"type")}}/> */}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                                <Input value={v.length} className="form-control" disabled={true}  onChange={(e)=>{this._onChangeFields(e.target.value, i,"length")}}/>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                               <button className="btn btn-xs btn-danger" onClick={()=>{this._removeField(v.name,i)}}><i className="fa fa-trash" ></i></button>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
        </div>);
    }

}

export default Edit;
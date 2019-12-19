import React from 'react';
import {Header,Input,Button,Model} from '../../../general/General';
import Select from "react-select";
import {Link} from "react-router-dom";
import Datatable from "../../../general/Datatable";
import config from "../../../constents/settings";
import {Redirect} from "react-router-dom";
import DatePicker  from "react-datepicker";
const limit =10;

const apiList = [
  {title:"Delete by Id",apiUrl:"/apis/"+"${module}"+"/delete/"+"${id}",details:"method type is post "}
];

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName:"",
            columns:[],
            TotalPage:1,
            openCreateModel:false,
            fields:[],
            skip:0,
            edit:false,
            editId:null,
            apiListOpen:false
        };
        ["_onParamsChange", "_getData","_tableQuery", "_getTableData", "onDelete", "showApiList", "_openCreateDataModel", "onCancelEdit"].forEach(fn=>{this[fn]=this[fn].bind(this);});
  
      }
      _tableQuery(skip,count){
        let query = {};
        query.count=count;
        query.from=this.state.tableName;
        // query.fields =["displayName", "tableName", "id"]
        if(skip){
          query.skip=skip;
        }
        if(limit){
          query.limit=limit;
        }

        return JSON.stringify(query);
      }
      _getCount(){
        var _this=this;
        $.ajax({
          type:"POST",
          url:config.origin+"system/api-engine/index",
          data:{
            query:_this._tableQuery(0,true),
          },
          success:(returnData)=>{
            const totalData = returnData.data.count;
            let totalPage = parseInt(totalData/limit)+1;
            _this.setState({TotalPage:totalPage},()=>{
              _this._getTableData();
            });
        
          }
        });
      }
      _getTableData(){
        var _this=this;
        $.ajax({
          type:"POST",
          url:config.origin+"system/api-engine/index",
          data:{
            query:_this._tableQuery(_this.state.skip),
          },
          success:(returnData)=>{
            let datas = [];
            returnData.data.forEach(d=>{
              datas.push(Object.assign({},d,{
                action:[
                  {className:"btn btn-sm btn-primary",id:"_edit",label:"<i class='fa fa-edit'></i>",data:{id:d.id}},
                  {className:"btn btn-sm btn-primary",id:"_delete",label:"<i class='fa fa-trash'></i>",data:{id:d.id}}
                ]
              }));
            });

            _this.Datatable._processTableData(datas);
          }
        });
      }
      _getData(id){
        const _this = this;
        $.ajax({
            type:"GET",
            url:config.origin+"system/edit-table/"+id,
            data:{},
            success:(returnData)=>{
                if(returnData.status=="success"){
                    const fields =JSON.parse(returnData.data.fields);
                    let columns=[];
                    fields.forEach(field=>{
                        columns.push({ label: field.name, column: field.name, type: "data" })
                    });
                    
                    columns.push({ label: "Action", column: "action", type: "node" })
                    _this.setState({tableName:returnData.data.tableName,columns:columns,fields:fields},()=>{
                        _this._getCount();
                    })
                 
                }else{
                    
                }
            }
        });
    }
      onDelete(id){
        var _this=this;
        const tableId = this.props.match.params.id;
        $.ajax({
          type:"POST",
          url:config.origin+"apis/"+_this.state.tableName+"/delete/"+id,
          data:{
            id:id,
            tableName:_this.state.tableName
          },
          success:(returnData)=>{
            if(returnData.status=="success"){
              _this._getData(tableId);
            }
          }
        })
      }
      componentDidMount(){
          const id = this.props.match.params.id;
          this._getData(id);
          
      }

      _onParamsChange(value, type){
        const _this= this;
        switch(value){
          case "_delete":
            this.onDelete(type.id);
          break;
          case "_edit":
            _this._onEdit(type.id);
          break;
          case "page":
            let skip = type*limit;
            this.setState({skip:skip},()=>{
              _this._getTableData();
            });
          break; 
        }
      }

      _onEdit(id){
        const _this = this;
        this.setState({openCreateModel:false},()=>{
          _this.setState({edit:true,editId:id,openCreateModel:true});
        });
      }
      _openCreateDataModel(){
        this.setState({openCreateModel:!this.state.openCreateModel});
      }

      onCancelEdit(){
        const _this = this;
        this.setState({openCreateModel:false},()=>{
          _this.setState({edit:false,editId:null,openCreateModel:true});
        });
      }
      showApiList(){
        this.setState({apiListOpen:true});
        console.log("show api list")
      }
    render() {

   
        return (<div>
            <Header HeaderTitle={"View Datatable"}/>
          <div>
            <div>
              <button className="btn btn-md btn-default" onClick={this._openCreateDataModel}>Create Data</button>
            </div>
            {this.state.apiListOpen?
            <Model title={"Api list"} onCloseModel={()=>{this.setState({apiListOpen:false})}}>
              <div>
                {apiList.map(d=>{
                  return (<div>
                    <h4>{d.title}</h4>
                    {<p>{d.details}</p>}
                    <textarea className="form-control" disabled>{d.apiUrl}</textarea>
                  </div>);
                })}
              </div>
            </Model>:null}
            {this.state.openCreateModel&&(
              <CreateData fields={this.state.fields} tableName={this.state.tableName} edit={this.state.edit} editId={this.state.editId}  afterSubmit={()=>{
                this._getData(this.props.match.params.id);
              }} onCancelEdit={this.onCancelEdit}/>
            )}

            
            <div className="pull-right">
              <span label="show apis" onClick={this.showApiList}><i className="fa fa-puzzle-piece" style={{color: "coral",fontSize: "22px",textShadow: "1px 1px 1px black"}}></i></span>
            </div>
            <p className="clearfix"></p>
            <Datatable columns={this.state.columns} ref={el=>{this.Datatable =el;}} onParamsChange={this._onParamsChange}
                       TotalPage={this.state.TotalPage}/>
          </div>
        </div>);
    }

}


class CreateData extends React.Component{
  constructor(props){
    super(props);
    this.state={
      fields: [],
      tableName: "",
      data:{},
      edit:false||this.props.edit,
      id:null||this.props.editId,
    };
    this.onCreate = this.onCreate.bind(this);
    this.retInputs = this.retInputs.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount(){
    const id =this.props.editId;
    const isEdit =this.props.edit;
    const fields=this.props.fields;
    const tableName = this.props.tableName;
    const _this = this;
    
    this.setState({fields:fields,tableName:tableName},()=>{
      if(id!=null && isEdit ){
        $.ajax({
          type:"POST",
          url:config.origin+"apis/"+tableName+"/findById/"+id,
          data:{},
          success:(returnData)=>{
            if(returnData.status=="success"){
              let newData ={};
              const data = returnData.data[0];
              fields.forEach(d=>{ newData[d.name]=data[d.name]; });
              _this.setState({data:newData,id:data.id});
            }
          }
        })
      }
    });
  }

  retInputs(){
    var tempData = this.state.data;
    var newData = {};
    Object.keys(tempData).forEach(d=>{
      newData[d]="";
    });
    this.setState({data:newData})
  }
  onCreate(){
    // $.ajax({
    //   type:"POST",
    //   url:""
    // })
    var _this = this;
    $.ajax({
      type:"POST",
      url:config.origin+"apis/"+_this.state.tableName+"/insert",
      data:{
        data:JSON.stringify(_this.state.data)
      },
      success:(returnData)=>{
        if(returnData.status=="success"){
         _this.retInputs();
          _this.props.afterSubmit()
        }
      }
    });
  }

  onUpdate(){
    var _this = this;
    //apis/:module/update/:id
    $.ajax({
      type:"POST",
      url:config.origin+"apis/"+_this.state.tableName+"/update/"+_this.state.id,
      data:{
        data:JSON.stringify(_this.state.data)
      },
      success:(returnData)=>{
        if(returnData.status=="success"){  
        
        _this.setState({ edit:false, id:null},()=>{
          _this.retInputs();
          _this.props.afterSubmit();
          _this.props.onCancelEdit();
        });
        }
      }
    });
  }
  render(){
    const _this=this;
    return (<div className="col-md-4 offset-md-4">
        {this.state.fields.map(field=>{
          return (<div>
              <InputSL type={field.type} name={field.name} data={_this.state.data} onChange={(key,val)=>{
                var tempData = this.state.data;
                tempData[key]=val;
                this.setState({tempData});
              }}
              
              />
          </div>)
        })}
        <div>
          {!this.props.edit?<Button className="btn btn-md btn-primary" onClick={this.onCreate}>Create data</Button>:
          <Button className="btn btn-md btn-primary" onClick={this.onUpdate}>Update data</Button>}
         
          {this.props.edit&&(<Button className="btn btn-md btn-primary" onClick={()=>{
              this.props.onCancelEdit();
          }}>Cancel</Button>)}
        </div>
    </div>)
  }
}

const InputSL=(props)=>{
  switch(props.type){
    case "VARCHAR":
      return <div className="form-group">
        <Input inputlabel={props.name} className="form-control" value={props.data[props.name]} onChange={(e)=>{
          props.onChange(props.name,e.target.value)
        }}/>
      </div>
      break;
      case "VARCHAR":
      return <div className="form-group">
        <label>{props.name}</label>
        <textarea  className="form-control" onChange={(e)=>{
          props.onChange(props.name,e.target.value)
        }}>{props.data[props.name]}</textarea>
      </div>
      break;
      case "INT":
      case "FLOAT":
      return <div className="form-group">
        <Input inputlabel={props.name} className="form-control" type="number" value={props.data[props.name]} onChange={(e)=>{
          props.onChange(props.name,e.target.value)
        }}/>
      </div>
      break;
      case "FLOAT":
        return <div className="form-group">
          <label>{props.name}</label>
          <DatePicker value={props.data[props.name]} onChange={(value)=>{
            props.onChange(props.name,value)
          }}/>
        </div>
      break;
      case "FILE ":
        return <div className="form-group">
          <Input type="file" inputlabel={props.name} className="form-control" value={props.data[props.name]} onChange={(e)=>{
            props.onChange(props.name,e.target.files[0])
          }}/>
        </div>
      break;
      default:
        return <div className="form-group">
        <Input inputlabel={props.name} className="form-control" value={props.data[props.name]} onChange={(e)=>{
          props.onChange(props.name,e.target.value)
        }}/>
      </div>
  }
}

export default Show;
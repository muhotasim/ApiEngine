import React from 'react';
import {Header,Input,Button} from '../../../general/General';
import Select from "react-select";
import {Link} from "react-router-dom";
import Datatable from "../../../general/Datatable";
import config from "../../../constents/settings";
import {Redirect} from "react-router-dom";

const limit =10;
const  columns= [
    { label: "Display Name", column: "displayName", type: "data" },
    
    { label: "Actions", column: "action", type: "node" },
]
class Modules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TotalPage:1,
            skip:0,
            redirect:false,
            redirectId:null,
        };
        ["_onParamsChange", "_tableQuery", "_dataCount" ,"_getData", "_deleteModule", "_loadTableData"].forEach(fn=>{this[fn]=this[fn].bind(this);});
  
      }

      componentDidMount(){
        this._loadTableData();
      }

      _loadTableData(){
        this._dataCount();
      }

      _tableQuery(skip,count){
        let query = {};
        query.count=count;
        query.from="system_module_infromation";
        query.fields =["displayName", "tableName", "id"]
        if(skip){
          query.skip=skip;
        }
        if(limit){
          query.limit=limit;
        }

        return JSON.stringify(query);
      }
      _deleteModule(id){
        var _this=this;
        $.ajax({
          type:"POST",
          url:config.origin+"api-engine/delete",
          data:{
            id:id,
          },
          success:(returnData)=>{
            _this._loadTableData();
        
          }
        });
      }

      _dataCount(){
        var _this=this;
        $.ajax({
          type:"POST",
          url:config.origin+"api-engine/index",
          data:{
            query:_this._tableQuery(0,true),
          },
          success:(returnData)=>{
            const totalData = returnData.data.count;
            let totalPage = parseInt(totalData/limit)+1;
            _this.setState({TotalPage:totalPage},()=>{
              _this._getData();
            });
        
          }
        });
      }

      _getData(){
        var _this=this;
        $.ajax({
          type:"POST",
          url:config.origin+"api-engine/index",
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

      _onParamsChange(value, type){
        switch(value){
          case "_delete":
            this._deleteModule(type.id);
          break;
            case "_edit":
            this.setState({redirect:true, redirectId:type.id});
          break;
        }
      }

    render() {

      if(this.state.redirect){
        return <Redirect to={"/Module/Edit/"+this.state.redirectId}/>
      }
        return (<div>
            <Header HeaderTitle={"Modules"}/>
            <div>
                <Link className="btn btn-md btn-primary float-right" to="/Module/Create">Create</Link>
                <p className="clearfix"></p>
            </div>
          <div>
            <Datatable columns={columns} ref={el=>{this.Datatable =el;}} onParamsChange={this._onParamsChange}
                       TotalPage={this.state.TotalPage}/>
          </div>
        </div>);
    }

}

export default Modules;
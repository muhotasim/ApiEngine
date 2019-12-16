import React from 'react';
import {Header,Input,Button} from '../../../general/General';
import Select from "react-select";
import {Link} from "react-router-dom";
import Datatable from "../../../general/Datatable";
import config from "../../../constents/settings";
import {Redirect} from "react-router-dom";

const limit =10;

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName:"",
            columns:[],
            TotalPage:1
        };
        ["_onParamsChange", "_getData","_tableQuery", "_getTableData", "onDelete"].forEach(fn=>{this[fn]=this[fn].bind(this);});
  
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
                    _this.setState({tableName:returnData.data.tableName,columns:columns},()=>{
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
        url:config.origin+"apis/test/deleteById",
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
        switch(value){
          case "_delete":
            this.onDelete(type.id);
          break;
          case "_edit":
            // this.setState({redirect:true, redirectId:type.id});
          break;
        }
      }

    render() {

   
        return (<div>
            <Header HeaderTitle={"View Datatable"}/>
          <div>
            <Datatable columns={this.state.columns} ref={el=>{this.Datatable =el;}} onParamsChange={this._onParamsChange}
                       TotalPage={this.state.TotalPage}/>
          </div>
        </div>);
    }

}

export default Show;
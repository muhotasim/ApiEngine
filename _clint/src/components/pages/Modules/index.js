import React from 'react';
import {Header,Input,Button} from '../../../general/General';
import Select from "react-select";
import {Link} from "react-router-dom";
import Datatable from "../../../general/Datatable";

const  columns= [
    { label: "Display Name", column: "displayName", type: "data" },
    
    { label: "Actions", column: "action", type: "node" },
]
class Modules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TotalPage:1
        };
        ["_onParamsChange", "_tableQuery", "_dataCount" ].forEach(fn=>{this[fn]=this[fn].bind(this);});
  
      }

      _tableQuery(skip, limit){

      }

      _dataCount(){

      }


      _onParamsChange(value, type){
        console.log( value,type)
      }

    render() {
        return (<div>
            <Header HeaderTitle={"Modules"}/>
            <div>
                <Link className="btn btn-md btn-primary float-right" to="/Module/Create">Create</Link>
                <p className="clearfix"></p>
            </div>
          <div>
            <Datatable columns={columns} onParamsChange={this._onParamsChange}
                       TotalPage={this.state.TotalPage}/>
          </div>
        </div>);
    }

}

export default Modules;
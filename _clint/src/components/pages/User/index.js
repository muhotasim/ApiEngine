import React from 'react';
import {Header,Input,Button} from '../../../general/General';
import { Link } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
        [].forEach(fn=>{this[fn]=this[fn].bind(this);});
  
      }

      componentDidMount(){
        
      }

    render() {
        return (<div>
            <Header HeaderTitle={"Users"}/>
            <div>
                <Link className="btn btn-md btn-default float-right" to="/Users/Create">Create</Link>
                <p className="clearfix"></p>
            </div>
          <div>
            
          </div>
        </div>);
    }

}

export default User;
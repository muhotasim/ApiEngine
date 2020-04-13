import React from 'react';
import {Header,Input,Button} from '../../../general/General';

class Create extends React.Component {
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
            <Header HeaderTitle={"Create Users"}/>
          <div>
               <div className="col-md-4 offset-md-4">
                    <Input className="form-control" inputlabel="user name" type="text" />
                    <Input className="form-control" inputlabel="user email" type="email" />
                    <Input className="form-control" inputlabel="user password" type="password" />
                    <Input className="form-control" inputlabel="confirm password" type="password" />
                    <Button className="btn btn-md btn-default">Create User</Button>
               </div>
          </div>
        </div>);
    }

}

export default Create;
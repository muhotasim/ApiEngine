import React from 'react';

import ServerApi from '../utils/ServerApi';
import Imput from "../general/Input";
class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
           test:null
        };
        
    }

    
   
    componentDidMount(){
        
        
    }

    render(){
        return (<div>
            <Imput type="fileinput" preview={true} value={this.state.test} onChange={(v)=>{this.setState({test:v});console.log(v);}} children="Test"/>
            </div>);
    }
};

export default App;

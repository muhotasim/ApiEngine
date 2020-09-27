import React,{Suspense,lazy} from "react";
import { connect } from "react-redux";
import { loginAsync } from "../../actions/login.action";
import Input from "../../general/Input";
import commonFunc from "../../utils/common.func";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
       commonFunc.call(this);   
    }


    render(){
    const {username,password} = this.state;
    const { login } = this.props;
     return(<>
        <div className="row" style={{marginTop:"15%"}}>
            <div className="col-lg-3 lg-4 offset-md-4">
              <div className="form-group">
                <label>Email</label>
                <Input type="text" value={username} onChange={(v)=>{this.onChange(v,"username")}} />
              </div>
               <div className="form-group">
               <label>Password</label>
                <Input type="text" value={password} onChange={(v)=>{this.onChange(v,"password")}} />
               </div>
               <button className="btn btn-primary btn-md" onClick={()=>{login(username,password)}}>Login</button>
            </div>
        </div>
     </>);
    }
}

const mapStateToProps = (state) => {
    return { 
        appStore: state.appStore
     }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login:(username,password)=>{ dispatch(loginAsync(username,password)); }
     }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Login);

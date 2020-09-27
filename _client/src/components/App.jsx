import React,{Suspense,lazy} from 'react';
import Login from "./Login";
import { connect } from "react-redux";
import { Route, BrowserRouter, Switch } from "react-router-dom";
const Dashboard = lazy(()=>import("./Dashboard"));
const Tokens = lazy(()=>import("./Tokens"));
const Users = lazy(()=>import("./Users"));
const Modules = lazy(()=>import("./Modules"));

const Navigation = lazy(()=>import("../general/UI/Navigation"));
import menus from "../utils/menus";

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const { appStore } = this.props;
        if(appStore.login) return <Login/>;
        
        return (<>
            <div>
            <Suspense fallback={<span>Loading...</span>}>
                <BrowserRouter >
                    <Switch>
                        <Navigation menus={menus}/>
                        <Route exact component={Dashboard} path="/"/>
                        <Route exact component={Dashboard} path="/Dashboard"/>
                        <Route exact component={Tokens} path="/Tokens"/>
                        <Route exact component={Users} path="/Users"/>
                        <Route exact component={Modules} path="/Modules"/>
                    </Switch>
                </BrowserRouter>
            </Suspense>
            </div>
        </>);
    }
};

const mapStateToProps = (state) => {
    return { 
        appStore: state.appStore
     }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        
     }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(App);

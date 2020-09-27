function commonFunc(){

    this.onChange =(v,k) =>{
        this.setState({[k]:v});
    }
    
    
};


export default commonFunc;
class ServerApi {
    constructor( authUrl, serverUrl=null, token = null){
        this.authUrl=authUrl;
        this.serverUrl=serverUrl;
        this.token = token;
    }
    
    login = (username,password,callback) => {
        this.ajax({url:this.authUrl+"/login",type:"POST",data:{email:username,password},success:callback});
    }
    
    insert = (module,data,callback) => {
        this.ajax({url:this.authUrl,type:"POST",data:data,success:callback});
    }

    insertBulk = (module,data,callback) => {

    }
    
    update = (id,module,data,callback) => {
        this.ajax({url:this.authUrl,type:"POST",data:data,success:callback});
    }

    updateWithCondition = () =>{

    }
    
    delete = () => {}
    
    deleteWithCondition = () => {

    }

    count = () => {}

    get = () => {}
    
    ajax = ( { type, url, success, failed, data,contentType=true, headers} ) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            let parsedData;
            try{
                parsedData = JSON.parse(this.responseText);
            }catch(e){
                parsedData = this.responseText;
            }
            if(success){
              return  success(parsedData);
            }else{
                return parsedData;
            }
            
        }else{
            if(failed){
             return failed(this);
            }
        }
        };
        if(headers){
            Object.keys(headers).forEach(header=>{
                xhttp.setRequestHeader(header,headers[header])
            });
        }
        xhttp.open(type, url, true);
        if(contentType==false){
            xhttp.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData();
            Object.keys(data).forEach(k=>{
                formData.append(k,data[k]);
            });
            xhttp.send(formData);
        }else{
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let params = new URLSearchParams();
            Object.keys(data).forEach(k=>{
                params.append(k,data[k]);
            });
            xhttp.send(params.toString());
        }
        if(failed){
            xhttp.onerror(e=>{
                failed(e);
            });
            // xhttp.ontimeout(e=>{
            //     failed(e);
            // });
        }
        
    }

}

export default ServerApi;
const mysql = require('mysql2');
var config = require("../config");
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password:config.password,
    database: config.database,
  });
const prefix = "";
async function find(query){
    let q ="SELECT ";
    if(query.count){ q+="COUNT("; }
    if(query.fields && !query.count){ q+=""+query.fields.join(",")+""; }else{ q+="*"; }
    if(query.count){ q+=") "}
    q+=" FROM "+query.from+" ";
    if(query.where){ q+=query.where; }
    let skip = query.skip;
    let limit = query.limit;
    if(limit){ q+=" LIMIT "+limit; }
    if(skip){ q+=" OFFSET "+skip; }
    q+=";";
    console.log(q);
    return new Promise((resolve, reject)=>{
        connection.query(q,(err,result)=>{
            if(err){return resolve(false);}
            let res =result;
           
            if(query.count){  
                return resolve({count:Object.values(res[0])[0]});
            }

            return resolve(res);
        });
    });
}
async function findById(tableName,id){
    let q ="SELECT * FROM "+tableName+" WHERE id="+id;
    return new Promise((resolve, reject)=>{
        connection.query(q,(err,result)=>{
            if(err){return resolve(false);}
            let res =(result.length)?result[0]:result;
            return resolve(res);
        });
    });
}
async function insert(tableName, data){
    let query = "INSERT INTO "+tableName+" (";
    const keys = Object.keys(data);
    query+=keys.join(",")+")";
    query+=" VALUES('"+Object.values(data).join("','")+"')";
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(result);
        });
    });
}
async function deleteById(id, tableName){
    let query = "DELETE FROM "+tableName+" WHERE id="+id;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(result);
        });
    });
}
async function deleteAll(q){
    let query = "DELETE FROM "+q.tableName+" "+q.where;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(result);
        });
    });
}
async function findAndUpdateById(id, tableName, data){
    let query ="UPDATE "+tableName+" SET ";
    const keys =Object.keys(data);
    keys.forEach((d, i)=>{
        query+= " "+ d+"='"+data[d]+"'";
        if(keys.length!=i+1){
            query+=" , ";
        }
    });
    
    query+=" WHERE id= "+id;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            
            if(err){return resolve(false);}
            return resolve(result);
        });
    });
}
async function findAndUpdate( q ){
    let query ="UPDATE "+q.tableName+" SET ";
    const keys =Object.keys(q.data);
    keys.forEach((d, i)=>{
        query+= " "+ d+"="+q.data[d];
        if(keys.length!=i+1){
            query+=" , ";
        }
    });
    query+=" "+q.where;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(result);
        });
    });
}
async function createTable(tableName, displayName, tabeInformation=[]){
 
    var tbInfo = tabeInformation;
    var tb = "id int NOT NULL AUTO_INCREMENT,"+
    "Created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,";
    "Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,";

    tbInfo.forEach((d,i)=>{
        let type =(d.type=="FILE")?"VARCHAR":d.type;
        tb+=d.name+" "+type+"("+d.length+"),";
        // if((i+1)!=tbInfo.length){
        //     tb+=",";
        // }else{
        //     tb+=",PRIMARY KEY (id)";
        // }
    });
    tb+="PRIMARY KEY (id)";


    var query="CREATE TABLE "+tableName+" ("+tb+")";
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT(*) FROM system_module_infromation WHERE system_module_infromation.tableName='"+tableName+"';",(err,result)=>{
        if(result[0]["COUNT(*)"]==0){
        connection.query("INSERT INTO system_module_infromation (`id`, `tableName`, `displayName`, `fields`) VALUES (NULL, '"+tableName+"', '"+displayName+"', '"+JSON.stringify(tabeInformation)+"');",(err,result)=>{
        connection.query(query,(err,result)=>{
               if(err){return resolve(false);}
                return resolve(true);
            });
        });
    }else{
        return resolve(false);
    }
    });
    });
}
async function deleteTable(tableName){
    var query="DROP TABLE "+tableName;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(true);
        })
    });
}
async function addColumnToTable(tableName,info){
   const columnInfo = info; 
   let type =(columnInfo.type=="FILE")?"VARCHAR":columnInfo.type;
   const query = "ALTER TABLE "+tableName+" ADD "+columnInfo.name+" "+columnInfo.type+"("+columnInfo.length+")";
   console.log(query);
   return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(true);
        });
    });
}
async function deleteColumnToTable(tableName,columnName){
    const query = "ALTER TABLE "+tableName+" DROP COLUMN "+columnName+"";
    console.log(query);
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(true);
        });
    });  
}


module.exports = {
    findById, insert,createTable,deleteTable,addColumnToTable,deleteColumnToTable,find,deleteById,deleteAll,findAndUpdateById,findAndUpdate
};

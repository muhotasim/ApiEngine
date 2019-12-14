const mysql = require('mysql2');
var config = require("../config");

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password:config.password,
    database: config.database,
  });
const prefix = "";


async function createTable(tableName, displayName, tabeInformation=[]){
 
    var tbInfo = tabeInformation;
    var tb = "Id int NOT NULL AUTO_INCREMENT,"+
    "Created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"+
    "Updated_at  TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,";
    tbInfo.forEach((d,i)=>{
        tb+=d.name+" "+d.type+"("+d.length+")";
        if((i+1)!=tbInfo.length){
            tb+=",";
        }else{
            tb+=",PRIMARY KEY (Id)";
        }
    })


    var query="CREATE TABLE "+tableName+" ("+tb+")";
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false)}
            return resolve(true);
        })
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
   const query = "ALTER TABLE "+tableName+" ADD "+columnInfo.name+" "+columnInfo.type+"("+columnInfo.length+")";
   return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(true);
        });
    });
}

async function deleteColumnToTable(tableName,columnName){
    const query = "ALTER TABLE "+tableName+" DROP COLUMN "+columnName;
    return new Promise((resolve, reject)=>{
        connection.query(query,(err,result)=>{
            if(err){return resolve(false);}
            return resolve(true);
        });
    });  
}


module.exports = {
    createTable,deleteTable,addColumnToTable,deleteColumnToTable
};

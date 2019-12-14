
var queryHolder = require("./databaseSDK");

// {
//   status: "success",
//   data:[],
//   error:""
// }



/*
[
  {
      name:"name",
      type:"VARCHAR",
      length:255
  }
]
*/
module.exports = (app)=>{

    app.post("/create-table",async (req,res)=>{
       const {tableName, displayName, query} = req.body;
       const d= await queryHolder.createTable(tableName, displayName, JSON.parse(query));
       if(d){
        res.send({ status: "success", data:[], error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });

    app.post("/delete-table",async (req,res)=>{
       const { tableName } = req.body;
       const d= await queryHolder.deleteTable(tableName);
       if(d){
        res.send({ status: "success", data:[], error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });

    app.post("/add-column",async (req, res)=>{
      const { tableName ,info} = req.body;
      const d= await queryHolder.addColumnToTable(tableName, JSON.parse(info));
      if(d){
       res.send({ status: "success", data:[], error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
    });

    app.post("/remove-column",async (req, res)=>{
      const { tableName ,columnName} = req.body;
      const d= await queryHolder.deleteColumnToTable(tableName, columnName);
      if(d){
       res.send({ status: "success", data:[], error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
    });


}

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

  
  app.post("/api-engine/index", async (req,res)=>{
    console.log(JSON.parse(req.body.query))
    const d= await queryHolder.find(JSON.parse(req.body.query));
    if(d){
      res.send({ status: "success", data:d, error:"" });
    }else{
      res.send({ status: "failed",data:[],error:"error" });
    }
  });

  app.post("/api-engine/delete", async (req,res)=>{
    const rawData =await queryHolder.findById("system_module_infromation",req.body.id);
    const d= await queryHolder.deleteTable(rawData.tableName);
    await queryHolder.deleteById(rawData.id, "system_module_infromation");
    if(d){
      res.send({ status: "success", data:rawData, error:"" });
    }else{
      res.send({ status: "failed",data:[],error:"error" });
    }
  });

    app.post("/create-table",async (req,res)=>{
       const {tableName, displayName, query} = req.body;
       const d= await queryHolder.createTable(tableName, displayName, JSON.parse(query));
       if(d){
        res.send({ status: "success", data:[], error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });

    app.get("/edit-table/:id",async (req,res)=>{
      const id = req.params.id;
      const d= await queryHolder.findById("system_module_infromation", id);
      
      if(d){
       res.send({ status: "success", data:d, error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
   });

    // app.post("/delete-table",async (req,res)=>{
    //    const { tableName } = req.body;
       
    //    const d= await queryHolder.deleteTable(tableName);
    //    if(d){
    //     res.send({ status: "success", data:[], error:"" });
    //   }else{
    //     res.send({ status: "failed",data:[],error:"error" });
    //   }
    // });

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
      
      var rawData= await queryHolder.find({from:"system_module_infromation",where:" WHERE tableName='"+tableName+"'"});
      
      let fields = [];
      JSON.parse(rawData[0].fields).forEach(item => {
          if(item.name!=columnName){
            fields.push(item);
          }
      });
      await queryHolder.findAndUpdateById(rawData[0].id,"system_module_infromation",{
        fields:JSON.stringify(fields)
      });
      var tbName=tableName.toLowerCase();
      console.log(tbName,columnName);
      const d= await queryHolder.deleteColumnToTable(tbName, columnName);
      if(d){
       res.send({ status: "success", data:[], error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
    });


}
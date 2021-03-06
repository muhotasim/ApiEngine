
var queryHolder = require("./index");
var config = require("../config");
var jwt = require('jsonwebtoken'); 
var accessTokenKey = config.accessTokenSecredKey;
module.exports = (app)=>{
    app.use("/system/*",async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    if(!token ) return res.sendStatus(401);
    const query = {};
    query.from="tokens";
    query.where=" WHERE token='"+token+"'";
    query.count = true;
    const tokenExists =await queryHolder.find(query);
    if(tokenExists.count){
      jwt.verify(token,accessTokenKey,(err,decoded)=>{
        if(err) return res.sendStatus(401);
        return next();
      });
    }else{
      return res.sendStatus(401);
    }
    });
    app.post("/system/api-engine/delete", async (req,res)=>{
      const rawData =await queryHolder.findById("system_module_infromation",req.body.id);
      const d= await queryHolder.deleteTable(rawData.tableName);
      await queryHolder.deleteById(rawData.id, "system_module_infromation");
      if(d){
        res.send({ status: "success", data:rawData, error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });
    app.post("/system/create-table",async (req,res)=>{
       const {tableName, displayName, query} = req.body;
       const d= await queryHolder.createTable(tableName, displayName, JSON.parse(query));
       if(d){
        res.send({ status: "success", data:[], error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });
    app.get("/system/edit-table/:id",async (req,res)=>{
      const id = req.params.id;
      const d= await queryHolder.findById("system_module_infromation", id);
      
      if(d){
       res.send({ status: "success", data:d, error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
   });
    app.post("/system/add-column",async (req, res)=>{
      const { tableName ,info} = req.body;
      var rawData= await queryHolder.find({from:"system_module_infromation",where:" WHERE tableName='"+tableName+"'"});    
      let fields = [];
      JSON.parse(rawData[0].fields).forEach(item => {
            fields.push(item);
      });
      fields.push(JSON.parse(info));
      await queryHolder.findAndUpdateById(rawData[0].id,"system_module_infromation",{
        fields:JSON.stringify(fields)
      });
      
      const d= await queryHolder.addColumnToTable(tableName, JSON.parse(info));
      if(d){
       res.send({ status: "success", data:[], error:"" });
     }else{
       res.send({ status: "failed",data:[],error:"error" });
     }
    });
    app.post("/system/remove-column",async (req, res)=>{
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
    app.post("/system/api-engine/index", async (req,res)=>{
      const d= await queryHolder.find(JSON.parse(req.body.query));
      if(d){
        res.send({ status: "success", data:d, error:"" });
      }else{
        res.send({ status: "failed",data:[],error:"error" });
      }
    });
}
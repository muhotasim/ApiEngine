var queryHolder = require("./index");
var config = require("../config");
var jwt = require('jsonwebtoken'); 
var accessTokenKey = config.accessTokenSecredKey;
module.exports = (app) => { 
    app.use("/api/v1/:module",async (req,res,next)=>{
      req.moduleName = req.params.module;
      next();
    });  
    app.use("/api/v1/*",async (req,res,next)=>{
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
    app.post("/api/v1/:module/index", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.find(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/findById/:id", async (req,res)=>{
        const query ={};
        query.from=req.moduleName;
        query.where = " WHERE id="+req.params.id;
        const d= await queryHolder.find(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/insert", async (req,res)=>{
        
        const d= await queryHolder.insert(req.moduleName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/delete/:id", async (req,res)=>{
        const d= await queryHolder.deleteById(req.params.id,req.moduleName);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/delete", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.deleteAll(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/update", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.findAndUpdate(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
    app.post("/api/v1/:module/update/:id", async (req,res)=>{
        const d= await queryHolder.findAndUpdateById(req.params.id, req.moduleName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
}
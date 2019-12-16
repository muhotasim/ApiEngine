var queryHolder = require("./index");
module.exports = (app)=>{

    // app.use("/apis/:module",async (req,res,next)=>{
      
    //   next();
    // });
    app.post("/apis/:module/index", async (req,res)=>{
      
        
        const d= await queryHolder.find(JSON.parse(req.body.query));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/insert", async (req,res)=>{
        const d= await queryHolder.insert(req.body.tableName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/deleteById", async (req,res)=>{
        const d= await queryHolder.deleteById(req.body.id,req.body.tableName);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/deleteAll", async (req,res)=>{
        const d= await queryHolder.deleteAll(JSON.parse(req.body.query));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/updateData", async (req,res)=>{
        const d= await queryHolder.findAndUpdate(req.body.query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/findByIdAndUpdateData", async (req,res)=>{
        const d= await queryHolder.findAndUpdateById(req.body.id,req.body.tableName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
}
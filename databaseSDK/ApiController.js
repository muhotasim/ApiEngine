var queryHolder = require("./index");
module.exports = (app)=>{

    app.use("/apis/:module",async (req,res,next)=>{
      req.moduleName = req.params.module; 
      const {key, appKey} = req.body; 
      // const rawData =await queryHolder.find({from:"system_module_infromation",where:" WHERE tableName="+req.moduleName});
      // console.log(rawData);
      next();
    });
    app.post("/apis/:module/index", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.find(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/insert", async (req,res)=>{
        const d= await queryHolder.insert(req.moduleName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/delete/:id", async (req,res)=>{
        const d= await queryHolder.deleteById(req.params.id,req.moduleName);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/delete", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.deleteAll(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/update", async (req,res)=>{
        const query =JSON.parse(req.body.query);
        query.from=req.moduleName;
        const d= await queryHolder.findAndUpdate(query);
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
      app.post("/apis/:module/update/:id", async (req,res)=>{
        const d= await queryHolder.findAndUpdateById(req.params.id, req.moduleName,JSON.parse(req.body.data));
        if(d){
          res.send({ status: "success", data:d, error:"" });
        }else{
          res.send({ status: "failed",data:[],error:"error" });
        }
      });
}
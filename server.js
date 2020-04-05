const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 9080;
var passwordHash = require('password-hash');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

require("./databaseSDK/ApiEngine")(app);
require("./databaseSDK/ApiController")(app);

app.post("/test",async (req,res)=>{
  console.log(await passwordHash.generate("amd123123"));
  res.send("test");
})

app.get("/",(req, res)=>{
  console.log( passwordHash.generate("amd123123"));
    res.send("");
});
app.listen(PORT);
const express = require("express");
const app = express();
const PORT = 9080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

require("./databaseSDK/ApiEngine")(app);
require("./databaseSDK/ApiController")(app);


app.get("/",(req, res)=>{
    res.send("");
});
app.listen(PORT);
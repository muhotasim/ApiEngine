const express = require("express");
const app = express();
const PORT = 9080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

require("./ApiEngine")(app);


app.get("/",(req, res)=>{
    res.send("");
});
app.listen(PORT);
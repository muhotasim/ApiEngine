const express = require("express");
const app = express();
const PORT = 9090;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

require("./controllers/AuthController")(app);
app.listen(PORT);
const express = require("express");
const app = express();
const PORT = 9080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./ApiEngine")(app);


app.get("/",(req, res)=>{
    res.send("");
});
app.listen(PORT);
const mysql = require('mysql2');
var config = require("../config");
var queryHolder = require("../databaseSDK");
var jwt = require('jsonwebtoken'); 
const passwordHash = require('password-hash');
var accessTokenKey = config.accessTokenSecredKey;
var refreshTokenKey = config.refressTokenSecredKey;
module.exports = (app)=>{
    app.post('/login',async (req, res)=>{
        const query={};
        query.from="users";
        query.where=" WHERE email='"+req.body.email+"'";
        const d = await queryHolder.find(query);
        if(d.length){
          const user = d[0];
          const isVarified = passwordHash.verify(req.body.password,user.password);
          if(isVarified){
            delete user.password;
            const expiry = Math.floor(Date.now() / 1000) + (60 * 60);
            let token = jwt.sign({ exp: expiry, data: user }, accessTokenKey);
            let rftoken = jwt.sign({ data: user }, refreshTokenKey);
           await queryHolder.insert("tokens",{
              token:token,
              user_id: user.id
            });
            return res.send({
              "token_type": "Bearer",
              "access_token": token,
              "expires_in": expiry,
              "refresh_token": rftoken
            });
          }
        }
        
        return res.send({ status: "failed",data:[],error: "error" });
        
       
    });


    app.use("/refresh_token",async (req,res,next)=>{

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
    app.post('/refresh_token', (req, res)=>{
        jwt.verify(req.body.refresh_token,refreshTokenKey,async (err,decodeedData)=>{
          if(err) return res.send({ status: "failed", data: [] });
          const expiry = Math.floor(Date.now() / 1000) + (60 * 60);
          let token = jwt.sign({ exp: expiry, data: decodeedData.data }, accessTokenKey);
          let rfToken = jwt.sign({ data: decodeedData.data }, refreshTokenKey);

          await queryHolder.insert("tokens",{
            token:token,
            user_id: decodeedData.id
          });
          res.send({
              "token_type": "Bearer",
              "access_token": token,
              "expires_in": expiry,
              "refresh_token": rfToken
          });
        });
    });

}
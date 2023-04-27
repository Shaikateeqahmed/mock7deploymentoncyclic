const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();


const authenticate = (req,res,next)=>{
      let token = req.headers.authorization;
      let bl = JSON.parse(fs.readFileSync("./blacklist.js","utf-8"))||[];
      if(bl.includes(token)){
        res.json("Please Login Again!");
      }else{
        if(token){
          jwt.verify(token,process.env.key,(err,decode)=>{
           if(err){
               res.json("Invalid Token");
           }else{
               let UserID = decode.UserID;
               req.body.UserID = UserID;
               let PasswordLogin = decode.Password;
               req.body.PasswordLogin = PasswordLogin;
               next();
           }
          })
     }else{
       res.json("Please Login Again!");
     }
      }
      
}

module.exports={authenticate};
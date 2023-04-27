const express = require("express");
const user = express.Router();
const {UserModel} = require("../modules/usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

user.get('/',async(req,res)=>{
    res.send("user page");
})


user.post('/register',async(req,res)=>{
    let {email,password} = req.body;
    let user = await UserModel.find({email});
    if(user.length>0){
        res.json("User With This Email ID Already Exist!");
    }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                let newuser = new UserModel({email,password:hash});
                await newuser.save();
                res.json(`User with this Email ID ${email} Register successfully!`);
            }
        })
    }

})

user.post('/login',async(req,res)=>{
    let {email,password} = req.body;
    let user = await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.json("Invalid Crediantials");
            }else{
                let token = jwt.sign({UserID:user[0]._id,Password:password},process.env.key);
                res.json(token);
            }
        })
    }else{
        res.json("PLease Signup First!")
    }

})

user.get("/logout",async(req,res)=>{
    let bl = JSON.parse(fs.readFileSync("./blacklist.js","utf-8"))||[];
    let token = req.headers.authorization
    if(bl.includes(token)){
        res.json("Already Logout!");
    }else{
        bl.push(token);
        fs.writeFileSync("./blacklist.js",JSON.stringify(bl));
        res.json("Succesfully Logout!");
    }
    
})

module.exports={user};
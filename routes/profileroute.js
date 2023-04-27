const express = require("express");
const profile = express.Router();
const {ProfileModel} = require("../modules/profilemodel.js");
const bcrypt = require("bcrypt");

profile.get("/",async(req,res)=>{
    let ID = req.body.UserID;
    try {
        let profile = await ProfileModel.find({UserID:ID});
        res.json({profile,password:req.body.PasswordLogin});   
    } catch (error) {
        console.log(error);
    }
   
})

profile.post("/addprofile",async(req,res)=>{
   let {ProfilePic,Name,Bio,Phone,Email,Password} = req.body;
   console.log(req.body);
   try {
    bcrypt.hash(Password,5,async(err,hash)=>{
        if(err){
            console.log(err);
        }else{
            let addprofile = new ProfileModel({ProfilePic,Name,Bio,Phone,Email,Password:hash,UserID:req.body.UserID});
            await addprofile.save();
            res.json("Profile Successfully Added!");
        }
    })
   } catch (error) {
    console.log(error);
   }

})

profile.patch("/editprofile/:id",async(req,res)=>{
    let {ProfilePic,Name,Bio,Phone,Email,Password} = req.body;
    console.log(req.body);
    try {
     bcrypt.hash(Password,5,async(err,hash)=>{
         if(err){
             console.log(err);
         }else{
           let ID = req.params.id;
           let profile = await ProfileModel.find({_id:ID});
           let profile_id = profile[0].UserID;
           let req_id = req.body.UserID;
           console.log(profile_id,req_id);
           if(profile_id===req_id){
            await ProfileModel.findByIdAndUpdate({_id:ID},{ProfilePic,Name,Bio,Phone,Email,Password:hash,UserID:req.body.UserID});
            res.json(`Profile of a Email ID ${profile[0].Email} Edit Successfully!`);
           }else{
            res.json("You are Not Authorized!");
           }
         }
     })
    } catch (error) {
     console.log(error);
    }
 
 })

module.exports={profile};
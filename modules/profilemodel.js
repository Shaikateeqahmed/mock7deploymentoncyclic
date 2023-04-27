const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    ProfilePic : String,
    Name : String,
    Bio : String,
    Phone : String,
    Email : String,
    Password : String,
    UserID : String
})

const ProfileModel = mongoose.model("profile",profileSchema);

module.exports={ProfileModel};
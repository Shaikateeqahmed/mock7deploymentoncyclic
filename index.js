const express = require("express");
const cors = require('cors');
const { connection } = require("./config/connection.js");
const {user} = require("./routes/userroute.js");
const {authenticate} = require("./middlewares/authentication.js");
const {profile} = require("./routes/profileroute.js");
require("dotenv").config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/user',user);
app.use(authenticate);
app.use("/profile",profile);




app.listen(process.env.port,async()=>{
    await connection;
    console.log(`server is running on port 3000`);
})
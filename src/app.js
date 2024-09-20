const express = require("express");
const { connectDB } = require("./config/database");
const app = express()
const User = require("./Models/user");

app.use(express.json())
app.post("/signup",async (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    await user.save()
    res.send("user added")
})


connectDB().then(()=>{
    console.log("DB connected successfully")
    app.listen(3000,()=>{
        console.log("Server listening on port 3000")
    })
})
.catch(()=>console.log("DB connection unsuccessful"))


console.log("hi")
const express = require("express");
const { connectDB } = require("./config/database");
const app = express()
const User = require("./Models/user");

app.use(express.json())

app.get("/user",async (req,res)=>{
    try{
        const user = new User(req.body)
        const userObj = await User.find({lastName:user.lastName})
        res.send(userObj)
    }
    catch{
        console.error("Something went wrong")
    }
})

app.post("/user",async (req,res)=>{
    const newUser = req.body
    try{
        const user = new User(newUser)
        await user.save()
        res.send("User added to db");
    }
    
    catch(err){
        res.status(400).send("unable to save the user. "+err.message)
    }
    
})

app.delete("/user",async (req,res)=>{
    const userId = req.body._id
    console.log(userId)
    try{
        const user =await User.findByIdAndDelete(userId)
        console.log(user)
        res.send("user deleted")
    }
    catch{
        res.send("Something wrong")
    }
    
})

app.patch("/user",async (req,res)=>{
    const UserId = req.body._id
    console.log(req.body)
    try{
        const user = await User.findByIdAndUpdate(UserId,req.body,{
            returnDocument:"after",
            runValidators: "True"
        })
        res.send("user updated")
    }
    catch(err){
        res.status(404).send("Wrong "+err.message)
    }
})


connectDB().then(()=>{
    console.log("DB connected successfully")
    app.listen(3000,()=>{
        console.log("Server listening on port 3000")
    })
})
.catch(()=>console.log("DB connection unsuccessful"))


console.log("hi")
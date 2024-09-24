const express = require("express");
const { connectDB } = require("./config/database");
const app = express()
const User = require("./Models/user");
const validate = require("validator")
const bcrypt = require("bcrypt")

app.use(express.json())

connectDB().then(()=>{
    console.log("DB connected successfully")
    app.listen(3000,()=>{
        console.log("Server listening on port 3000")
    })
})
.catch(()=>console.log("DB connection unsuccessful"))

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

app.post("/signup",async (req,res)=>{
    try{
        const {firstName,age,phNumber,email,skills,password} = req.body
        
        
        if(skills.length>5){
            throw new Error("Too many skills. Please keep below 6")
            res.status(404).send("Too many skills. Please keep below 6")
        }
        if(!validate.isEmail(email)){
            res.status(404).send("Email invalid")
        }
        const pwdHash =await bcrypt.hash(password,10)
        console.log("ph -->",pwdHash)
        const user = new User({
            firstName,age,email,password:pwdHash,skills,phNumber
        })
        await user.save()
        res.send("User added to db");
    }
    catch(err){
        res.status(400).send("unable to save the user. "+err.message)
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }
        const isPwdValid = await bcrypt.compare(password, user.password);
        if (!isPwdValid) {
            return res.status(401).send("Invalid password");
        }
        res.send("logged in");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred");
    }
});


app.delete("/user",async (req,res)=>{
    const userId = req.body._id
    console.log(userId)
    try{
        const user =await User.findByIdAndDelete(userId)
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
        const Updateable = ["firstName","lastName","about","gender","age"]
        const isUpdatable = Object.keys(req.body).every((k)=>{
            Updateable.includes(k)
            })
        if(!isUpdatable){res.send("one of the fields unuptadable")}
        res.send("user updated")

    }
    catch(err){
        res.status(404).send("Wrong "+err.message)
    }
})





console.log("hi")
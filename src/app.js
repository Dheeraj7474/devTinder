const express = require("express");
const { verifyToken } = require("./utils");

const app = express()

app.listen(3000)



app.use("/",verifyToken)

app.get("/test",(req,res)=>{
    res.send("User valid")
})

console.log("hi")
const express = require("express");

const app = express()

app.listen(3000)
app.use("/test",(req,res)=>{
    res.send("Test from server")
})

app.use("/hi",(req,res)=>{
    res.send("Hi from exp server")
})


console.log("hi")
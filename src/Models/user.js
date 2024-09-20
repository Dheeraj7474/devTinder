const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String
    },
    lastName : {
        type : String
    },
    age : {
        type : Number
    },
    phNumber:{
        type : Number
    },
    gender:{
        type:String
    }
})

module.exports=mongoose.model("User",userSchema);
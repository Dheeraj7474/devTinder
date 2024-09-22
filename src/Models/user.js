const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required:true,
        minLength:3,
        unique:true,
    },
    lastName : {
        type : String
    },
    age : {
        type : Number,
        min:18,
        max:40
    },
    phNumber:{
        type : Number,
        unique:true,
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    about:{
        type:String,
        default:"ntg much"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required:true,
        minLength:3,
        maxLength:18,
    },
    lastName : {
        type : String,
        minLength:3,
        maxLength:18,
    },
    age : {
        type : Number,
        min:18,
        max:40
    },
    phNumber:{
        type : Number,
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    about:{
        type:String,
        default:"ntg much",
    },
    skills : {
        type:[String],
    }

},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);
const mongoose = require("mongoose")

const connectDB = async ()=>{ 
    await mongoose.connect("mongodb+srv://dherdheeraj:gTdIl1dYRuLz67bD@namasthenode.pjtri.mongodb.net/devTinder")
}

module.exports = {connectDB}



const verifyToken = (req,res,next)=>{
    const token = "pqr"
    if(token!=="xyz"){
        res.status(401).send("User unauthorized")
    }
    next()}

module.exports={verifyToken}
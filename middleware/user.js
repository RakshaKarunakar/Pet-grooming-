const jwt = require('jsonwebtoken');
const JWT_SECRET = "Useregister";

const fetchAdmin = (req, res, next) =>{
    const token = req.header("Login");
    console.log(token);
    if(!token){
        return res.status(401).send({error: "Access denied! No token provided"})
    }
    try{
        const user = jwt.verify(token,JWT_SECRET);
        console.log("user id:",user)
        console.log(token,'token');
        req.user=user;
        next();
    }
    catch(err){
        res.status(403).send({message:"Invalid Token!"})
    }
}
module.exports = fetchAdmin;
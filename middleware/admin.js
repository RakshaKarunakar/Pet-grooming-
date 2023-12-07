const jwt = require('jsonwebtoken');
const JWT_SECRET = "Register";

const fetchAdmin = (req, res, next) =>{

    const token = req.header('auth-token')
    console.log(token);
    if(!token){
        res.status(401).send({error: "Access denied! No token provided"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        console.log("admin id:",data)
        console.log(token,'token');

        req.admin=data;
        next();
    }
    catch(err){
        res.status(403).send({message:"Invalid Token!"})
    }
}
module.exports = fetchAdmin;
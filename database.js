const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/petgrooming";

const connectTomongo = async() =>{
    try{
        await mongoose.connect(mongoURL)
        console.log("connect to mongo Successfull");
    }
    catch(err){
        console.log("connect to mongo Unsuccessfull",err);
    }
}   
module.exports = connectTomongo;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userregisterSchema = new Schema({
    photo: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    phone:{
        type: Number,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },  
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: false,
    },
},
{timestamps:true,},
);
module.exports = mongoose.model("petuserregister",userregisterSchema);
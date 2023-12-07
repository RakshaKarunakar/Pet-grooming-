const mongoose = require('mongoose');
const { Schema } = mongoose;
const registerSchema = new Schema({
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
        required: true,
    },
});
module.exports = mongoose.model("petregister",registerSchema);
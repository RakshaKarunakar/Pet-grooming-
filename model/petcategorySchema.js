const mongoose = require('mongoose');
const { Schema } = mongoose;

const petcategorySchema = new Schema({
    petname: {
        type: String,
        required: true,
    },
    breedtype: {
        type: String,
        required: true,
    },
    photo: { 
        type: String,
        required: false,
    },
    status: { 
        type: String,
        required: true,
    },
},
{timestamps:true,},
);


module.exports = mongoose.model("petcategory", petcategorySchema); 
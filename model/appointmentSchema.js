const mongoose = require('mongoose');
const { Schema } = mongoose;
const appointmentSchema = new Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petcategory",
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petservice",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petuserregister",
    },//foreign key feeds
    ownername: {
        type: String,
        default: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    pet_name: {
        type: String,
        required: false,
    },
    pet_age:{
        type : Number,
        require : false,
     }, 
    appointment_date:{
         type: Date,
         default: new Date(),
     },  
    notes: {
        type: String,
        required: false,
    }, 
    price: {
        type: Number,
        required: false,
    }, 
    status: { 
        type: String,
        required: true,
    },
},
{timestamps:true,},
);
module.exports = mongoose.model("petappointment", appointmentSchema);
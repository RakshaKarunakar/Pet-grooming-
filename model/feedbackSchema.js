const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petappointment",
    },
    feedback: {
        type: String,
        required: true,
    },
    status: { 
        type: String,
        required: true,
    },
},
{timestamps:true,},
);
module.exports = mongoose.model("petfeedback", feedbackSchema);
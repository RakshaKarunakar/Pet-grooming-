const mongoose = require('mongoose');
const { Schema } = mongoose;
const serviceSchema = new Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petregister",
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "petcategory",
    },
    servicename: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
},
{timestamps:true,},
);
module.exports = mongoose.model("petservice", serviceSchema);
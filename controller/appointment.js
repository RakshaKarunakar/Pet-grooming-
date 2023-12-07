const appointmentSchema = require('../model/appointmentSchema')

const Insert = async (req, res) => {
    try {
        const {  ownername,phone,pet_name,pet_age,appointment_date,notes,price,category_id,service_id,status } = req.body;
        const data = new appointmentSchema({
            user_id:req.user,
            ownername:ownername,
            phone:phone,
            pet_name:pet_name,
            pet_age:pet_age,
            appointment_date:appointment_date,
            service_id:service_id,
            category_id:category_id,
            price:price,
            notes:notes,
            status:status,
        })
        const savedData = await data.save();
        console.log("Insertion successful");
        res.send({ "Insertion successful": true, savedData });
    }
    catch (error) {
        console.error("Some error occurred: " + error);
        res.status(500).json("Some internal error!!!");
    }
}

//view
const View = async(req, res)=>{
    try{
        const data = await appointmentSchema.find({ user_id:req.user}).populate("service_id").populate("category_id");
        console.log(data)
        res.json(data)
    }
    catch(error){
        console.error("some erroroccured"+error);
        res.status(500).json("Some internal error!!!")
    }
}

const AdminView = async(req, res)=>{
    try{
        const Adata = await appointmentSchema.find().populate("service_id").populate("category_id");
        console.log(Adata)
        res.json(Adata)
    }
    catch(error){
        console.error("some erroroccured"+error);
        res.status(500).json("Some internal error!!!")
    }
}

//Delete
const Delete = async(req, res)=>{
    try{
        let data = await appointmentSchema.findById(req.params.id).populate("service_id").populate("category_id");
        if(!data){
            console.log("appointment is not found with this ID")
            return res.status(404).send("appointment does not exist with this ID")
        }else{
            data = await appointmentSchema.findByIdAndDelete(req.params.id)
            console.log("appointment deleted successfully")
            res.json({"success":"Deleted successfully", "Deleted appointment":data})
        }
    }
    catch(error){
        console.error("some erroroccured"+error);
        res.status(500).json("Some internal error!!!")
    }
}

//singleView
const singleView = async(req, res)=>{
    try{
        let dataa = await appointmentSchema.findById(req.params.id).populate("service_id").populate("category_id");
        console.log(dataa)
        res.json(dataa)
    }
    catch(error){
            console.error("some erroroccured"+error);
            res.status(500).json("Some internal error!!!")
        }
}

// Update
const Update = async (req, res) => {
    const { ownername, phone, pet_name, pet_age, appointment_date, notes,price, service_id, category_id, status } = req.body;
    try {
        const newdata = {};

        if (ownername) { newdata.ownername = ownername; }
        if (phone) { newdata.phone = phone; }
        if (pet_name) { newdata.pet_name = pet_name; }
        if (pet_age) { newdata.pet_age = pet_age; }
        if (appointment_date) { newdata.appointment_date = appointment_date; }
        if (notes) { newdata.notes = notes; }
        if (service_id) { newdata.service_id = service_id; }
        if (category_id) { newdata.category_id = category_id; }
        if (price) {  newdata.price = price; }
        if (status) {  newdata.status = status; }

        const existingappointment = await appointmentSchema.findById(req.params.id);

        if (!existingappointment) {
            console.log('appointment not found with this ID');
            return res.status(404).json({ error: 'appointment does not exist with this ID' });
        }

        const updatedappointment = await appointmentSchema.findByIdAndUpdate(req.params.id, newdata, { new: true });

        console.log('appointment Updated successfully');
        res.json(updatedappointment);
    } catch (error) {
        console.error('An error occurred: ' + error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {Insert, View,AdminView, Delete,singleView, Update};
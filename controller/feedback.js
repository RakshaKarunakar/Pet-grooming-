const feedbackSchema = require('../model/feedbackSchema')

const Insert = async (req, res) => {
    try {
        const {feedback,status,appointment_id} = req.body;
        const data = new feedbackSchema({
            feedback:feedback,
            status:status,
            appointment_id:appointment_id,
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
        const data = await feedbackSchema.find().populate("appointment_id");
        console.log(data)
        res.json(data)
    }
    catch(error){
        console.error("some erroroccured"+error);
        res.status(500).json("Some internal error!!!")
    }
}

//Delete
const Delete = async(req, res)=>{
    try{
        let data = await feedbackSchema.findById(req.params.id);
        if(!data){
            console.log("feedback is not found with this ID")
            return res.status(404).send("feedback does not exist with this ID")
        }else{
            data = await feedbackSchema.findByIdAndDelete(req.params.id)
            console.log("feedback deleted successfully")
            res.json({"success":"Deleted successfully", "Deleted feedback":data})
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
        let dataa = await feedbackSchema.findById(req.params.id).populate("appointment_id");
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
  const { feedback,status,appointment_id } = req.body;
  try {
      const newdata = {};
      if (feedback) {  newdata.feedback = feedback; }
      if (status) {  newdata.status = status; }
      if (appointment_id) {  newdata.appointment_id = appointment_id; }


      const existingfeedback = await feedbackSchema.findById(req.params.id);

      if (!existingfeedback) {
          console.log('feedback not found with this ID');
          return res.status(404).json({ error: 'feedback does not exist with this ID' });
      }

      const updatedfeedback = await feedbackSchema.findByIdAndUpdate(req.params.id, newdata, { new: true });

      console.log('feedback Updated successfully');
      res.json(updatedfeedback);
  } catch (error) {
      console.error('An error occurred: ' + error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {Insert, View, singleView, Delete, Update};
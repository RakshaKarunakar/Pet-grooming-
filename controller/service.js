const serviceSchema = require('../model/serviceSchema')

const Insert = async (req, res) => {
    try {
        const { servicename,description,price,status,category } = req.body;
        const data = new serviceSchema({
            admin_id:req.admin,
            servicename:servicename,
            description:description,
            category_id: category,
            price:price,
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
        const data = await serviceSchema.find().populate("category_id");;
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
        let data = await serviceSchema.findById(req.params.id).populate("category_id");
        if(!data){
            console.log("service is not found with this ID")
            return res.status(404).send("service does not exist with this ID")
        }else{
            data = await serviceSchema.findByIdAndDelete(req.params.id)
            console.log("service deleted successfully")
            res.json({"success":"Deleted successfully", "Deleted service":data})
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
        let dataa = await serviceSchema.findById(req.params.id).populate("category_id");
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
  const {  servicename,description,price,status,category_id } = req.body;
  try {
      const newdata = {};

      if (servicename) {  newdata.servicename = servicename; }
      if (description) {  newdata.description = description; }
      if (price) {  newdata.price = price; }
      if (status) {  newdata.status = status; }
      if (category_id) {  newdata.category_id = category_id; }


      const existingservice = await serviceSchema.findById(req.params.id);

      if (!existingservice) {
          console.log('service not found with this ID');
          return res.status(404).json({ error: 'service does not exist with this ID' });
      }

      const updatedservice = await serviceSchema.findByIdAndUpdate(req.params.id, newdata, { new: true });

      console.log('service Updated successfully');
      res.json(updatedservice);
  } catch (error) {
      console.error('An error occurred: ' + error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {Insert, View, Delete,singleView, Update};
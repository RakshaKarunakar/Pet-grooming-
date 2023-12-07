const petcategorySchema = require('../model/petcategorySchema')

const Insert = async (req, res) => {
  try {
    const { petname, breedtype, status } = req.body;
    const photo = req.file.filename;
    const data = new petcategorySchema({
      petname: petname,
      breedtype: breedtype,
      photo: photo,
      status: status,
    });
    const savedData = await data.save();
    console.log("Insertion successful");
    res.send({ "Insertion successful": true, savedData });
  } catch (error) {
    console.error("Some error occurred: " + error);
    res.status(500).json("Some internal error!!!");
  }
}

//view
const View = async (req, res) => {
  try {
    const data = await petcategorySchema.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Some error occurred: " + error);
    res.status(500).json("Some internal error!!!");
  }
}

//Delete
const Delete = async (req, res) => {
  try {
    let data = await petcategorySchema.findById(req.params.id);
    if (!data) {
      console.log("category is not found with this ID")
      return res.status(404).send("category does not exist with this ID")
    } else {
      data = await petcategorySchema.findByIdAndDelete(req.params.id)
      console.log("category deleted successfully")
      res.json({ "success": "Deleted successfully", "Deleted category": data })
    }
  }
  catch (error) {
    console.error("some erroroccured" + error);
    res.status(500).json("Some internal error!!!")
  }
}

//singleView
const singleView = async (req, res) => {
  try {
    let dataa = await petcategorySchema.findById(req.params.id);
    console.log(dataa)
    res.json(dataa)
  }
  catch (error) {
    console.error("some erroroccured" + error);
    res.status(500).json("Some internal error!!!")
  }
}

//update
const Update = async (req, res) => {
  const { petname, breedtype, status } = req.body;
  let photo = '';

  if (req.file) {
    photo = req.file.filename;
  }

  try {
    const newData = {};

    if (photo) {
      newData.photo = photo;
    }

    if (petname) {
      newData.petname = petname;
    }

    if (breedtype) {
      newData.breedtype = breedtype;
    }

    if (status) {
      newData.status = status;
    }

    const existingCategory = await petcategorySchema.findById(req.params.id);

    if (!existingCategory) {
      console.log('Category not found with this ID');
      return res.status(404).json({ error: 'Category does not exist with this ID' });
    }

    const updatedCategory = await petcategorySchema.findByIdAndUpdate(
      req.params.id,
      newData,
      { new: true }
    );

    console.log('Category updated successfully');
    res.json(updatedCategory); // Corrected variable name here
  } catch (error) {
    console.error('An error occurred: ' + error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Insert, View, Delete, singleView, Update };
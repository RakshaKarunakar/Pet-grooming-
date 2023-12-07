const userregisterSchema = require('../model/userregisterSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Useregister";

// Insert a new user
const Insert = async (req, res) => {
    try {
        const { name, phone, email, password, address, status } = req.body;
        const photo = req.file.filename;
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt);

        // Check if the email already exists
        const checkEmail = await userregisterSchema.findOne({ email: email });
        if (checkEmail) {
            return res.json({ success: false, errors: "Email ID already exists" });
        }

        const data = new userregisterSchema({
            name: name,
            phone: phone,
            email: email,
            password: secpass, // Storing password directly for simplicity, consider hashing it.
            photo: photo,
            address: address,
            status: status,
        });
        const savedUser = await data.save();
        console.log("Insertion successful");
        res.json({ success: true, data: savedUser });
    } catch (error) {
        console.error("Some error occurred: ", error);
        res.status(500).json({ success: false, error: "Some internal error occurred!" });
    }
}


const Passwordreset= async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      let user = await userregisterSchema.findOne({ email });
  
      if (!user) {
        console.error('Email does not exist!');
        return res.status(404).json({ error: 'Email does not exist!' });
      }
  
      // Update the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();
  
      console.log('Password reset successfully.');
      res.json({ success: 'Password reset successfully.' });
    } catch (error) {
      console.error('Some error occurred ' + error);
      res.status(500).json({ error: 'Some internal error' });
    }
  }
  

//view
const View = async(req, res)=>{
    try{
        const data = await userregisterSchema.find();
        console.log(data)
        res.json(data)
    }
    catch(error){
        console.error("some erroroccured"+error);
        res.status(500).json("Some internal error!!!")
    }
}

// Delete a user by ID
const Delete = async (req, res) => {
        try{
            let data = await userregisterSchema.findById(req.params.id);
            if(!data){
                console.log("Data is not found with this ID")
                return res.status(404).send("Data does not exist with this ID")
            }else{
                data = await userregisterSchema.findByIdAndDelete(req.params.id)
                console.log("Data deleted successfully")
                res.json({"success":"Deleted successfully", "Deleted Data":data})
            }
        }
        catch(error){
            console.error("some erroroccured"+error);
            res.status(500).json("Some internal error!!!")
        }
}

// View a single user/user by ID
const singleView = async (req, res) => {
    try {
        let user = await userregisterSchema.findById(req.params.id);
            if (!user) {
                console.log("Data is not found with this ID");
                return res.status(404).send("Data does not exist with this ID");
            } else {
            res.json(user);
        }
    } catch (error) {
        console.error("Some error occurred: " + error);
        res.status(500).json("Some internal error!!!");
    }
}


// Update user data
const Update = async (req, res) => {
    const { name, phone, email,address,status } = req.body;
    let photo = '';

    if (req.file) {
        photo = req.file.filename;
    }

    try {
        const newdata = {};

        if (photo) { newdata.photo = photo; }

        if (name) { newdata.name = name; }

        if (phone) { newdata.phone = phone; }

        if (email) { newdata.email = email; }

        if (address) { newdata.address = address; }

        if (status) {  newdata.status = status; }

        const existingProfile = await userregisterSchema.findById(req.params.id);

        if (!existingProfile) {
            console.log('Profile not found with this ID');
            return res.status(404).json({ error: 'Profile does not exist with this ID' });
        }

        const updatedProfile = await userregisterSchema.findByIdAndUpdate(req.params.id, newdata, { new: true });

        console.log('Profile Updated successfully');
        res.json(updatedProfile);
    } catch (error) {
        console.error('An error occurred: ' + error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User Login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await userregisterSchema.findOne({ email });
  
      if (!user) {
        return res.json({ error: "Invalid credential email" });
      }
  
      if (user.status === 'Disabled') {
        return res.json({ success: false, error: 'Account is disabled' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.json({ success: false, error: 'Password not matched' });
      }
  
      const data = user.id;
      const authotoken = jwt.sign(data, JWT_SECRET);
  
      res.json({ success: true, authotoken, user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };
  
module.exports = { Insert, View, Delete, singleView, Update, Login,Passwordreset };
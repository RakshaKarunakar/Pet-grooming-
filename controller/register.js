const registerSchema = require('../model/registerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Register";

// Insert a new admin
const Insert = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const photo = req.file.filename;

        // Check if the email already exists
        const existingUser = await registerSchema.findOne({ email: email });

        if (existingUser) {
            // Email already exists
            return res.json({ success: false, errors: 'Email ID already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new registerSchema({
            name: name,
            phone: phone,
            email: email,
            password: hashedPassword,
            photo: photo,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        console.log('Insertion successful');
        res.json({ success: true, data: savedUser });
    } catch (error) {
        console.error('Some error occurred: ' + error);
        res.status(500).json('Some internal error!!!');
    }
};


//view
const View = async (req, res) => {
    try {
        const data = await registerSchema.find();
        console.log(data)
        res.json(data)
    }
    catch (error) {
        console.error("some erroroccured" + error);
        res.status(500).json("Some internal error!!!")
    }
}

// Delete a admin by ID
const Delete = async (req, res) => {
    try {
        let data = await registerSchema.findById(req.params.id);
        if (!data) {
            console.log("Data is not found with this ID")
            return res.status(404).send("Data does not exist with this ID")
        } else {
            data = await registerSchema.findByIdAndDelete(req.params.id)
            console.log("Data deleted successfully")
            res.json({ "success": "Deleted successfully", "Deleted Data": data })
        }
    }
    catch (error) {
        console.error("some erroroccured" + error);
        res.status(500).json("Some internal error!!!")
    }
}

// View a single admin/admin by ID
const singleView = async (req, res) => {
    try {
        let admin = await registerSchema.findById(req.params.id);
        if (!admin) {
            console.log("Data is not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        } else {
            res.json(admin);
        }
    } catch (error) {
        console.error("Some error occurred: " + error);
        res.status(500).json("Some internal error!!!");
    }
}


// Update admin data
const Update = async (req, res) => {
    const { name, phone, email } = req.body;
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

        const existingProfile = await registerSchema.findById(req.params.id);

        if (!existingProfile) {
            console.log('Profile not found with this ID');
            return res.status(404).json({ error: 'Profile does not exist with this ID' });
        }

        const updatedProfile = await registerSchema.findByIdAndUpdate(req.params.id, newdata, { new: true });

        console.log('Profile Updated successfully');
        res.json(updatedProfile);
    } catch (error) {
        console.error('An error occurred: ' + error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//reset password
const Passwordreset = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        let admin = await registerSchema.findOne({ email });

        if (!admin) {
            console.error('Email does not exist!');
            return res.status(404).json({ error: 'Email does not exist!' });
        }

        // Update the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the admin's password in the database
        admin.password = hashedPassword;
        await admin.save();

        console.log('Password reset successfully.');
        res.json({ success: 'Password reset successfully.' });
    } catch (error) {
        console.error('Some error occurred ' + error);
        res.status(500).json({ error: 'Some internal error' });
    }
}

// admin Login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let admin = await registerSchema.findOne({ email });
        if (!admin) {
            return res.json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, error: 'Password not matched' });
        }
        const data = admin.id;
        const authotoken = jwt.sign(data, JWT_SECRET);
        console.log(authotoken);
        res.json({ success: true, authotoken, admin });
    } catch (error) {
        console.error(error.message);
        res.send(" internal some Error occurred");
    }
}

module.exports = { Insert, View, Delete, singleView, Update, Passwordreset, Login };

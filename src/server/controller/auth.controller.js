require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../model/user");
const Ngo = require("../model/ngo");
const connectDB = require('../config/database');

const saltRounds = Number(process.env.SALT_ROUNDS);

exports.signin = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
        res.status(400).send("All input is required");
        }
        
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
              { user_id: user._id.toString(), email },
              "hello",
              {
              expiresIn: "1h",
              }
          );
          res
            .cookie("access_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌" });
        }else{
          res.status(400).send("Invalid Credentials");
        }
    }catch (err) {
        console.log(err);
    }
}

exports.userSignup = async (req, res) => {
    try {
      // Get user input
      const { first_name, last_name, contact, email, password } = req.body;

      // Validate user input
      if (!(email && password && first_name && last_name && contact)) {
        res.status(400).send("All input is required");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      // Encrypt user password
      encryptedPassword = await bcrypt.hash(password, saltRounds);
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        contact: contact,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword
      });
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Signup successfully 😊 👌" });
    
  } catch (err) {
    console.log(err);
  }
}

exports.ngoSignup = async (req, res) => {
  try {
    // Get ngo input
    const { organization_name, contact, email, password } = req.body;

    // Validate ngo input
    if (!(organization_name && contact && email && password)) {
      res.status(400).send("All input is required");
    }

    // check if ngo already exist
    // Validate if ngo exist in our database
    const oldNgo = await Ngo.findOne({ email });

    if (oldNgo) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt ngo password
    encryptedPassword = await bcrypt.hash(password, saltRounds);
    // Create ngo in our database
    const ngo = await Ngo.create({
      organization_name,
      contact: contact,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: hash,
    });
    // Create token
    const token = jwt.sign(
      { user_id: ngo._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Signup successfully 😊 👌" });
  }catch (err) {
    console.log(err);
  }
}


exports.logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}
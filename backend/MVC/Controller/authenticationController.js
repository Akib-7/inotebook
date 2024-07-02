var userModel = require("../Models/UserModel");
var bcrypt = require("bcryptjs"); //FOR Hashing of Password

var jwt = require("jsonwebtoken"); // For User Session Record
const secretKey = "IamAkib"; // This should be placed in an ENVIRONMENT variable

//SIGNUP

// SignUp Form Submission in database
// For recieving data from the client and storing it in database
var postAuth = (req, res) => {
  // Finding if the entered email already exist ?

  userModel.findOne({ email: req.body.email }).then((data) => {
    var success = "false";
    if (data) {
      try {
        res.json({ success, message: "SAME EMAIL FOUND" });
      } catch (error) {
        res.status(500).json({ success, message: "Successfully Created" });
      }
    } else {
      success = true;
      // If its a valid email then we will process
      //Using promises we will check and move forward

      // 1-Generating Salt
      try {
        bcrypt
          .genSalt(10)
          .then((data) => {
            //  console.log('PASSWORD: '+req.body.password)// Original Password
            //  console.log('Inside GEN SALT: '+data)// Password's Salt

            return data;
          })
          .then((data) => {
            // 2- Generating hash and combining it with salt
            return bcrypt.hash(req.body.password, data);
          })
          .then((data) => {
            //Now variable "data" has the final secured password with salt+hash

            //console.log('INSIDE SECURE PASS: '+data)
            var securePassword = data;
            userModel
              .create({
                name: req.body.name,
                password: securePassword, // assigning the secured password to password field
                email: req.body.email,
              })
              .then((data) => {
                // res.end('Account Created Successfully')
                res.json({ success, message: "Account Created Successfully" }); // It is the data that the user entered
              })
              .catch((err) => {
                res.json(err);
              });
          });
      } catch (error) {
        res.status(500).json("Internal Server Error");
      }
    }
  });
};

//LOGIN

var login = async (req, res) => {
  var success = false;

  //STEPS
  //1: Finding user through email because email is unique
  const { email, password } = req.body;

  try {
    var userData = await userModel.findOne({ email });
    //verifying Email
    // if(!data){
    //     //res.json("Invalid Credentials inside EMAIL")
    // console.log('Invalid Username')

    // }
    //verifying Password
    // entered correct email then compare the user password with hashed password

    if (!userData) {
      res.json(success, "Invalid Credentials");
    }
    // console.log('USER DATA: '+userData.name)
    var verifyPassword = await bcrypt.compare(password, userData.password); // Returns TRUE or FALSE
    console.log("VERIFY PASSWORD VALUE: " + verifyPassword);
    if (!verifyPassword) {
      res.json(success, "Invalid Credentials");
    } else {
      var payload = { user: userData };
      var token = jwt.sign(payload, secretKey);
      var success = true;
      res.json({ success, authentication: token });

      // console.log('USER ID'+userData.id)
      console.log("Logged In successfully");
      //console.log(token)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

var fetchUser = async (req, res) => {
  // console.log("ID: "+req.user.id)
  try {
    const user = await userModel.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.send("Internal Server Error");
  }
};

module.exports = { postAuth, login, fetchUser };

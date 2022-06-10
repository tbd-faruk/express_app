const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function login(req, res, next){
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email, username: user.username, name: user.name},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

async function register(req, res){
    try {
      const { name, username, email, password } = req.body;
  
      if (!(email && password && name && username)) {
        res.send("All input is required");
      }
  
      const oldUser = await User.findOne({ email });
      const oldUsername = await User.findOne({ username });
  
      if (oldUser || oldUsername) {
        return res.send("User Already Exist. Please Login");
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
    
      const user = await User.create({
        name,
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      console.log(user);
      const token = jwt.sign(
        { user_id: user._id, email,username: user.username, name: user.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
   
      user.token = token;
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

module.exports = {
    register,
    login
};
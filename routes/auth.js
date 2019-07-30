const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User");

router.post("/signup", (req, res) => {

  const { username, password } = req.body;

  if (!password || !username) {
    //both fields need to be filled
    return res.status(400).json({
      errorMessage: "All field needs to be filled"
    });
    
  } else if (password.length < 8) {
    //password length is too short
    return res.status(400).json({
      errorMessage: "Password needs to be 8 characters min"
    });
    
  }

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        return res.status(409).json({ errorMessage: "User name already taken" });

      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username,
          password: hash
        }).then(newUser => {
          console.log(newUser)
          req.login(newUser, () => {
            
            res.status(200).json(newUser); //everything went well
          })
        }).catch(err => {
          res.json({ errorMessage: err._message });
        });
      }
    })
    

})


router.post("/login", (req, res) => {
  passport.authenticate("local", (error, user) => {
    if(error){
      return res.json({ message: "Error authenticating" });
    }
    else if(!user) {
      return res.json({ message: "Invalid credentials" });
    }

    req.login(user, (error) => {
      if(error){
        
        return req.json({message: "Error while login"});
      }

      return res.status(200).json(user);
    });
  })(req, res);
});


router.post("/logout", (req, res) => {
  req.logout(); //Delete the session from req.user
  res.status(200).json({message: "User was successfully logged out "})
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
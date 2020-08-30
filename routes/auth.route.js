const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../config/config");

/* 
    @route POST api/auth/register
    @desc register user
    @access public
*/
router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    let user = new User({ username, email });

    //hash password before save
    let hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

    //save user
    await user.save();
    //201 - success and new data was added
    // res.status(201).json({ message: "user registered successfully!" });
    const payload = {
      user: {
        id: user._id,
      },
    };
    //gives you a token on login
    jwt.sign(
      payload,
      process.env.JWTCODE,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err; //if error go to catch

        res
          .status(200)
          .json({ token, message: "user registered successfully!" });
      }
    );
  } catch (error) {
    //   500 internal server error
    res
      .status(500)
      .json({ message: "oh no!!!  user not registered successfully!" });
  }
});

/* 
    @route POST api/auth/login
    @desc login user
    @access public
*/
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    //search db for user with email
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong username or password." });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };
    //gives you a token on login
    jwt.sign(
      payload,
      process.env.JWTCODE,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err; //if error go to catch

        res.status(200).json({ token, message: "You have logged in" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Log in error, please try again" });
  }
});

router.get("/user", checkToken, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, "-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong!",
    });
  }
});

module.exports = router;

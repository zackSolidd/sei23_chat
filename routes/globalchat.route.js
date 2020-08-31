const router = require("express").Router();
const User = require("../model/user.model");
const checkToken = require("../config/config.js")


router.get("/", checkToken, (req, res) => {
});

module.exports = router;

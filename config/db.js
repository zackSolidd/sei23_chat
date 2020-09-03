require("dotenv").config();

const mongoose = require("mongoose");

//==connect to mongoose
mongoose.connect(
  process.env.MONGODBURL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("mongodb connected!");
  }
);

module.exports = mongoose;
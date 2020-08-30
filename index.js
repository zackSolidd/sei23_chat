//======= require all dependencies
require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')

//=== add all middlewares
app.use(cors());
    /* 
    ===================
    Connect to MongoDB 
    */
require("./config/db"); //calls my mongoose connection to cleanup this file
app.use(express.json()); //allows me to receive JSON files from HEADER of REQUEST

//=== setup my routes
// app.use("/api/items", require("./routes/item.route"));
app.use("/api/auth", require("./routes/auth.route"));

//=== 404 errors
app.get("*", (req, res) => {
    res.status(404).json({ message: "E404 : Page not found", code: "EB404" });
  });
//=== setup the server port
app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
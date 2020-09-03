//======= require all dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

//=== add all middlewares
app.use(cors());
/* 
    ===================
    Connect to MongoDB 
    */
require("./config/db"); //calls my mongoose connection to cleanup this file
app.use(express.json()); //allows me to receive JSON files from HEADER of REQUEST

//=== setup my routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/chatroom", require("./routes/chatRoom.route"));
app.use("/api/globalchatroom", require("./routes/globalchat.route"));
app.use(express.static(path.join(__dirname, "running", "build")));

// socket.io
io.on("connection", async (socket) => {
  socket.on("message", ({ username, message }) => {
    io.emit("message", { username, message });
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});

//=== 404 errors

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "running", "build", "index.html"));
});

//=== setup the server port
http.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);

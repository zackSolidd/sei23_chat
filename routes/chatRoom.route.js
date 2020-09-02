const router = require("express").Router();
const User = require("../model/user.model");
const ChatRoom = require("../model/chatRoom.model");
const GlobalChat = require("../model/globalChat.model");
const checkToken = require("../config/config.js");

//create new global chat room
router.post("/create", checkToken, async (req, res) => {
  // console.log(req.body);
  try {
    let chatRoom = new ChatRoom(req.body);

    console.log(req.user.id);
    chatRoom.createBy = req.user.id;

    let savedChatRoom = await chatRoom.save();

    if (savedChatRoom) {
      return res.status(400).json({ message: "Chat Room Created" });
    }
  } catch (error) {
    console.log(error);
  }
});

//show chat room

// router.get("/:id", async (req, res) => {
//   try {
//     let chatRoom = await ChatRoom.findById(req.params.id);

//     res.status(200).json({
//       message: "chatRoom found",
//       chatRoom,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Sorry, cannot find chat room ",
//       statuscode: "EB500",
//     });
//   }
// });

//post message
router.post("/postMessage", checkToken, (req, res) => {
  // console.log(req.body);
    let message = new GlobalChat(req.body);

    console.log(message);

    // req.io.sockets.emit('message', "message");

    message.save(err => {
      if (err) {
          console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Failure' }));
          res.sendStatus(500);
      } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Success' }));
      }
  });
});

//show message
router.get("/showchat", async (req, res) => {
  try {
    let chats = await GlobalChat.find()
      .populate("userid");

    res.status(200).send({
      count: chats.length,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: "1010101001111000111",
      statuscode: "EB500",
    });
  }
});




module.exports = router;

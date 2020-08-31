const router = require("express").Router();
const ChatRoom = require("../model/chatRoom.model");
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

router.get("/show/:id", async (req, res) => {
  try {
    //Populate only includes the data from  cuisine collection and ownedBy collection
    let chatRoom = await ChatRoom.findById(req.params.id);

    res.status(200).json({
      message: "chatRoom found",
      chatRoom,
    });
  } catch (err) {
    res.status(500).json({
      message: "Sorry, cannot find chat room ",
      statuscode: "EB500",
    });
  }
  //   Restaurant.findById(req.params.id)
  //     .populate("ownedBy")
  //     .then((restaurant) => {
  //       res.send(restaurant);
  //     });

  //   Restaurant.findById(req.params.id).then((restaurant) => {
  //     User.findById(restaurant.ownedBy).then((user) => {
  //       res.send(restaurant, user);
  //     });
  //   });
});

module.exports = router;

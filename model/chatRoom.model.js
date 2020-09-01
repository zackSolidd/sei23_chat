const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema(
  {
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    messages: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GlobalChat",
        }
      },
    ],
  },
  { timestamps: true }
);
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;

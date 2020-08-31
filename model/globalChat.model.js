const mongoose = require("mongoose");
const globalChatSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
      required: true,
    },
    dates: {
        type: String,
        default: Date.now,
      },
  },
  { timestamps: true }
);
const GlobalChat = mongoose.model("GlobalChat", globalChatSchema);
module.exports = GlobalChat;
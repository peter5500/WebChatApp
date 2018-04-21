let mongoose = require('mongoose');

let ChatroomSchema = new mongoose.Schema({
  messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }],
  room_name: String,
  room_member: [String],
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
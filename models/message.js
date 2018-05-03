let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
  username: String,
  context: String,
  date: Date,
  type: String 
});

module.exports = mongoose.model('Message', MessageSchema);
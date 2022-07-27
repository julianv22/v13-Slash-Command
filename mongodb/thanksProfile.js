const mongoose = require('mongoose');
const thanksProfile = new mongoose.Schema({
  guildID: { type: String, require: true },
  guildName: { type: String },
  userID: { type: String, require: true },
  usertag: { type: String },
  count: { type: Number, default: 0 },
  lastThanks: { type: String }
});

module.exports = mongoose.model('thanksProfile', thanksProfile, `thanksProfile [${cfg.botID}]`);
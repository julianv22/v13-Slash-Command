const mongoose = require('mongoose');
const tournamenProfile = new mongoose.Schema({
  guildID: { type: String, require: true },
  guildName: { type: String },
  userID: { type: String, require: true },
  usertag: { type: String },
  ingame: { type: String },
  decklist: { type: String },
  status: { type: Boolean },
});

module.exports = mongoose.model('tournamenProfile', tournamenProfile, `tournamenProfile [${cfg.botID}]`);
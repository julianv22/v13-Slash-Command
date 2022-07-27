const mongoose = require('mongoose');
const serverProfile = new mongoose.Schema({
  guildID: { type: String, require: true, unique: true },
  guildName: { type: String },
  reportChannel: { type: String },
  updateChannel: { type: String },
  suggestChannel: { type: String },
  tourStatus: { type: Boolean },
  tourID: { type: String },
  tourName: { type: String },
});

module.exports = mongoose.model('serverProfile', serverProfile, `serverProfile [${cfg.botID}]`);
const mongoose = require('mongoose');
const serverProfile = new mongoose.Schema({
  guildID: { type: String, require: true, unique: true },
  guildName: { type: String },
  reportChannel: { type: String },
  updateChannel: { type: String },
  suggestChannel: { type: String },
  welomeChannel: { type: String },
  welomeMessage: { type: String },
  logChannel: { type: String },
  tourID: { type: String },
  tourName: { type: String },
  tourStatus: { type: Boolean },
});

module.exports = mongoose.model('serverProfile', serverProfile, `serverProfile [${cfg.botID}]`);
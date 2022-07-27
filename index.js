const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Julian-V! Have a good day 🥰')
});

app.listen(3000, () => {
  console.log('Express app started!');
});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

global.cfg = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
  intents: 32767,
  partials: [
    'User',
    'GuildMember',
    'Message',
    'Reaction',
    'GuildScheduledEvent',
    'ThreadMember',
  ]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.slashArray = [];

const funcFiles = fs.readdirSync('./functions').filter(f => f.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
global.cmdFolders = fs.readdirSync('./commands');
global.slashcmdFolder = fs.readdirSync('./slashcommands');

(async () => {

  for (file of funcFiles) require(`./functions/${file}`)(client);

  client.handleEvents(eventFiles);
  client.handleCommands(cmdFolders, slashcmdFolder);

  // CLIENT LOGIN
  mongoose.connect(process.env.mongodb, (err) => {
    console.log(`\n[ Connect to mongodb ] ${cfg.v}\nError: `, err || '0');
  })
  client.login(process.env.token).catch(e => console.log(e));
})();
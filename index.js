const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Julian-V! Have a good day 🥰')
});

app.listen(3000, () => {
  console.log('Express app started!');
});

global.mongoose = require('mongoose');
mongoose.Promise = global.Promise;

global.ascii = require('ascii-table');
global.chalk = require('chalk');
global.moment = require("moment");
global.fetch = require('node-fetch');
global.cfg = require('./config.json');
global.fs = require('fs');

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

global.funcFiles = fs.readdirSync('./functions').filter(f => f.endsWith('.js'));
global.eventFolders = fs.readdirSync('./events');
global.cmdFolders = fs.readdirSync('./commands');
global.slashcmdFolder = fs.readdirSync('./slashcommands');

(async () => {

  for (file of funcFiles) require(`./functions/${file}`)(client);

  client.handleEvents(eventFolders);
  client.handleCommands(cmdFolders, slashcmdFolder);

  // CLIENT LOGIN
  mongoose.connect(process.env.mongodb, (err) => {
    console.log(chalk.green(`\n${cfg.v} [ Connected to mongodb ]`) + chalk.red(`\n${cfg.x} [ Error ]: `), err || '0');
  })
  client.login(process.env.token).catch(e => console.log(e));
})();
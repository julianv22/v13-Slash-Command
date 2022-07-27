const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const ascii = require('ascii-table');

module.exports = (client) => {
  client.handleCommands = (cmdFolders, slashCommandFiles) => {
    try {
      // Commands Handle      
      const table = new ascii()
        .setHeading('Folder', '📝', 'Command Name', ' ♻ ')
        .setAlignCenter(1);
      let count = 0;
      for (const folder of cmdFolders) {
        const cmdFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
        table.addRow(`${cfg.folder} ${folder.toUpperCase()} [${cmdFiles.length}]`, '-', '----------', cfg.folder);
        let i = 1;
        for (const file of cmdFiles) {
          const command = require(`../commands/${folder}/${file}`);
          if (command.name) {
            client.commands.set(command.name, command);
            table.addRow('', i++, command.name, cfg.v);
            count++;
            continue;
          };
        };
      };
      table.setTitle(`Load Commands [${count}]`);

      // Slash Commands Handle
      const slashTable = new ascii()
        .setHeading('📝', 'Command Name', ' ♻ ')
        .setAlignCenter(0)

      let i = 1;
      for (const file of slashCommandFiles) {
        const slashcmd = require(`../slashcommands/${file}`);
        client.slashCommands.set(slashcmd.data.name, slashcmd);
        client.slashArray.push(slashcmd.data.toJSON());
        slashTable.setTitle(`Slash Commands [${i}]`);
        slashTable.addRow(i++, slashcmd.data.name, cfg.v);
        continue;
      }
      (async () => {
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        console.log('\nStarted refreshing application (/) commands.\n');
        await rest.put(Routes.applicationCommands(cfg.botID),
          { body: client.slashArray });
        console.log('\nSuccessfully reloaded application (/) commands.\n');
      })();

      console.log(table.toString());
      console.log(slashTable.toString());
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = (client) => {
  client.handleEvents = async (eventFolders) => {
    try {
      // Events Handle              
      const table = new ascii()
        .setHeading('Folder', 'Event Name', ' ♻ ')

      let count = 0;
      for (const folder of eventFolders) {
        const fs = require('fs')
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(f => f.endsWith('.js'));

        table.addRow(
          `${cfg.folder} ${folder.toUpperCase()} [${eventFiles.length}]`,
          '---------------',
          cfg.folder);

        for (const file of eventFiles) {
          const event = require(`../events/${folder}/${file}`);
          if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
          else client.on(event.name, (...args) => event.execute(...args, client,));

          table.addRow('', event.name, `${cfg.v}\u200b`);
          count++
          continue;
        }
      };

      table.setTitle(`Load Events [${count}]`);

      console.log(chalk.bgWhite('\n-----------------Starting Client-----------------\n'));
      console.log(table.toString());
    } catch (e) {
      console.log(e);
    }
  }
}
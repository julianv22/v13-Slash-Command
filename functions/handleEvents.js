module.exports = (client) => {
  client.handleEvents = async (eventFolders) => {
    try {
      // Events Handle              
      const eventTable = new ascii()
        .setHeading('Folder', 'Event Name', ' ♻ ')

      let count = 0;
      for (const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(f => f.endsWith('.js'));

        eventTable.addRow(
          `${cfg.folder} ${folder.toUpperCase()} [${eventFiles.length}]`,
          '---------------',
          cfg.folder);

        for (const file of eventFiles) {
          const event = require(`../events/${folder}/${file}`);
          if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
          else client.on(event.name, (...args) => event.execute(...args, client,));

          eventTable.addRow('', event.name, `${cfg.v}\u200b`);
          count++
          continue;
        }
      };
      eventTable.setTitle(`Load Events [${count}]`);

      eventTable.setTitle(`Load Events [${count}]`);

      const funcTable = new ascii()
        .setTitle(`Load Functions [${funcFiles.length}]`)
        .setHeading('Function', ' ♻ ');
      for (const file of funcFiles)
        funcTable.addRow(file.split('.js')[0], `${cfg.v}\u200b`);

      console.log(chalk.bgWhite('\n-----------------Starting Client-----------------\n'));
      console.log(eventTable.toString());
      console.log(funcTable.toString());
    } catch (e) {
      console.log(e);
    }
  }
}
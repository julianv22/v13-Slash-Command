module.exports = (client) => {
  client.handleEvents = async (eventFiles) => {
    try {
      // Events Handle     
      const table = new ascii().setHeading('📝', 'Event', ' ♻ ');
      let i = 1;
      for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client,));
        table.setTitle(`Load Events [${i}]`);
        table.addRow(i++, event.name, `${cfg.v}\u200b`);
        continue;
      }
      console.log(chalk.bgYellow('\n-----------------Starting Client-----------------\n'));
      console.log(table.toString());
    } catch (e) {
      console.log(e);
    }
  }
}
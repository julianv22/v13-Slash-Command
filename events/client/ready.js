module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const stStatust = cfg.prefix + cfg.status
    setInterval(() => { // Set Activity
      const index = Math.floor(Math.random() * cfg.statustype.length);
      client.user.setActivity(stStatust, {
        type: cfg.statustype[index],
        url: cfg.youtube
      });
    }, 5 * 60 * 1000);

    const table = new ascii()
      .setTitle(`Login Client & Load Functions`)
      .setHeading('Client', `Functions [${funcFiles.length}]`, '♻')

    table.addRow(`${client.user.tag}\u200b\u200b`, '', `${cfg.v}\u200b`);

    const clientRows = [
      '',
      `ID: ${cfg.botID}`,
      '',
      `Prefix: ${cfg.prefix}`,
      '',
      'Support Server:',
      '',
      `${cfg.supportServer}\u200b\u200b`,
    ];
    let i = 0;
    for (const file of funcFiles) {
      let column = clientRows[i]
      table.addRow(column, file.split('.js')[0], `${cfg.v}\u200b`);
      i++;
      if (i > clientRows.size) column = '';
    };

    table.addRow(`Client Ready!`, '', `${cfg.v}\u200b`);

    console.log(table.toString());
    console.log(chalk.bgYellow.bold('\n-----------------Client Started!-----------------\n'));

    // Server Stats
    const guilds = client.guilds.cache.map(g => g);
    console.log(chalk.magenta.bold(`Working in ${guilds.length} servers:`), guilds.map(g => g.name))
    guilds.forEach((guild) => {
      client.serverStats(client, guild.id);
      setInterval(() => { client.serverStats(client, guild.id) }, 5 * 60 * 1000);
    });
  }
}
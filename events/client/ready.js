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
    }, 1000 * 60 * 5);

    const table = new ascii()
      .setTitle(`Login Client & Load Functions`)
      .setHeading('Client', `Functions [${funcFiles.length}]`, '♻')

    table.addRow(`${client.user.tag}\u200b\u200b`, '', `${cfg.v}\u200b`);

    for (const file of funcFiles)
      table.addRow('', file.split('.js')[0], `${cfg.v}\u200b`);

    table.addRow(`Client Ready!`, '', `${cfg.v}\u200b`);

    console.log(table.toString());
    console.log(chalk.bgYellow('\n-----------------Client Started!-----------------\n'));

    // Server Stats
    client.serverStats(client);
    setInterval(() => { client.serverStats(client); }, 5 * 60 * 1000);
  }
}
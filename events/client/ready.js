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
      .setTitle(`Login Client`)
      .setHeading(`${client.user.tag}\u200b\u200b`, `${cfg.v}\u200b`)      
      .addRow(`Client Ready!          `, `${cfg.v}\u200b`)
    console.log(chalk.white(table.toString()))
    console.log(chalk.bgYellow('\n-----------------Client Started!-----------------\n'));
  }
}
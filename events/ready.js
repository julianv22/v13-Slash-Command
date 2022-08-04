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

    console.log(chalk.yellowBright(`\n.---------------------------.`));
    console.log(chalk.yellowBright(`|      `) + `Logging Client` + chalk.yellowBright(`       |`));
    console.log(chalk.yellowBright('|---------------------------|',));
    console.log(chalk.yellowBright(`| `) + client.user.tag + chalk.yellowBright(`       |`));
    console.log(chalk.yellowBright('|---------------------------|',));
    console.log(chalk.yellowBright(`| `) + chalk.green(`Client Ready!`) + chalk.yellowBright(`          ${cfg.v} |`));
    console.log(chalk.yellowBright(`'---------------------------'`));
    console.log(chalk.bgYellow('\n-----------------Client Started!-----------------\n'));
  }
}
const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.showError = async (message, stError, stHelp) => {
    try {
      const embError = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setThumbnail(cfg.errorPNG)
        .setColor('RED')
      if (!stHelp) {
        embError.setDescription(stError);
      } else {
        embError.setTitle('Error:');
        embError.addField(stError, stHelp);
      }

      message.reply({ embeds: [embError] });
    } catch (e) {
      console.error(chalk.yellow("showError: "), e);
    }
  }
}
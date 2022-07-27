const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.cmdGuide = async (message, cmdName, cmdDescription, cmdUssage, stFooter) => {
    try {
      const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setThumbnail(cfg.helpPNG)
        .setTitle(`Huớng dẫn sử dụng command [${cmdName}]`)
        .setDescription(`${cmdDescription}\n\n${cmdUssage}`)
        .setColor(cfg.embedcolor)
      if (stFooter) embed.setFooter(stFooter);

      message.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    };
  }
}
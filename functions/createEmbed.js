const { MessageEmbed } = require("discord.js");

function addFields(name, value, inline) {
  this.name = name;
  this.value = value;
  if (inline) {
    this.inline = false;
  } else {
    this.inline = true;
  }
}

module.exports = (client) => {
  client.createEmbed = async (message, args, sendMethod, msg) => {
    try {
      const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL(true))
        .setTitle(args[0])
        .setDescription(args[1])
        .setColor(cfg.embedcolor)
        .setTimestamp()
      if (args[2]) embed.setFooter(args[2], message.guild.iconURL(true));
      if (client.checkURL(args[3])) embed.setThumbnail(args[3]);
      if (client.checkURL(args[4])) embed.setImage(args[4]);
      if (args[5]) { // addFields
        const arrays = args[5].split(' # ');
        const fields = arrays.map(f => f.split(' ^ '));
        let objFields = [];
        for (const field of fields) {
          const f = new addFields(field[0], field[1], field[2]);
          objFields.push(f);
        };
        embed.addFields(objFields);
      };

      switch (sendMethod) {
        case "send":
          message.channel.send({ embeds: [embed] });
          break;
        case "edit":
          // message.reply('abc')
          message.edit({ embeds: [embed] });
          if (message.author.bot) return;
        case "reply":
          message.reply({ embeds: [embed] });
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }
}
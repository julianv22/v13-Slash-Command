const { MessageEmbed } = require("discord.js");

exports.name = "wow";
//exports.aliases = [""];
exports.description = "⤷😍 Wow!";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {

  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL(true))
    .setFooter("😍 Wow!")
    .setColor(cfg.embedcolor)
    .setImage("https://thumbs.gfycat.com/FavoriteBasicBadger-max-1mb.gif")
  message.delete().then(() => message.channel.send({ embeds: [embed] }));
}
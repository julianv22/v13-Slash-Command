const fetch = require('cross-fetch');
const { MessageEmbed } = require("discord.js")

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json();
    })
    .then(data => {
      return "❝ **" + data[0]["q"] + "** ❞\n\n- " + data[0]["a"] + " -";
    })
}

exports.name = "quote";
exports.aliases = ["qt"];
exports.category = "miscellaneous";
exports.description = `⤷Trích dẫn 1 câu trên [zenquotes](https://zenquotes.io)\n\nAlias: \`${exports.aliases}\``;
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);
  getQuote().then(quote => {
    const user = message.author
    const embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .setDescription(quote)
      .setColor(cfg.embedcolor)
      .setThumbnail(cfg.thumbnailURL)
      .setFooter(`Requested by ${user.username}`, user.displayAvatarURL(true))
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }).then(() => message.delete());
}
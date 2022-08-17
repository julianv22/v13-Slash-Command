const { MessageEmbed } = require('discord.js')

exports.name = "ping";
// exports.aliases = [""];
exports.category = "information";
exports.description = "⤷Ping Pong!";
exports.usage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);
  const ping = client.ws.ping;
  const delay = Date.now() - message.createdTimestamp;
  let color = 'RANDOM';

  if (ping < 101) color = 'GREEN'
  else if (ping > 100 && ping < 301) color = 'ORANGE'
  else color = 'RED'

  const embed = new MessageEmbed()
    .setColor(color)
    .setDescription(`**⏱ | Ping:** ${ping} / *${delay}ms*`)
  await message.reply({ embeds: [embed] });
}
const { MessageEmbed } = require("discord.js");

exports.name = "avatar";
exports.aliases = ["avt"];
exports.category = "information";
exports.description = `⤷Xem avatar của một người nào đó.\n\nAlias: \`${exports.aliases}\``;
exports.ussage = `\`${cfg.prefix}${exports.name} @tên thành viên\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);
  const user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;
  const username = user.username || user.user.username;
  const avtEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    //.setTitle('Avatar')
    .setDescription(`Avatar của ${user}`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL(true)
    });
  message.reply({ embeds: [avtEmbed] });
}
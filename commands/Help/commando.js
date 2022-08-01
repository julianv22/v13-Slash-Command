const { MessageEmbed } = require("discord.js");

exports.name = "commando";
exports.aliases = ["cmd"];
exports.description = `⤷**Danh sách Slash Command**\n\nAlias: \`${exports.aliases}\``;
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?')
    return client.cmdGuide(message, exports.name, exports.description, exports.ussage);
  
  const slashCmd = client.slashCommands.map(command => {
    return {
      name: command.data.name,
      value: `⤷${command.data.description}`,
      inline: true
    }
  })

  const user = message.author;
  const embed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL(true))
    .setTitle('Danh sách các Slash Command (/) hiện có:')
    .setDescription(`Tổng số command: [${slashCmd.length}]`)
    .setThumbnail('https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png')
    .addFields(slashCmd)
    .setFooter(message.guild.name, message.guild.iconURL(true))
    .setTimestamp()
  message.reply({ embeds: [embed] });
}
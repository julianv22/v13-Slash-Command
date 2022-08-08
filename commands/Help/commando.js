const { MessageEmbed } = require("discord.js");

exports.name = "commando";
exports.aliases = ["cmd"];
exports.category = "help";
exports.description = `⤷Danh sách Slash Command\n\nAlias: \`${exports.aliases}\``;
exports.usage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);

  let slashCmd = [];
  const cmdCategories = await client.slashCommands.map(cmd => cmd.category)
  const catFilter = await cmdCategories.filter((item, index) => cmdCategories.indexOf(item) === index)

  const user = message.author;
  const embed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL(true))
    .setTitle('Danh sách các Slash Command (/) hiện có:')
    .setDescription(`Tổng số command: [${cmdCategories.length}]`)
    .setThumbnail('https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png')
    .setFooter(message.guild.name, message.guild.iconURL(true))
    .setTimestamp()

  for (const cat of catFilter) {
    const commands = await client.slashCommands.map(cmd => cmd).filter(cmd => cmd.category === cat);
    embed.addField(`${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`, `\u200b`);
    slashCmd = commands.map(cmd => {
      return {
        name: cmd.data.name,
        value: `⤷${cmd.data.description}`,
        inline: true
      }
    });
    embed.addFields(slashCmd);
    continue;
  };
  message.reply({ embeds: [embed] });
}
const { MessageEmbed } = require("discord.js");

exports.name = "commando";
exports.aliases = ["cmd"];
exports.category = "help";
exports.description = `⤷Danh sách Slash Command\n\nAlias: \`${exports.aliases}\``;
exports.usage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");

  if (args.join(" ").trim() === "?")
    return client.cmdGuide(message, exports.name, exports.description, exports.usage);

  const cmdCategories = await client.slashCommands.map((cmd) => cmd.category);
  const catFilter = await cmdCategories.filter(
    (item, index) => cmdCategories.indexOf(item) === index
  );

  const user = message.author;
  const embed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL(true))
    .setTitle("Slash Command (/) List:")
    .addField(`Total comands: [${cmdCategories.length}]`, `\u200b`)
    .setFooter(message.guild.name, message.guild.iconURL(true))
    .setTimestamp()
    .setColor(cfg.embedcolor)
    .setDescription(`I you need some help, join my support server: [\`🦸〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
    .setThumbnail("https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png");

  for (const cat of catFilter) {
    const commands = await client.slashCommands
      .map((cmd) => cmd)
      .filter((cmd) => cmd.category === cat);
    const cmds = await commands
      .map((cmd) => {
        if (isAdmin) {
          return `⤷[${cmd.data.name}]⟶ ${cmd.data.description}`;
        } else {
          if (!cmd.data.description.includes(cfg.adminRole))
            return `⤷[${cmd.data.name}]⟶ ${cmd.data.description}`;
        }
      }).join("\n");

    embed.addField(
      `${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`,
      `\`\`\`${cmds}\`\`\``
    );
    continue;
  }
  message.reply({ embeds: [embed] });
};

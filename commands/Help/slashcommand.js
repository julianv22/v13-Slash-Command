const { MessageEmbed } = require("discord.js");
const { MessageReplyPagination } = require("djs-button-pages");

exports.name = "slashcommand";
exports.aliases = ["scmd"];
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

  let pages = [];
  catFilter.forEach((cat) => {
    const commands = client.slashCommands.map((cmd) => cmd).filter((cmd) => cmd.category === cat);

    const cmds = commands.map((cmd) => {
      if (isAdmin) {
        return { name: cmd.data.name, value: `⤷${cmd.data.description}`, inline: true };
      } else {
        if (!cmd.data.description.includes(cfg.adminRole))
          return { name: cmd.data.name, value: `⤷${cmd.data.description}`, inline: true };
      }
    });

    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL(true))
      .setTitle("Danh sách Slash Command (/)")
      .setDescription(`Nếu bạn cần hỗ trợ, hãy tham gia máy chủ hỗ trợ: [\`🦸〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
      .setThumbnail("https://cdn.discordapp.com/attachments/976364997066231828/1001524699941064745/slash.png")
      .setColor("AQUA")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL(true))
      .addField(`${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`, `\u200b`)
      .addFields(cmds.filter((cmd) => cmd != undefined))

    pages.push(embed);
  });

  client.djsButtonPages(pages, MessageReplyPagination, message);
};

const { MessageEmbed } = require("discord.js");
const { MessageReplyPagination } = require("djs-button-pages");

exports.name = "listcommand";
exports.aliases = ["listcmd"];
exports.description = "⤷Hiển thị danh sách command theo thư mục";
exports.category = "help";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");

  if (args.join(" ").trim() === "?")
    return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  const cmdCategories = await client.commands.map((cmd) => cmd.category);
  const catFilter = await cmdCategories.filter(
    (item, index) => cmdCategories.indexOf(item) === index
  );

  let pages = [];
  catFilter.forEach((cat) => {
    const commands = client.commands.map((cmd) => cmd).filter((cmd) => cmd.category === cat);

    const cmds = commands.map((cmd) => {
      if (isAdmin) {
        return { name: cmd.name, value: cmd.description, inline: true };
      } else {
        if (!cmd.description.includes(cfg.adminRole))
          return { name: cmd.name, value: cmd.description, inline: true };
      }
    });

    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL(true))
      .setTitle("Danh sách các command:")
      .setDescription(`Nếu bạn cần hỗ trợ, hãy tham gia máy chủ hỗ trợ: [\`🦸〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
      .setColor("AQUA")
      .setThumbnail(cfg.helpPNG)
      .setFooter(message.guild.name, message.guild.iconURL(true))
      .setTimestamp()
      .addField(
        `${cfg.folder} ${cat.toUpperCase()} [${commands.length}]`,
        `Command prefix: \`${cfg.prefix}\``)
      .addFields(cmds.filter((cmd) => cmd != undefined))
      .addField(`\u200b`, `\`${cfg.prefix}[tên command] ?\` để xem hướng dẫn chi tiết của command`);

    pages.push(embed);
  });

  client.djsButtonPages(pages, MessageReplyPagination, message);
};

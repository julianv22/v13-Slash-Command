const { MessageEmbed } = require("discord.js");
const fs = require('fs');

exports.name = "help";
exports.aliases = ["h"];
exports.description = "⤷\`Đọc kỹ hướng dẫn SD trước khi dùng!\`";
exports.ussage = `Sử dụng \`${cfg.prefix}${exports.name}\` để xem danh sách các command.\n
\`${cfg.prefix}[tên command] ?\` để xem hướng dẫn chi tiết của command đó.\n
${exports.description}`;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);
  const user = message.author;
  let cmds = [];
  for (const folder of cmdFolders) {
    const cmdFiles = await fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
    const cmd = cmdFiles.map(name => name.split('.js')[0])
    cmds.push({
      name: `${cfg.folder} ${folder.toUpperCase()} [${cmdFiles.length}]`,
      value: `\`\`\`${cmd.join(' | ')}\`\`\``
    })
  }

  const embed = new MessageEmbed()
    .setAuthor(`Xin chào ${user.username}!`, user.displayAvatarURL(true))
    .setTitle('Dưới đây là một số command bạn có thể sử dụng')
    .setDescription(`Nếu bạn cần hỗ trợ, hãy tham gia máy chủ hỗ trợ: [\`🦸〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)`)
    .setColor("RANDOM")
    .setThumbnail(cfg.helpPNG)
    .addField(`Tổng số command: [${client.commands.size}]`, `\u200b\nCommand prefix: \`${cfg.prefix}\``)
    .addFields(cmds)
    .addField(`\u200b`, `\`${cfg.prefix}[tên command] ?\` để xem hướng dẫn chi tiết của command`)
    .setFooter(message.guild.name, message.guild.iconURL(true))
    .setTimestamp()
  message.delete().then(() => message.channel.send({ embeds: [embed] }));
}
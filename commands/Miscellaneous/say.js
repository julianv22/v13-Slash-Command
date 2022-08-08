exports.name = "say";
// exports.aliases = ["cmd"];
exports.category = "miscellaneous";
exports.description = "⤷🗣️ Bot chat";
exports.usage = `\`${cfg.prefix}${exports.name} [Nội dung]\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);

  let toSay = args.join(' ');
  if (!toSay) return message.reply(`\`\`\`Nhập nội dung bạn muốn nói!\`\`\``)
  message.delete().then(() => message.channel.send(toSay));
}
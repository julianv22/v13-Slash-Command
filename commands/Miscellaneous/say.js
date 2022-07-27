exports.name = "say";
// exports.aliases = ["cmd"]
exports.description = "⤷🗣️ Bot chat";
exports.ussage = `\`${cfg.prefix}${exports.name} [Nội dung]\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  let toSay = args.join(' ');
  if (!toSay) return message.reply(`\`\`\`Nhập nội dung bạn muốn nói!\`\`\``)
  message.delete().then(() => message.channel.send(toSay));
}
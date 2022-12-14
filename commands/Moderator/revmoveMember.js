exports.name = "revmovemember";
exports.aliases = ["rmv"];
exports.category = "moderator";
exports.description = `⤷\`${cfg.prefix}${exports.name}\`\n
Alias: \`${exports.aliases}\``;
exports.usage = "";

exports.execute = async (message, args, client) => {
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");
  if (!isAdmin) return message.reply(`\`\`\`${cfg.x} | Bạn không phải ${cfg.adminRole} để sử dụng command này!\`\`\``);

  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);
  client.emit('guildMemberRemove', message.member);
}
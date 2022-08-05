const { MessageEmbed } = require("discord.js")

exports.name = "link";
exports.aliases = ["invite"];
exports.category = "information";
exports.description = `⤷Link 🔞\n\nAlias: \`${exports.aliases}\``;
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.ussage);

  const imgURL = "https://media.discordapp.net/attachments/976364997066231828/997976998527914124/Header.png";
  const stArr = [
    'Link',
    'Dưới dây là các liên kết bạn có thể cần',
    `${client.user.username} is working in [${client.guilds.cache.size.toLocaleString()}] servers`,
    message.guild.iconURL(true),
    imgURL,
    `Server hỗ trợ ^ [${cfg.supportServer} Server](https://discord.gg/dyd8DXbrVq) # Link mời ^ [Invite me (recommended)](${cfg.inviteLink})\n\n[Invite me (admin)](https://shorturl.ae/WnzIo) # Chủ sở hữu ^ [YouTube](${cfg.youtube})`
  ];
  message.channel.send('Owner Discord: https://discord.gg/24GPY9CmY4')
    .then(msg => {
      msg.edit({ embeds: client.genEmbed(message, stArr) });
    });
}
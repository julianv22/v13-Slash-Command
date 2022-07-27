const { MessageEmbed } = require("discord.js")

exports.name = "embed";
exports.aliases = ["em"];
exports.description = `**Tạo Embed message.**\n⤷Alias: \`${exports.aliases}\``;
exports.ussage = "";

exports.execute = async (message, args, client) => {
  const isMod = message.member.permissions.has("MANAGE_MESSAGES");
  if (!isMod)
    return message.reply(`\`\`\`${cfg.x} | Bạn không phải ${cfg.modRole} để sử dụng command này!\`\`\``);

  const user = message.author;
  const emHelp = new MessageEmbed()
    .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
    .setColor('RANDOM')
    .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
    .setAuthor(message.guild.name, message.guild.iconURL(true))
    .addFields(
      { name: `\u200b`, value: exports.description },
      { name: 'Tạo embed cơ bản', value: `\`${cfg.prefix}${exports.name} Title | Description\`` },
      {
        name: 'Tạo embed nâng cao',
        value: `\`${cfg.prefix}${exports.name} Title | Description | Footer | ThumbnailURL | ImageURL \`
\n**Tham số:**`
      },
      { name: 'Title', value: 'Tiêu đề', inline: true },
      { name: 'Description', value: 'Nội dung', inline: true },
      { name: 'Footer', value: 'Phần cuối embed *(có thể bỏ trống)*', inline: true },
      { name: 'ThumbnailURL', value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*' },
      { name: 'ImageURL', value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*' },
    )
    .setFooter('Super Embed: Field 1 ^ Value 1 # Field 2 ^ Value 2 # Field 3 ^ Value 3... ')

  let embed = args.join(' ').split(' | ');
  if (embed[0] === '?') return message.reply({ embeds: [emHelp] }); //Embed's Help 

  if (!embed[0] || !embed[1]) return client.showError(
    message,
    'Command chưa chính xác!',
    `\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung\`
\n\`${cfg.prefix}${exports.name} ?\` để xem hướng dẫn cụ thể`
  );
  message.delete().then(() => client.createEmbed(message, embed, 'send'));
}
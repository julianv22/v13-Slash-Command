const serverThanks = require('../../mongodb/thanksProfile');
const { MessageEmbed } = require("discord.js");
const moment = require('moment-timezone');

exports.name = "thanks";
exports.aliases = ["ty"];
exports.category = "miscellaneous";
exports.cooldown = 30;
exports.description = `⤷Gửi lời cảm ơn.\n\nAlias: \`${exports.aliases}\``;
exports.usage = `\`${cfg.prefix}${exports.name} @tên thành viên\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.description, exports.usage);

  const imgURL = [
    "https://cdn.discordapp.com/attachments/976364997066231828/987822146279587850/unknown.png",
    "https://media.discordapp.net/attachments/976364997066231828/988317420106174484/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988317854610907136/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318049616670740/unknown.png",
    "https://media.discordapp.net/attachments/976364997066231828/988318184018960464/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318415037005904/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318803664445530/unknown.png",
    "https://www.ketoan.vn/wp-content/uploads/2020/12/thank.jpg",
    "https://img.freepik.com/free-vector/thank-you-neon-sign-design-template-neon-sign_77399-331.jpg",
    "https://i.pinimg.com/originals/7b/d9/46/7bd946c65b8aa3654236e6f5cb7fa0fd.gif",
    "https://2.bp.blogspot.com/-83klB_SGIfA/VpyvOosaHyI/AAAAAAAASJI/ol3l6ADeLc0/s1600/Hinh-anh-cam-on-thank-you-dep-nhat-Ohaylam.com-%25283%2529.jpg",
    "https://png.pngtree.com/thumb_back/fw800/background/20201020/pngtree-rose-thank-you-background-image_425104.jpg",
  ];

  const user = message.author;
  const member = message.mentions.members.first();
  if (!member)
    return message.reply(`\`\`\`❌ | Bạn phải @ một ai đó!\`\`\``);

  if (member.user.bot)
    return message.reply(`\`\`\`❌ | Bot không cần cảm ơn 😝!\`\`\``);

  if (member.id === message.author.id)
    return message.reply(`\`\`\`❌ | Bạn không thể cảm ơn chính mình 😅!\`\`\``);

  // Finde thanksCount 
  const dateNow = moment(Date.now()).tz('Asia/Ho_Chi_Minh').format("HH:mm, dddd - DD/MM/YYYY")
  
  const thanksCount = await serverThanks.findOne({ guildID: message.guild.id, userID: member.id });  
  if (!thanksCount) {
    let createOne = await serverThanks.create({
      guildID: message.guild.id,
      guildName: message.guild.name,
      userID: member.id,
      usertag: member.user.tag,
      count: 1,
      lastThanks: dateNow
    });
    createOne.save()
  }
  let lastThanks;
  if (thanksCount?.lastThanks) lastThanks = thanksCount?.lastThanks
  else lastThanks = dateNow

  const embed = new MessageEmbed()
    .setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(true)
    })
    .setTitle("💖 | Special thanks!")
    .setDescription(`${user} đã gửi lời cảm ơn tới ${member}!`)
    .addField(`Số lần được cảm ơn: [${thanksCount?.count + 1 || 1}]`, `\u200b`, true)
    .addField('Lần cuối được cảm ơn:', lastThanks, true)
    .setFooter({
      text: `Sử dụng ${cfg.prefix}${exports.name} | ${cfg.prefix}${exports.aliases} để cảm ơn người khác`,
      iconURL: message.guild.iconURL(true)
    })
    .setTimestamp()
    .setColor(cfg.embedcolor)
    .setImage(`${imgURL[Math.floor(Math.random() * imgURL.length)]}`)
  message.reply({ embeds: [embed] });
  // Update thanksCount
  await serverThanks.findOneAndUpdate(
    {
      guildID: message.guild.id,
      userID: member.id
    },
    {
      guildName: message.guild.name,
      usertag: member.user.tag,
      count: thanksCount?.count + 1 || 1,
      lastThanks: dateNow,
    });
}
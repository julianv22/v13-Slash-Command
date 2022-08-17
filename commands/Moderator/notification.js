const serverProfile = require('../../mongodb/serverProfile');
const { MessageEmbed } = require("discord.js");

exports.name = "notification";
exports.aliases = ["update", "tb"];
exports.category = "moderator";
exports.description = `⤷${cfg.adminRole} only
\nAlias: \`${exports.aliases}\``;
exports.usage = `**Gửi thông báo lên channel thông báo:**
\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung thông báo\`\n
**Set channel thông báo:**
\`${cfg.prefix}${exports.name} set [Channel ID]\``;

exports.execute = async (message, args, client) => {
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");
  if (!isAdmin)
    return message.reply(`\`\`\`${cfg.x} | Bạn không phải ${cfg.adminRole} để sử dụng command này!\`\`\``);

  const stArgs = args.join(' ').split(' ');
  let channelProfile = await serverProfile.findOne({ guildID: message.guild.id });
  if (!channelProfile) {
    let createOne = await serverProfile.create(
      { guildID: message.guild.id, guildName: message.guild.name, });
    createOne.save();
  }

  let rpChannel = await client.channels.cache.get(channelProfile?.updateChannel);

  if (stArgs[0] === '?' && isAdmin) return client.cmdGuide(
    message,
    exports.name,
    exports.description,
    exports.usage + `\n\n**Channel gửi thông báo:** ${rpChannel}`,
    'Tuỳ chọn: Title | Description | Thumbnail (1/0) | Footer (Send by...)'
  );

  if (stArgs[0] === 'set') { //Set Channel         
    const setChannel = await client.channels.cache.get(stArgs[1] || message.channel.id);
    if (setChannel === undefined) { //Check Channel ID
      message.reply(`\`\`\`${cfg.x} | ID channel không đúng hoặc chưa chính xác\`\`\``);
    } else {
      //Set Channel ID
      await serverProfile.findOneAndUpdate(
        { guildID: message.guild.id },
        {
          guildName: message.guild.name,
          updateChannel: stArgs[1] || message.channel.id
        });
      message.reply(`${cfg.v} | Channel thông báo đã được đặt thành ${setChannel}`);
    }
    return;
  }

  if (!channelProfile?.updateChannel) return client.showError(
    message,
    'Chưa setup channel thông báo!',
    `\`${cfg.prefix}${exports.name} set [Channel ID]\` để setup`
  );
  if (rpChannel === undefined) return client.showError(
    message,
    'Channel gửi thông báo không tồn tại hoặc đã bị thay đổi!',
    `Hãy setup lại channel thông báo bằng command \`${cfg.prefix}${exports.name} set\``
  );
  //Check Suggest Content
  const emArgs = args.join(' ').split(' | ');
  if (!emArgs[0] || !emArgs[1]) {
    return client.showError(
      message,
      'Nội dung thông báo không thể bỏ trống!',
      `\`${cfg.prefix}${exports.name} Tiêu đề thông báo | Nội dung thông báo\``
    );
  } else { //Create Embed Message
    const thumbnailURL = ["https://ioc.thuathienhue.gov.vn/uploadfiles/TinTuc/2021/6/21/thongbao1.jpg", "https://blognhansu.net.vn/wp-content/uploads/2017/01/update-tai-lieu.jpg"];
    const user = message.author;
    const em = new MessageEmbed()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL(true) })
      .setTitle(emArgs[0])
      .setDescription(emArgs[1])
      .setTimestamp()
      .setColor("RED")
      .setThumbnail(thumbnailURL[emArgs[2] || 0])
      .setFooter(`Send by ${emArgs[3] || user.username}`, user.displayAvatarURL(true))
    message.delete();
    //Report Channel
    rpChannel = await client.channels.cache.get(channelProfile?.updateChannel);
    await rpChannel.send({ embeds: [em] });
  }
}
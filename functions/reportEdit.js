const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.reportEdit = async (message, user, msgID, msgURL, rpChannel, content) => {
    try {
      const emReport = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setTitle(`${user} đã sửa tin nhắn`)
        .setDescription(`**Message ID:** \`${msgID}\` | **URL:** [[Jump link](${msgURL})]`)
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/memo_1f4dd.png')
        .setColor(cfg.embedcolor)
        .addField('Nội dung edit:', content)
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL(true))

      if (!rpChannel) {
        message.channel.send({ embeds: [emReport] });
      } else {
        rpChannel.send({ embeds: [emReport] });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
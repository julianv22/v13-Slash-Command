const serverProfile = require("../../mongodb/serverProfile");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    try {
      const stLeave = `${member.user} left the server`;
      let profile = await serverProfile.findOne({ guildID: member.guild.id });
      if (!profile || !profile?.logChannel)
        return console.log(chalk.red("No Channel Set"));

      const logID = profile.logChannel;
      const emLog = new MessageEmbed()
        .setAuthor(member.guild.name, member.guild.iconURL(true))
        .setTitle("Member left")
        .setDescription(`${member.user} đã rời khỏi server!`)
        .setThumbnail(
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/name-badge_1f4db.png"
        )
        .setTimestamp()
        .addFields(
          { name: "UserName:", value: member.user.tag, inline: true },
          { name: "UserID:", value: member.user.id, inline: true }
        );
      await member.guild.channels.cache.get(logID).send({ embeds: [emLog] });

      console.log(chalk.yellow(member.user.tag + " left the server"));
    } catch (error) {
      console.error(error);
    }
  },
};

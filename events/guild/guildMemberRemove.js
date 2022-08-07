const serverProfile = require("../../mongodb/serverProfile");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(message, member, client) {
    try {
      const stLeave = `${member.user} left the server`;
      let profile = await serverProfile.findOne({ guildID: message.guild.id });
      if (!profile || !profile?.logChannel)
        return console.log(chalk.red("No Channel Set"));

      const logID = profile.logChannel;
      const emLog = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setTitle("Member left")
        .setDescription(`${member.user} left the server!`)
        .addFields(
          { name: "UserName:", value: member.user.username, inline: true },
          { name: "UserID:", value: member.user.id, inline: true },
        );
      await message.guild.channels.cache.get(logID).send({ embeds: [emLog] });

      console.log(chalk.yellow(member.user.tag + " left the server"));
    } catch (error) {
      console.error(error);
    }
  },
};

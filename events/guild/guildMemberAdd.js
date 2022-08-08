const { MessageEmbed } = require("discord.js");
const serverProfile = require("../../mongodb/serverProfile");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    try {
      let profile = await serverProfile.findOne({ guildID: member.guild.id });
      if (!profile || !profile?.welomeChannel || !profile?.logChannel)
        return console.log(chalk.red("No Channel Set"));

      const welcomeID = profile.welomeChannel;
      const logID = profile.logChannel;

      const embWelcome = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(true))
        .setTitle("Welcome 👋")
        .setDescription(
          `Chào mừng ${member.user} tham gia server **${member.guild.name}!**  😍`
        )
        .addField(
          `Bạn là thành viên thứ ${member.guild.memberCount} của server`,
          "Chúc bạn một ngày làm việc vui vẻ!"
        )
        .setColor("#00BCE3")
        .setThumbnail(member.user.displayAvatarURL(true))
        .setImage("https://www.freeiconspng.com/uploads/welcome-png-3.png")
        .setFooter(member.guild.name, member.guild.iconURL(true))
        .setTimestamp();
      if (profile?.welomeMessage)
        embWelcome.addField(`Server's Information:`, profile?.welomeMessage);

      await member.guild.channels.cache
        .get(welcomeID)
        .send({ embeds: [embWelcome] });

      const emLog = new MessageEmbed()
        .setAuthor(member.guild.name, member.guild.iconURL(true))
        .setTitle("New member join")
        .setDescription(`${member.user} đã tham gia server!`)
        .setColor("#00BCE3")
        .setThumbnail(
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/new-button_1f195.png"
        )
        .setTimestamp()
        .addFields(
          { name: "UserName:", value: member.user.tag, inline: true },
          { name: "UserID:", value: member.user.id, inline: true },
          {
            name: "Created at:",
            value: `${moment(member.createdAt).format(
              "dddd, MMMM Do YYYY, HH:mm"
            )}`,
          }
        );

      await member.guild.channels.cache.get(logID).send({ embeds: [emLog] });

      console.log(chalk.yellow(member.user.tag + " joined the server"));
    } catch (error) {
      console.error(error);
    }
  },
};

const { MessageEmbed } = require("discord.js");
const serverProfile = require("../../mongodb/serverProfile");

module.exports = {
  name: "guildMemberAdd",
  async execute(message, member, client) {
    try {
      let profile = await serverProfile.findOne({ guildID: message.guild.id });
      if (!profile || !profile?.welomeChannel || !profile?.logChannel)
        return console.log(chalk.red("No Channel Set"));

      const stWelcome = `${member.user} joined the server`;
      const welcomeID = profile.welomeChannel;
      const logID = profile.logChannel;

      const embWelcome = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(true))
        .setTitle("Welcome 👋")
        .setDescription(
          `Chào mừng ${member.user} tham gia server **${message.guild.name}!**  😍`
        )
        .addField(
          `Bạn là thành viên thứ ${message.guild.memberCount} của server`,
          "Chúc bạn một ngày làm việc vui vẻ!"
        )
        .setColor("#00BCE3")
        .setThumbnail(member.user.displayAvatarURL(true))
        .setImage("https://www.freeiconspng.com/uploads/welcome-png-3.png")
        .setFooter(message.guild.name, message.guild.iconURL(true))
        .setTimestamp();
      if (profile?.welomeMessage)
        embWelcome.addField(`Server's Information:`, profile?.welomeMessage);

      // await message.guild.channels.cache.get(welcomeID).send({ embeds: [embWelcome] });

      const emLog = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setTitle("New member join")
        .setDescription(`${member.user} joined the server!`)
        .setColor("#00BCE3")
        .addFields(
          { name: "UserName:", value: member.user.username, inline: true },
          { name: "UserID:", value: member.user.id, inline: true },
          {
            name: "Joined at:",
            value: `${moment(member.joinedAt).format(
              "dddd, MMMM Do YYYY, HH:mm"
            )}`,
          },
          {
            name: "Created at:",
            value: `${moment(member.createdAt).format(
              "dddd, MMMM Do YYYY, HH:mm"
            )}`,
            inline: true,
          }
        );

      // await message.guild.channels.cache.get(logID).send({ embeds: [emLog] });

      console.log(chalk.yellow(member.user.tag + " joined the server"));
    } catch (error) {
      console.error(error);
    }
  },
};

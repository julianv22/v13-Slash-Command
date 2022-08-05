const { MessageEmbed } = require("discord.js");
const serverProfile = require(`../../mongodb/serverProfile`);

module.exports = {
  name: 'guildMemberAdd',
  async execute(message, member, client) {
    try {
      let profile = await serverProfile.findOne({ guildID: message.guild.id });
      if (!profile || !profile?.welomeChannel || !profile?.logChannel)
        return console.log(chalk.red('No Channel Set'));

      const stWelcome = `${member.user} joined the server`
      const welcomeID = profile.welomeChannel;
      const logID = profile.logChannel
      const embWelcome = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL(true))
        .setTitle('Welcome 👋')
        .setDescription(`Chào mừng ${member.user} tham gia server ${message.guild.name}! 😍`)
        .addField(`Bạn là thành viên thứ ${message.guild.memberCount} của server`, `Server map: [Click here](https://discord.com/channels/954736697453731850/954737311843770440/986348167748526090)`)
        .setThumbnail(member.user.displayAvatarURL(true))
        .setFooter(message.guild.name, message.guild.iconURL(true))
        .setTimestamp()

      message.guild.channels.cache.get(welcomeID).send({ embeds: [embWelcome] });
      message.guild.channels.cache.get(logID).send(stWelcome);

      console.log(stWelcome);
    } catch (error) {
      console.error(error);
    };
  }
}
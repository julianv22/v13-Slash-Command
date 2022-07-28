module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    try {
      const stWelcome = `${member.user.tag} joined the server`
      // member.guild.channels.cache.get(welcomeID).send(stWelcome);
      // member.guild.channels.cache.get(logID).send(stWelcome);
      console.log(stWelcome);
    } catch (error) {
      console.error(error);
    };
  }
}
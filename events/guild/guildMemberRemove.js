module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        try {
            const stLeft = `${member.user.tag} left the server`;
            // const welcomeID = '995770225561702563';
            // const logID = '997218702439239720';
            // member.guild.channels.cache.get(logID).send(stLeave);
            console.log(stLeft);
        } catch (error) {
            console.error(error);
        };
    }
}
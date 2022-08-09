module.exports = (client) => {
  client.serverStats = async (client) => {
    try {
      // Start Server Stats    
      const guild = client.guilds.cache.get(cfg.guildID);

      const total_channelID = "985984256335548436";

      const member_ChannelID = "985985130487242772";
      const memberCount = await guild.members.cache.filter((m) => !m.user.bot).size;
      const memberRole = await guild.roles.cache.get("976369534036504607").name;

      const streamer_ChannelID = "985982838694367232";
      const streamerRole = await guild.roles.cache.get("976433295787196456").name;
      const streamerCount = await guild.roles.cache
        .get("976433295787196456").members.map((m) => m.user).length;

      const gamer_ChannelID = "985983242261913682";
      const gamerRole = await guild.roles.cache.get("977074203318698015").name;
      const gamerCount = await guild.roles.cache
        .get("977074203318698015").members.map((m) => m.user).length;

      const bot_ChannelID = "987615880752017459";
      const botCount = await guild.members.cache.filter((m) => m.user.bot).size;
      const botRole = await guild.roles.cache.get("978813215934922752").name;

      // Set name
      guild.channels.cache.get(total_channelID).setName(`👥 Total members: ${guild.memberCount}`);
      guild.channels.cache.get(member_ChannelID).setName(`${memberRole}: ${memberCount}`);
      guild.channels.cache.get(streamer_ChannelID).setName(`${streamerRole}: ${streamerCount}`);
      guild.channels.cache.get(gamer_ChannelID).setName(`${gamerRole}: ${gamerCount}`);
      guild.channels.cache.get(bot_ChannelID).setName(`${botRole}: ${botCount}`);

      // Set Status
      const status_ChannelID = "1006434101873618944";
      const stStatus = `🟢 ${guild.members.cache.filter((m) => m.presence?.status === "online").size
        } 🌙 ${guild.members.cache.filter((m) => m.presence?.status === "idle").size
        } ⛔ ${guild.members.cache.filter((m) => m.presence?.status === "dnd").size
        } ⚫ ${guild.members.cache.filter((m) => m.presence?.status === "offline").size
        }`;

      guild.channels.cache.get(status_ChannelID).setName(stStatus);
      // End Server Stats
    } catch (e) {
      console.error(e);
    }
  }
}

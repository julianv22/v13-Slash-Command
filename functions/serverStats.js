module.exports = (client) => {
  client.serverStats = async (client) => {
    try {
      // Start Server Stats    
      const guild = client.guilds.cache.get(cfg.guildID);

      const total_channelID = "985984256335548436";

      const memberStatsID = "985985130487242772";
      const memberCount = await guild.members.cache.filter((m) => !m.user.bot).size.toLocaleString();
      const memberRole = await guild.roles.cache.get("976369534036504607").name;

      const streamerStatsID = "985982838694367232";
      const streamerRole = await guild.roles.cache.get("976433295787196456").name;
      const streamerCount = await guild.roles.cache
        .get("976433295787196456").members.map((m) => m.user).length.toLocaleString();

      const gamerStatsID = "985983242261913682";
      const gamerRole = await guild.roles.cache.get("977074203318698015").name;
      const gamerCount = await guild.roles.cache
        .get("977074203318698015").members.map((m) => m.user).length.toLocaleString();

      const botStatsID = "987615880752017459";
      const botCount = await guild.members.cache.filter((m) => m.user.bot).size.toLocaleString();
      const botRole = await guild.roles.cache.get("978813215934922752").name;
      // Set Channel Name
      function setChannelName(id, name) {
        guild.channels.cache.get(id).setName(name);
      };

      const statsChannels = [
        { id: total_channelID, name: `👥 Total members: ${guild.memberCount}` },
        { id: memberStatsID, name: `${memberRole}: ${memberCount}` },
        { id: streamerStatsID, name: `${streamerRole}: ${streamerCount}` },
        { id: gamerStatsID, name: `${gamerRole}: ${gamerCount}` },
        { id: botStatsID, name: `${botRole}: ${botCount}` },
      ];

      statsChannels.forEach(channel => {
        setChannelName(channel.id, channel.name);
      });
      // Set Status Channel
      const status_ChannelID = "1006434101873618944";

      function getPresence(stats) {
        return guild.members.cache
          .filter((m) => m.presence?.status === stats)
          .size.toLocaleString();
      };

      const stStatus =
        `🟢 ${getPresence("online")} ` +
        `🌙 ${getPresence("idle")} ` +
        `⛔ ${getPresence("dnd")} ` +
        `⚫ ${getPresence("offline")}`;

      setChannelName(status_ChannelID, stStatus);
      // End Server Stats
    } catch (e) {
      console.error(e);
    }
  }
}

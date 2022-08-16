const serverProfile = require("../mongodb/serverProfile");

module.exports = (client) => {
  client.serverStats = async (client, guildID) => {
    try {
      // Start Server Stats
      const guild = client.guilds.cache.get(guildID);

      let profile = await serverProfile.findOne({ guildID: guild.id });
      if (!profile) {
        let createOne = await serverProfile.create({ guildID: guild.id, guildName: guild.name });
        createOne.save();
      }
      if (!profile?.totalChannel || !profile?.statsChannel) return;

      const memberRole = await guild.roles.cache.get(profile?.memberRole).name;
      const memberCount = await guild.members.cache
        .filter((m) => !m.user.bot).size.toLocaleString();

      const botRole = await guild.roles.cache.get(profile?.botRole).name;
      const botCount = await guild.members.cache.filter((m) => m.user.bot).size.toLocaleString();

      // Set Channel Name
      function setChannelName(id, name) {
        guild.channels.cache.get(id).setName(name);
      };

      const statsChannels = [
        { id: profile?.totalChannel, name: `👥 Total members: ${guild.memberCount.toLocaleString()}` },
        { id: profile?.membersChannel, name: `${memberRole}: ${memberCount}` },
        { id: profile?.botsChannel, name: `${botRole}: ${botCount}` },
      ];

      if (guild.id === cfg.guildID) {
        const streamersCountID = "985982838694367232";
        const streamerRole = await guild.roles.cache.get("976433295787196456").name;
        const streamerCount = await guild.roles.cache
          .get("976433295787196456").members.map((m) => m.user).length.toLocaleString();
        statsChannels.push({ id: streamersCountID, name: `${streamerRole}: ${streamerCount}` })

        const gamersCountID = "985983242261913682";
        const gamerRole = await guild.roles.cache.get("977074203318698015").name;
        const gamerCount = await guild.roles.cache
          .get("977074203318698015").members.map((m) => m.user).length.toLocaleString();
        statsChannels.push({ id: gamersCountID, name: `${gamerRole}: ${gamerCount}` })
      }

      statsChannels.forEach((channel) => {
        setChannelName(channel.id, channel.name);
      });
      // Set Status Channel
      function getPressence(stats) {
        return guild.members.cache
          .filter((m) => m.presence?.status === stats).size.toLocaleString();
      }

      const stStatus =
        `🟢 ${getPressence("online")} ` +
        `🌙 ${getPressence("idle")} ` +
        `⛔ ${getPressence("dnd")} ` +
        `⚫ ${getPressence("offline")}`;

      setChannelName(profile?.statsChannel, stStatus);
      // console.log(chalk.red(guild.name), statsChannels);
      // console.log("Presences Count: {", stStatus + " }");
      // End Server Stats
    } catch (e) {
      console.error(chalk.yellow("serverStats"), e);
    }
  };
};

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
      };
      if (!profile?.totalChannel || !profile?.statsChannel) return;
      // Set Channel Name
      function setChannelName(id, name) {
        guild.channels.cache.get(id).setName(name);
      };

      const memberRole = await guild.roles.cache.get(profile?.memberRole);
      const memberCount = //await guild.members.cache.filter(m => !m.user.bot).size.toLocaleString();
        await memberRole.members.map((m) => m.user).length.toLocaleString();


      const botRole = await guild.roles.cache.get(profile?.botRole).name;
      const botCount = await guild.members.cache.filter(m => m.user.bot).size.toLocaleString();

      const statsChannels = [
        { id: profile?.totalChannel, name: `👥 Total members: ${guild.memberCount.toLocaleString()}` },
        { id: profile?.membersChannel, name: `${memberRole.name}: ${memberCount}` },
        { id: profile?.botsChannel, name: `${botRole}: ${botCount}` },
      ];

      if (guild.id === cfg.guildID) {
        const streamersChannel = "985982838694367232";
        const streamerRole = await guild.roles.cache.get("976433295787196456");
        const streamerCount = await streamerRole.members.map(m => m.user).length.toLocaleString();
        statsChannels.push({ id: streamersChannel, name: `${streamerRole.name}: ${streamerCount}` })

        const gamersChannel = "985983242261913682";
        const gamerRole = await guild.roles.cache.get("977074203318698015");
        const gamerCount = await gamerRole.members.map(m => m.user).length.toLocaleString();
        statsChannels.push({ id: gamersChannel, name: `${gamerRole.name}: ${gamerCount}` })
      };

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
      // End Server Stats
    } catch (e) {
      console.error(chalk.yellow("serverStats"), e);
    }
  };
};

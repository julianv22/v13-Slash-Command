const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const serverProfile = require("../../mongodb/serverProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription(`Setup welcome channel!\n${cfg.adminRole} only`)
    .addSubcommand((sub) =>
      sub
        .setName("setup")
        .setDescription("Setup Welcome Channel and Log Channel")
        .addChannelOption((opt) =>
          opt
            .setName("welcome")
            .setDescription("Welcome Channel")
            .setRequired(true)
        )
        .addChannelOption((opt) =>
          opt.setName("log").setDescription("Log Channel").setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("info").setDescription("Show Welcome's setup information")
    )
    .addSubcommand((sub) =>
      sub
        .setName("message")
        .setDescription("Set welcome message")
        .addStringOption((opt) =>
          opt.setName("message").setDescription("Input your welcome message")
        )
    )
    .setDefaultMemberPermissions(8),
  category: "moderator",
  async execute(interaction, client) {
    let profile = await serverProfile.findOne({
      guildID: interaction.guild.id,
    });
    if (!profile) {
      let createOne = await serverProfile.create({
        guildID: interaction.guild.id,
        guildName: interaction.guild.name,
      });
      createOne.save();
    }

    const guild = interaction.guild;
    const user = interaction.user;
    let info = [];

    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL(true))
      .setTitle(`Welcome's setup information`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL(true));

    switch (interaction.options.getSubcommand()) {
      case "setup":
        const welcomeChannel = await client.channels.cache.get(
          interaction.options.getChannel("welcome").id
        );
        const logChannel = await client.channels.cache.get(
          interaction.options.getChannel("log").id
        );

        await serverProfile.findOneAndUpdate(
          {
            guildID: guild.id,
          },
          {
            guildName: guild.name,
            welomeChannel: interaction.options.getChannel("welcome").id,
            logChannel: interaction.options.getChannel("log").id,
          }
        );

        info = [
          {
            name: "Welcome channel:",
            value: welcomeChannel.toString(),
            inline: true,
          },
          {
            name: "Log channel:",
            value: logChannel.toString(),
            inline: true,
          },
        ];
        embed.addFields(info);
        interaction.reply({ embeds: [embed], ephemeral: true });
        break;
      case "info":
        const welcomeInfo = await client.channels.cache.get(
          profile?.welomeChannel
        );
        const logInfo = await client.channels.cache.get(profile?.logChannel);
        const msgInfo = profile?.welomeMessage;

        const fieldValues = [];
        if (welcomeInfo) fieldValues.push(welcomeInfo.toString());
        else fieldValues.push(" Channel not set");

        if (logInfo) fieldValues.push(logInfo.toString());
        else fieldValues.push("Channel not set");

        info = [
          {
            name: "Welcome channel:",
            value: fieldValues[0],
            inline: true,
          },
          {
            name: "Log channel:",
            value: fieldValues[1],
            inline: true,
          },
        ];

        if (msgInfo)
          info.push({ name: `Server's Information:`, value: msgInfo });

        embed.addFields(info);
        interaction.reply({ embeds: [embed], ephemeral: true });
        break;
      case "message":
        const welcomeMSG = interaction.options.getString("message");
        await serverProfile.findOneAndUpdate(
          {
            guildID: guild.id,
          },
          {
            guildName: guild.name,
            welomeMessage: welcomeMSG,
          }
        );
        interaction.reply({
          content: `\`\`\`${cfg.v} | Setup welcome message successfully!\nContent: ${welcomeMSG}\`\`\``,
          ephemeral: true,
        });
        break;
      default:
        break;
    }
  },
};

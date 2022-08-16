const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const serverProfile = require("../../mongodb/serverProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(8)
    .setName("serverstats")
    .setDescription(`Setup Server Statistics count\n${cfg.adminRole} only`)
    .addChannelOption((opt) =>
      opt.setName("total-count-channel").setDescription("Total Count Channel").setRequired(true))
    .addChannelOption((opt) =>
      opt.setName("members-count-channel").setDescription("Members Count Channel").setRequired(true))
    .addRoleOption((opt) =>
      opt.setName("member-role").setDescription("Member Role").setRequired(true))
    .addChannelOption((opt) =>
      opt.setName("bots-count-channel").setDescription("Bots Count Channel").setRequired(true))
    .addRoleOption((opt) => opt.setName("bot-role").setDescription("Bot Role").setRequired(true))
    .addChannelOption((opt) =>
      opt
        .setName("presences-count-channel")
        .setDescription("Presences Count Channel")
        .setRequired(true)),
  category: "moderator",
  async execute(interaction, client) {
    const guild = interaction.guild;

    let profile = await serverProfile.findOne({ guildID: guild.id });
    if (!profile) {
      let createOne = await serverProfile.create({ guildID: guild.id, guildName: guild.name });
      createOne.save();
    }

    const totalChannel = interaction.options.getChannel("total-count-channel");
    const membersChannel = interaction.options.getChannel("members-count-channel");
    const memberrole = interaction.options.getRole("member-role");
    const botsChannel = interaction.options.getChannel("bots-count-channel");
    const botrole = interaction.options.getRole("bot-role");
    const presencesChannel = interaction.options.getChannel("presences-count-channel");

    await serverProfile.findOneAndUpdate(
      { guildID: guild.id },
      {
        guildName: guild.name,
        totalChannel: totalChannel.id,
        membersChannel: membersChannel.id,
        memberRole: memberrole.id,
        botsChannel: botsChannel.id,
        botRole: botrole.id,
        statsChannel: presencesChannel.id,
      }
    );

    client.serverStats(client, guild.id);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(guild.name, guild.iconURL(true))
      .setTitle("Đã set up Server Statistics thành công!")
      .setThumbnail("https://emoji.discadia.com/emojis/5dc63f16-97b4-402e-8d1f-a76e15fdd6ab.png")
      .setTimestamp()
      .addFields(
        { name: "Total Count Channel:", value: `${totalChannel}` },
        { name: "Members Count Channel:", value: `${membersChannel}` },
        { name: "Member Role:", value: `${memberrole}` },
        { name: "Bots Count Channel:", value: `${botsChannel}` },
        { name: "Bot Role:", value: `${botrole}` },
        { name: "Preseneces Count Channel:", value: `${presencesChannel}` }
      );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

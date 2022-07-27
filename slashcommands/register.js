const serverProfile = require('../mongodb/serverProfile');
const tournamenProfile = require('../mongodb/tournamenProfile');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permission } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dang-ky')
    .setDescription('Đăng ký đấu giải!')
    .addStringOption(option =>
      option.setName('ingame')
        .setDescription('Tên ingame')
        .setRequired(true)),
  // .addUserOption(option =>
  //     option.setName('user')
  //         .setDescription('Người đăng ký')),
  // .setDefaultMemberPermissions(8)

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    let profile = await serverProfile.findOne({ guildID: interaction.guild.id });
    let register;
    if (!profile || !profile?.tourStatus) register = false
    else register = profile.tourStatus;

    if (register === false)
      return interaction.editReply({
        content: `\`\`\`🏆 | Hiện tại đã đóng đăng ký hoặc không có giải đấu nào đang diễn ra!\`\`\``,
        ephemeral: true
      });

    // Interaction Reply   
    const roleID = profile?.tourID;
    const stIngame = interaction.options.getString('ingame');
    const role = message.guild.roles.cache.get(roleID);
    const user = message.guild.members.cache.get(interaction.member.user.id);
    await interaction.editReply(`🏆 | ${user} đăng ký giải ${role}. Tên ingame: **${stIngame}**`);
    await interaction.followUp({
      content: `✅ | Chúc mừng ${user} đã đăng kí thành công giải ${role}`,
      ephemeral: true
    });

    if (role) {
      // Add Tournament Profile
      let tourProfile = await tournamenProfile.findOne(
        { guildID: interaction.guild.id, userID: interaction.member.user.id });
      if (!tourProfile) {
        let createOne = await tournamenProfile.create(
          {
            guildID: interaction.guild.id,
            guildName: interaction.guild.name,
            userID: interaction.member.user.id,
            usertag: interaction.member.user.tag,
            ingame: stIngame,
            decklist: 'none',
            status: true,
          });
        createOne.save();
      } else {
        await tournamenProfile.findOneAndUpdate(
          { guildID: interaction.guild.id, userID: interaction.member.user.id },
          {
            guildName: interaction.guild.name,
            usertag: interaction.member.user.tag,
            ingame: stIngame,
            decklist: 'none',
            status: true,
          })
      };

      // Add Role      
      return await user.roles.add(role).catch(e => console.log(e));
    }
  },
}
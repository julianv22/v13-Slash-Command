const serverProfile = require('../mongodb/serverProfile');
const tournamenProfile = require('../mongodb/tournamenProfile');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permission } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('huy-dang-ky')
    .setDescription('Huỷ đăng ký đấu giải!')
    .addBooleanOption(option =>
      option.setName('xacnhan')
        .setDescription('HÃY CHẮC CHẮN VỚI ĐIỀU BẠN SẮP LÀM!')
        .setRequired(true)),
  permission: [],
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

    const xacnhan = interaction.options.getBoolean('xacnhan');
    if (xacnhan === false)
      return interaction.editReply(`\`\`\`❗ Hãy suy nghĩ cẩn thận trước khi đưa ra quyết định!\`\`\``, true);

    const roleID = profile?.tourID;
    const role = message.guild.roles.cache.get(roleID);
    const user = message.guild.members.cache.get(interaction.member.user.id);

    // Check Tournament's Status 
    let tourProfile = await tournamenProfile.findOne(
      { guildID: interaction.guild.id, userID: interaction.member.user.id });
    if (!tourProfile || !tourProfile?.status) return interaction.editReply({
      content: `\`\`\`❌ | ${interaction.user.tag} chưa đăng ký giải đấu!\`\`\``,
      ephemeral: true
    });

    // Interaction Reply  
    await interaction.editReply(`\`\`\`❌ | ${interaction.user.tag} huỷ đăng ký giải [${role.name}]!\`\`\``);
    // Set Tournament's Status
    await tournamenProfile.findOneAndUpdate(
      {
        guildID: interaction.guild.id, userID: interaction.member.user.id
      },
      { status: false })

    // Remove Role
    if (role) await user.roles.remove(role).catch(e => console.log(e));
  },
}
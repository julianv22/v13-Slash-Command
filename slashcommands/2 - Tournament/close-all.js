const { SlashCommandBuilder } = require('@discordjs/builders');
const tournamenProfile = require('../../mongodb/tournamenProfile');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close-all-tour')
    .setDescription(`Đóng toàn bộ giải đấu\n${cfg.adminRole} only`)
    .addBooleanOption(opt =>
      opt.setName('verified')
        .setDescription('Xác nhận đóng toàn bộ giải đấu')
        .setRequired(true))
    .setDefaultMemberPermissions(8),

  async execute(interaction, client) {
    const verified = interaction.options.getBoolean('verified');
    if (!verified) return interaction.reply({
      content: `\`\`\`❗ Hãy suy nghĩ cẩn thận trước khi đưa ra quyết định!\`\`\``,
      ephemeral: true
    });

    // Set Tournament Status for member
    const tourList = await tournamenProfile.find({ guildName: interaction.guild.name });
    if (!tourList) return interaction.reply({
      content: `\`\`\`🏆 | Hiện tại đã đóng đăng ký hoặc không có giải đấu nào đang diễn ra!\`\`\``,
      ephemeral: true
    });

    for (const member of tourList) {
      await tournamenProfile.findOneAndUpdate(
        {
          guildName: member.guildName,
          userID: member.userID
        },
        { status: false })
    }

    interaction.reply({
      content: `\`\`\`❗ Đã đóng toàn bộ giải đấu!\`\`\``,
      ephemeral: true
    });
  },
}
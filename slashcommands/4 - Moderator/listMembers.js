const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(8192)
    .setName('list-members')
    .setDescription(`Return membes with role!\n${cfg.modRole} only`)
    .addRoleOption(option => option
      .setName('role')
      .setDescription('Select a role you wanna list')
      .setRequired(true))
    .addBooleanOption(option =>
      option.setName('mention')
        .setDescription('Mention members')
        .setRequired(true))
    .addStringOption(option => option
      .setName('description')
      .setDescription('Description'))
    .addBooleanOption(option =>
      option.setName('inline')
        .setDescription('List inline')),
  category: "moderator",
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    });
    const isInline = interaction.options.getBoolean('inline');
    let stInline;
    if (isInline === true) stInline = '\n'
    else stInline = ' | ';

    const isMention = interaction.options.getBoolean('mention');
    const desc = interaction.options.getString('description');
    const role = interaction.options.getRole('role');
    await message.guild.members.fetch();
    const members = await message.guild.roles.cache.get(role.id).members.map(m => m.user);
    const userName = await message.guild.roles.cache.get(role.id).members.map(m => m.user.username);

    if (members) {
      const msg = desc || `Danh sách thành viên của ${role}`;
      if (isMention === true)
        await interaction.editReply(
          { content: msg + ` [${members.length}]:\n${members.join(stInline)}` });
      else
        await interaction.editReply(
          { content: msg + ` [${members.length}]:\n${userName.join(stInline)}` });
    } else {
      await interaction.editReply({ content: `\`\`\`❌ | Không tìm thấy thành viên hoặc role đã chọn không chính xác!\`\`\`` });
    }
  }
}
const serverProfile = require('../../mongodb/serverProfile');
const tournamenProfile = require('../../mongodb/tournamenProfile');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

async function setTournament(interaction, getRole, isOpen, stStatus) {
  await interaction.reply({ content: `🏆 | Đã ${stStatus} đăng ký giải đấu ${getRole} thành công!` });
  await serverProfile.findOneAndUpdate(
    { guildID: interaction.guild.id },
    {
      guildName: interaction.guild.name,
      tourID: getRole.id,
      tourName: getRole.name,
      tourStatus: isOpen,
    })
}

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(8)
    .setName('giai-dau')
    .setDescription(`Cài đặt giải đấu\n${cfg.adminRole} only`)
    .addSubcommand(sub =>
      sub.setName('open')
        .setDescription(`Mở đăng ký giải đấu\n${cfg.adminRole} only`)
        .addRoleOption(opt =>
          opt.setName('ten-giai')
            .setDescription('Chọn tên giải đấu')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('close')
        .setDescription(`Đóng đăng ký giải đấu\n${cfg.adminRole} only`)
        .addRoleOption(opt =>
          opt.setName('ten-giai')
            .setDescription('Chọn tên giải đấu')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription(`List danh sách thành viên tham gia giải đấu\n${cfg.adminRole} only`)),
  category: "tournament",
  async execute(interaction, client) {
    let profile = await serverProfile.findOne({ guildID: interaction.guild.id });
    if (!profile) {
      let createOne = await serverProfile.create(
        {
          guildID: interaction.guild.id,
          guildName: interaction.guild.name,
        });
      createOne.save();
    };
    const getRole = interaction.options.getRole('ten-giai');
    switch (interaction.options.getSubcommand()) {
      case 'open':
        if (getRole.id !== profile?.tourID && profile?.tourStatus)
          return interaction.reply({
            content: `\`\`\`${cfg.x} | Đang có giải đấu [${profile?.tourName}] diễn ra. Vui lòng đóng giải này trước!\`\`\``,
            ephemeral: true
          });
        if (profile?.tourStatus)
          return interaction.reply({
            content: `\`\`\`${cfg.x} | Giải [${profile?.tourName}] đang diễn ra rồi!\`\`\``,
            ephemeral: true
          });
        setTournament(interaction, getRole, true, 'mở');
        break;
      case 'close':
        if (profile?.tourID && getRole.id !== profile?.tourID)
          return interaction.reply({
            content: `\`\`\`${cfg.x} | Chưa chọn đúng giải đấu: [${profile?.tourName}]\`\`\``,
            ephemeral: true
          });
        if (!profile?.tourStatus)
          return interaction.reply({
            content: `\`\`\`${cfg.x} | Giải [${profile?.tourName}] đã được đÓng trước đó rồi!\`\`\``,
            ephemeral: true
          });
        setTournament(interaction, getRole, false, 'đóng');
        break;
      case 'list':
        if (!profile?.tourStatus)
          return interaction.reply({
            content: `\`\`\`🏆 | Hiện không có giải đấu nào đang diễn ra!\`\`\``,
            ephemeral: true
          });

        let memberList = await tournamenProfile.find({ guild: interaction.guild.id, status: true });
        const embed = new MessageEmbed()
          .setAuthor(interaction.user.username, interaction.user.displayAvatarURL(true))
          .setTitle(`Danh sách thành viên tham gia giải đấu ${profile.tourName}:`)
          .setDescription(`\`\`\`❗ Các thành viên hãy kiểm tra lại tên ingame của mình\`\`\``)
          .setColor(cfg.embedcorlor)
          .setThumbnail('https://media.discordapp.net/attachments/976364997066231828/1001763832009596948/Cup.jpg')
          .setTimestamp()
          .setFooter(`Tổng số đăng ký: [${memberList.length}]`, interaction.guild.iconURL(true))

        for (const member of memberList) {
          embed.addField(`\u200b`, `<@${member.userID}>\nIngame: **${member.ingame}**`, true);
        };

        await interaction.reply({ embeds: [embed] });
        break;
    }
  },
}